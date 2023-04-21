export type Material = {
  id: number
  name: string
  description: string
  file_id: number
  price: number
  image_id: number
}

export type Subscription = {
  id: number
  email: string
  material_id: number
}

export type File = {
  id: number
  filename: string
  mimetype: string
}

export type Image = {
  id: number
  filename: string
  alt: string
  mimetype: string
}
