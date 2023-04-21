import { createClient } from '@nashural-paid-materials/service-client'

const serviceClient = createClient(
  process.env['SERVICE_URL']!,
  process.env['SERVICE_TOKEN']!
)

export async function POST(request: Request, { params: { material_id } }: {
  params: { material_id: string };
}) {
  const origin = request.headers.get("origin")

  await serviceClient.deleteMaterial(material_id)

  return Response.redirect(`${origin}/materials`)
}
