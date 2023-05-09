import { createClient } from "@nashural-paid-materials/service-client";

const serviceClient = createClient(
  process.env["SERVICE_URL"]!,
  process.env["SERVICE_TOKEN"]!,
);

export default async function MaterialSubscriptionOrderSuccess({
  params: { material_id, subscription_id, order_id },
}: {
  params: { material_id: string; subscription_id: string; order_id: string };
}) {
  const { is_paid } = await serviceClient.getMaterialSubscriptionOrder(
    material_id,
    subscription_id,
    order_id,
  );
  const { file_id } = await serviceClient.getMaterial(material_id);
  const { filename } = await serviceClient.getFile(file_id);

  return (
    <main>
      {is_paid ? (
        <a
          href={`${process.env["SERVICE_URL"]}/uploads/${filename}`}
          download={filename}
        >
          Скачать
        </a>
      ) : (
        <p>Нужно вначале оплатить</p>
      )}
    </main>
  );
}
