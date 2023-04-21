import Link from "next/link";
import { Shell } from "../../../../components/Shell";
import { createClient } from "@nashural-paid-materials/service-client";

const serviceClient = createClient(
  process.env["SERVICE_URL"]!,
  process.env["SERVICE_TOKEN"]!,
);

export default async function Home({
  params: { material_id },
}: {
  params: { material_id: string };
}) {
  const { name } = await serviceClient.getMaterial(material_id);

  return (
    <Shell title="Удалить материал">
      <main>
        <p>Удалить материал «{name}»?</p>
        <form action={`/api/materials/${material_id}/delete`} method="POST">
          <button type="submit">Удалить</button>
          <Link href="/materials">Назад</Link>
        </form>
      </main>
    </Shell>
  );
}
