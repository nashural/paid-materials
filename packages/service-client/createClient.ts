import type {
  Material,
  Subscription,
  File as FileServiceType,
  Image as ImageServiceType
} from './types'

export const createClient = (baseURL: string, token: string) => {
  const createSingeFieldFormData = <T extends string | Blob,>(fieldName: string, data: T) => {
    const formData = new FormData()

    formData.set(fieldName, data)

    return formData
  }

  return {
    async getMaterials(): Promise<Material[]> {
      const url = new URL('/api/materials', baseURL)
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return res.json()
    },
    async getMaterial(material_id: string): Promise<Material> {
      const url = new URL(`/api/materials/${material_id}`, baseURL)
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return res.json()
    },
    async createMaterial({
      name,
      description,
      file_id,
      price,
      image_id
    }: {
      name: string
      description: string
      file_id: number
      price: number
      image_id: number
    }): Promise<Material> {
      const url = new URL('/api/materials', baseURL)
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          description,
          file_id,
          price,
          image_id
        })
      })

      return resp.json()
    },
    async updateMaterial(material_id: string, {
      name,
      description,
      file_id,
      price,
      image_id
    }: {
      name: string
      description: string
      file_id: number
      price: number
      image_id: number
    }) {
      const url = new URL(`/api/materials/${material_id}`, baseURL)
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          description,
          file_id,
          price,
          image_id
        })
      })
    },
    async deleteMaterial(material_id: string) {
      const url = new URL(`/api/materials/${material_id}`, baseURL)
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
    },
    async getMaterialSubscriptions(material_id: string): Promise<Subscription[]> {
      const url = new URL(`/api/materials/${material_id}/subscriptions`, baseURL)
      const res = await fetch(url);

      return res.json()
    },
    async uploadFile(file: File): Promise<FileServiceType> {
      const url = new URL('/api/files', baseURL)
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: createSingeFieldFormData('file', file)
      })

      return resp.json()
    },
    async uploadImage(image: File): Promise<ImageServiceType> {
      const url = new URL('/api/images', baseURL)
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: createSingeFieldFormData('image', image)
      })

      return resp.json()
    },
    async getImage(image_id: number): Promise<ImageServiceType> {
      const url = new URL(`/api/images/${image_id}`, baseURL)
      const resp = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return resp.json()
    },
    async getFile(file_id: number): Promise<FileServiceType> {
      const url = new URL(`/api/images/${file_id}`, baseURL)
      const resp = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return resp.json()
    },
    async createMaterialSubscription(material_id: string, { email }: { email: string }): Promise<Subscription> {
      const url = new URL(`/api/materials/${material_id}/subscriptions`, baseURL)
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email
        })
      })

      return resp.json()
    },
    async createMaterialSubscriptionOrder(material_id: string, subscription_id: string, {
      paymentType
    }: {
      paymentType: string
    }): Promise<{
      paymentUrl: string
    }> {
      const url = new URL(`/api/materials/${material_id}/subscriptions/${subscription_id}/orders`, baseURL)
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          paymentType
        })
      })

      return resp.json()
    },
    async getMaterialSubscriptionOrder(material_id: string, subscription_id: string, order_id: string): Promise<{
      id: number,
      material_id: number,
      subscription_id: number,
      init: string,
      init_at: Date,
      status: string,
      status_at: Date,
      is_paid: boolean
    }> {
      const url = new URL(`/api/materials/${material_id}/subscriptions/${subscription_id}/orders/${order_id}`, baseURL)
      const resp = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      return resp.json()
    }
  }
}
