import { type NextPage } from "next";
import { Shell } from "../../../components/Shell";
import { createClient } from "@nashural-paid-materials/service-client";

const serviceClient = createClient(
  process.env["SERVICE_URL"]!,
  process.env["SERVICE_TOKEN"]!,
);

export default async function Page({
  params: { material_id },
}: {
  params: { material_id: string };
}) {
  const { name, description, file_id, price, image_id } =
    await serviceClient.getMaterial(material_id);

  return (
    <Shell title={`Редактировать материал «${name}»`}>
      <main>
        <form
          action={`/api/materials/${material_id}`}
          method="POST"
          encType="multipart/form-data"
        >
          <input type="hidden" name="file_id" value={file_id} />
          <input type="hidden" name="image_id" value={image_id} />
          <div>
            <label htmlFor="name">Название</label>
            <input type="text" name="name" defaultValue={name} />
          </div>
          <div>
            <label htmlFor="description">Описание</label>
            <textarea name="description" defaultValue={description} />
          </div>
          <div>
            <label htmlFor="image">Изображение</label>
            <input type="file" name="image" accept=".jpg,.jpeg,.png,.svg" />
          </div>
          <div>
            <label htmlFor="file">Контент</label>
            <input type="file" name="file" accept=".pdf" />
          </div>
          <div>
            <label htmlFor="price">Цена</label>
            <input type="number" name="price" defaultValue={price} />
          </div>
          <div>
            <button type="submit">Сохранить</button>
          </div>
        </form>
      </main>
    </Shell>
  );
}
