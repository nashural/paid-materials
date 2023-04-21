import { createClient } from '@nashural-paid-materials/service-client'

const serviceClient = createClient(
  process.env['SERVICE_URL']!,
  process.env['SERVICE_TOKEN']!
)

export async function POST(request: Request) {
  const origin = request.headers.get("origin")
  const formData = await request.formData()
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const file = formData.get('file') as File
  const price = Number(formData.get('price'))
  const image = formData.get('image') as File

  console.log(17)

  // File upload
  const { id: file_id } = await serviceClient.uploadFile(file)

  console.log(22, file_id)

  // Image upload
  const { id: image_id } = await serviceClient.uploadImage(image)

  console.log(27, image_id)

  const { id: material_id } = await serviceClient.createMaterial({
    name,
    description,
    file_id,
    price,
    image_id
  })

  console.log(37, material_id)

  return Response.redirect(`${origin}/materials/${material_id}`)
}
