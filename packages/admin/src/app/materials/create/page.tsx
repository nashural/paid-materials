import { Shell } from "../../../components/Shell";

export default async function Home() {
  return (
    <Shell title="Создать материал">
      <main>
        <form action="/api/materials" method="POST" encType="multipart/form-data">
          <div>
            <label htmlFor="name">Название</label>
            <input type="text" name="name" />
          </div>
          <div>
            <label htmlFor="description">Описание</label>
            <textarea name="description" />
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
            <input type="number" name="price" />
          </div>
          <div>
            <button type="submit">Создать</button>
          </div>
        </form>
      </main>
    </Shell>
  );
}
