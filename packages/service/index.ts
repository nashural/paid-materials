/// <reference lib="dom" />

import fs from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { URL } from 'node:url'
import 'dotenv/config'
import fastify from 'fastify'
import knex from 'knex'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import * as knexfile from './knexfile'

const pump = promisify(pipeline)
const calculateOrderToken = (orderInit: object) => {
  const preHash = Object
    .entries(orderInit)
    .concat([['password', process.env['MERCHANT_KEY']]])
    .filter(([key]) => !['receipt', 'paymentType'].includes(key))
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([_, value]) => value)
    .join('')

  return createHash('sha256')
    .update(preHash)
    .digest('hex')
}
const service = fastify({
  logger: true
})

service.register(fastifyMultipart)
service.register(fastifyStatic, {
  root: path.join(__dirname, '/uploads'),
  prefix: '/uploads'
})

// #region materials

service.get('/api/materials', {
  async handler() {
    return knex(knexfile).select('*').from('materials')
  }
})

service.get<{
  Params: {
    material_id: string
  }
}>('/api/materials/:material_id', {
  schema: {
    params: {
      type: 'object',
      properties: {
        material_id: { type: 'string' }
      },
      required: ['material_id']
    }
  },
  async handler({ params: { material_id } }) {
    return knex(knexfile).select().from('materials').where('id', material_id).first()
  }
})

service.post<{
  Body: {
    name: string
    description: string
    file_id: number
    price: number
    image_id: number
  }
}>('/api/materials', {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        file_id: { type: 'number' },
        price: { type: 'number' },
        image_id: { type: 'number' },
      },
      required: ['name', 'description', 'file_id', 'price', 'image_id']
    }
  },
  async handler({ body: { name, description, file_id, price, image_id } }) {
    const [{ id }] = await knex(knexfile).insert({
      name,
      description,
      file_id,
      price,
      image_id
    })
      .into('materials')
      .returning('id')

    return knex(knexfile).select().from('materials').where('id', id).first()
  }
})

service.post<{
  Params: {
    material_id: string
  }
  Body: {
    name: string
    description: string
    file_id: number
    price: number
    image_id: number
  }
}>('/api/materials/:material_id', {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        file_id: { type: 'number' },
        price: { type: 'number' },
        image_id: { type: 'number' },
      },
      required: ['name', 'description', 'file_id', 'price', 'image_id']
    },
    params: {
      type: 'object',
      properties: {
        material_id: { type: 'string' }
      },
      required: ['material_id']
    }
  },
  async handler({
    params: {
      material_id
    },
    body: {
      name,
      description,
      file_id,
      price,
      image_id
    }
  }, reply) {
    await knex(knexfile)
      .where('id', material_id)
      .update({
        name,
        description,
        file_id,
        price,
        image_id
      })
      .into('materials')

    return reply.send()
  }
})

service.delete<{
  Params: {
    material_id: string
  }
}>('/api/materials/:material_id', {
  schema: {
    params: {
      type: 'object',
      properties: {
        material_id: { type: 'string' }
      },
      required: ['material_id']
    }
  },
  async handler({ params: { material_id } }, reply) {
    await knex(knexfile).from('materials').delete().where('id', material_id)

    return reply.send()
  }
})

service.get<{
  Params: {
    material_id: string
  }
}>('/api/materials/:material_id/subscriptions', {
  schema: {
    params: {
      type: 'object',
      properties: {
        material_id: { type: 'string' }
      },
      required: ['material_id']
    }
  },
  async handler({ params: { material_id } }) {
    return knex(knexfile).select().from('subscriptions').where('material_id', material_id)
  }
})

service.post<{
  Body: {
    email: string
  }
  Params: {
    material_id: string
  }
}>('/api/materials/:material_id/subscriptions', {
  schema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' }
      },
      required: ['email']
    },
    params: {
      type: 'object',
      properties: {
        material_id: { type: 'string' }
      },
      required: ['material_id']
    }
  },
  async handler({ params: { material_id }, body: { email } }) {
    const [{ id }] = await knex(knexfile).insert({
      material_id,
      email
    }).into('subscriptions')
      .returning('id')

    return knex(knexfile).select().from('subscriptions').where('id', id).first()
  }
})

