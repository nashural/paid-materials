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
  const material = await serviceClient.getMaterial(material_id);
  const subscriptions = await serviceClient.getMaterialSubscriptions(
    material_id,
  );

  return (
    <Shell title={`Подписки на материал «${material.name}»`}>
      <main>
        <table>
          <thead>
            <tr>
              <th>Емейл</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map(({ id, email }) => (
              <tr key={id}>
                <td>{email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </Shell>
  );
}
