import { Shell } from "../../components/Shell";
import Link from "next/link";
import { createClient } from '@nashural-paid-materials/service-client'

const serviceClient = createClient(
  process.env['SERVICE_URL']!,
  process.env['SERVICE_TOKEN']!
)

export default async function Home() {
  const materials = await serviceClient.getMaterials();

  return (
    <Shell title="Материалы">
      <main>
        <div>
          <Link href="/materials/create">Создать материал</Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(({ id, name }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>
                  <Link href={`/materials/${id}/delete`}>Удалить</Link>
                  <Link href={`/materials/${id}/subscriptions`}>Подписки</Link>
                  <Link href={`/materials/${id}`}>Редактировать</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </Shell>
  );
}
