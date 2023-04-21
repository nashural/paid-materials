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
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const file = formData.get('file') as File
  const image = formData.get('image') as File
  let file_id = Number(formData.get('file_id'))
  let image_id = Number(formData.get('image_id'))
  const price = Number(formData.get('price'))

  // File upload
  if (Reflect.get(file as any, 'size') > 0) {
    const { id } = await serviceClient.uploadFile(file)

    file_id = id
  }

  // Image upload
  if (Reflect.get(image as any, 'size') > 0) {
    const { id } = await serviceClient.uploadImage(image)

    image_id = id
  }

  // Material update
  await serviceClient.updateMaterial(material_id, {
    name,
    description,
    file_id,
    price,
    image_id
  })

  return Response.redirect(`${origin}/materials/${material_id}`)
}
