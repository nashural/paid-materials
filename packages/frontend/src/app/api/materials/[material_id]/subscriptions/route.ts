import { createClient } from '@nashural-paid-materials/service-client'

const serviceClient = createClient(
  process.env['SERVICE_URL']!,
  process.env['SERVICE_TOKEN']!
)

export async function POST(request: Request, { params: { material_id } }: {
  params: { material_id: string };
}) {
  const origin = request.headers.get("origin")
  const formData = await request.formData()
  const email = formData.get('email') as string

  const { id: subscription_id } = await serviceClient.createMaterialSubscription(material_id, { email })

  return Response.redirect(`${origin}/materials/${material_id}/subscriptions/${subscription_id}`)
}
