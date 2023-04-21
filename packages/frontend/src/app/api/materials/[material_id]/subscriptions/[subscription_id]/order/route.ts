import { createClient } from '@nashural-paid-materials/service-client'

const serviceClient = createClient(
  process.env['SERVICE_URL']!,
  process.env['SERVICE_TOKEN']!
)

export async function POST(request: Request, { params: { material_id, subscription_id } }: {
  params: {
    material_id: string
    subscription_id: string
  };
}) {
  console.log(14)

  const formData = await request.formData()

  console.log(18)

  const paymentType = formData.get('paymentType') as string

  console.log(22, paymentType)

  const { paymentUrl } = await serviceClient.createMaterialSubscriptionOrder(
    material_id,
    subscription_id,
    {
      paymentType
    }
  )

  console.log(32)

  return Response.redirect(paymentUrl)
}
