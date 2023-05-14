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
  const formData = await request.formData()
  const paymentType = formData.get('paymentType') as string
  const { paymentUrl } = await serviceClient.createMaterialSubscriptionOrder(
    material_id,
    subscription_id,
    {
      paymentType
    }
  )

  return Response.redirect(paymentUrl)
}
