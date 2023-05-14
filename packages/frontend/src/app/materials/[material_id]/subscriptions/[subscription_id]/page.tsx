import { createClient } from "@nashural-paid-materials/service-client";

const serviceClient = createClient(
  process.env["SERVICE_URL"]!,
  process.env["SERVICE_TOKEN"]!,
);

export default async function Home({
  params: { material_id, subscription_id },
}: {
  params: { material_id: string; subscription_id: string };
}) {
  const { price } = await serviceClient.getMaterial(material_id)

  return (
    <main>
      <h1>К оплате: {price} рублей</h1>
      <form
        action={`/api/materials/${material_id}/subscriptions/${subscription_id}/order`}
        method="POST"
      >
        <button type="submit" name="paymentType" value="CARD">
          Оплатить карточкой
        </button>
        {' '}или{' '}
        <button type="submit" name="paymentType" value="SBP">
          Оплатить через СБП
        </button>
      </form>
    </main>
  );
}