service.post<{
  Body: {
    paymentType: 'CARD' | 'SBP'
  },
  Params: {
    material_id: string
    subscription_id: string
  }
}>('/api/materials/:material_id/subscriptions/:subscription_id/orders', {
  schema: {
    body: {
      type: 'object',
      properties: {
        paymentType: {
          enum: ['CARD', 'SBP']
        }
      },
      required: ['paymentType']
    },
    params: {
      type: 'object',
      properties: {
        material_id: { type: 'string' },
        subscription_id: { type: 'string' }
      },
      required: ['material_id', 'subscription_id']
    }
  },
  async handler({
    params: {
      material_id,
      subscription_id
    },
    body: {
      paymentType
    }
  }) {
    console.log(274)
    const material = await knex(knexfile)
      .select()
      .from('materials')
      .where('id', material_id)
      .first()
    console.log(280, 'material =', material)
    const subscription = await knex(knexfile)
      .select()
      .from('subscriptions')
      .where('id', subscription_id)
      .first()
    console.log(286, 'subscription =', subscription)
    const [{ id: order_id }] = await knex(knexfile).insert({
      id: Date.now(),
      material_id,
      subscription_id
    }).into('orders')
      .returning('id')
    console.log(292, 'order_id =', order_id)
    const orderInit = {
      ecommKey: process.env['ECOMM_KEY'],
      amount: material.price,
      orderId: order_id,
      description: `Покупка «${material.name}» от Нашего Урала`,
      receipt: {
        email: subscription.email,
        emailCompany: 'nashural@mail.ru',
        taxation: 'USN_INCOME',
        items: [
          {
            name: material.name,
            price: material.price,
            quantity: 1,
            amount: material.price,
            paymentMethod: 'FULL_PAYMENT',
            paymentObject: 'INTELLECTUAL_ACTIVITY',
            tax: 'NONE'
          }
        ]
      },
      // dueDate // TODO: Уточнить
      notificationUrl: `${process.env['SERVICE_URL']}/api/materials/${material_id}/subscriptions/${subscription_id}/orders/${order_id}/status`,
      successUrl: `${process.env['FRONTEND_URL']}/materials/${material_id}/subscriptions/${subscription_id}/orders/${order_id}/success`,
      failUrl: `${process.env['FRONTEND_URL']}/materials/${material_id}/subscriptions/${subscription_id}/orders/${order_id}/fail`,
      language: 'RU',
      paymentType,
      token: '',
    }

    console.log(323, orderInit)

    orderInit.token = calculateOrderToken(orderInit)

    console.log(327, orderInit)

    await knex(knexfile)
      .where('id', order_id)
      .update({
        init: JSON.stringify(orderInit, null, 2),
        init_at: new Date()
      })
      .into('orders')
    
    console.log(337, "process.env['SDM_ECOMM_GATEWAY_URL'] =", process.env['SDM_ECOMM_GATEWAY_URL'])

    const url = new URL('/init', process.env['SDM_ECOMM_GATEWAY_URL'])

    console.log(341, 'url =', url.toString())

    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderInit)
    })

    console.log(resp.status, resp.statusText)

    const respText = await resp.clone().text()
    console.log('respText.length =', respText.length)
    console.log(348, 'resp.clone().text()', respText)

    const data = await resp.json()

    console.log(352, data)

    await knex(knexfile)
      .where('id', order_id)
      .update({
        status: JSON.stringify(data, null, 2),
        status_at: new Date()
      })
      .into('orders')

    console.log(362)

    const { paymentUrl } = data

    console.log(366)

    return {
      paymentUrl
    }
  }
})

service.get<{
  Params: {
    material_id: string
    subscription_id: string
    order_id: string
  }
}>(
  '/api/materials/:material_id/subscriptions/:subscription_id/orders/:order_id',
  {
    async handler({ params: { order_id } }) {
      const order = await knex(knexfile)
        .from('orders')
        .where('id', order_id)
        .first()

      return order
    }
  }
)

service.post<{
  Body: {
    ecommKey: number
    paymentId: number
    amount: number
    currency: string
    orderId: number
    paymentType: string
    success: boolean
    status: string
    errorCode: string
    // paymentUrl: string
    // message: string
    token: string
  },
  Params: {
    material_id: string
    subscription_id: string
    order_id: string
  }
}>('/api/materials/:material_id/subscriptions/:subscription_id/orders/:order_id/status', {
  // schema: {
  //   body: {
  //     type: 'object',
  //     properties: {
  //       ecommKey: { type: 'number' },
  //       paymentId: { type: 'number' },
  //       amount: { type: 'number' },
  //       currency: { type: 'string' },
  //       orderId: { type: 'number' },
  //       paymentType: { type: 'string' },
  //       success: { type: 'boolean' },
  //       status: { type: 'string' },
  //       errorCode: { type: 'string' },
  // //       paymentUrl: { type: 'string' },
  // //      message: { type: 'string' },
  //     },
  //     required: [
  //       'ecommKey',
  //       'paymentId',
  //       'amount',
  //       'currency',
  //       'orderId',
  //       'paymentType',
  //       'success',
  //       'status',
  //       'errorCode',
  //       'paymentUrl',
  //       'message'
  //     ]
  //   },
  //   params: {
  //     type: 'object',
  //     properties: {
  //       material_id: { type: 'string' },
  //       subscription_id: { type: 'string' },
  //       order_id: { type: 'string' }
  //     },
  //     required: ['material_id', 'subscription_id', 'order_id']
  //   }
  // },
  async handler({ params: { order_id, subscription_id }, body }) {
    await knex(knexfile)
      .where('id', order_id)
      .update({
        status: JSON.stringify(body, null, 2),
        status_at: new Date(),
        is_paid: body.status === 'FULL_PAID'
      })
      .into('orders')

    return true
  }
})

// #endregion

// #region files

service.post('/api/files', async (req) => {
  const { filename, mimetype, file } = (await req.file())!
  const [{ id }] = await knex(knexfile).insert({
    filename,
    mimetype
  }).into('files')
    .returning('id')

  await pump(file, fs.createWriteStream(
    path.join(__dirname, '/uploads', filename)
  ))

  return knex(knexfile).select().from('files').where('id', id).first()
})

service.get<{
  Params: {
    file_id: string
  }
}>('/api/files/:file_id', async ({ params: { file_id } }) => {
  return knex(knexfile).select().from('files').where('id', file_id).first()
})

// #endregion

// #region images

service.get<{
  Params: {
    image_id: string
  }
}>('/api/images/:image_id', async ({ params: { image_id } }) => {
  return knex(knexfile).select().from('images').where('id', image_id).first()
})

service.post('/api/images', async (req) => {
  const { filename, mimetype, file } = (await req.file())!
  const [{ id }] = await knex(knexfile).insert({
    filename,
    mimetype
  }).into('images')
    .returning('id')

  await pump(file, fs.createWriteStream(
    path.join(__dirname, '/uploads', filename)
  ))

  return knex(knexfile).select().from('images').where('id', id).first()
})

// #endregion

service.listen({
  port: Number(process.env['PORT'] ?? 3000),
  host: process.env['HOST'] ?? '0.0.0.0'
})
