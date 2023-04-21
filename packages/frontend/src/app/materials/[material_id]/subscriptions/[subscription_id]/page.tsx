export default async function Home({
  params: { material_id, subscription_id },
}: {
  params: { material_id: string; subscription_id: string };
}) {
  return (
    <main>
      <h1>Hello, world!</h1>
      <form
        action={`/api/materials/${material_id}/subscriptions/${subscription_id}/order`}
        method="POST"
      >
        <button type="submit" name="paymentType" value="CARD">
          Оплатить карточкой
        </button>
        <button type="submit" name="paymentType" value="SBP">
          Оплатить через СБП
        </button>
      </form>
    </main>
  );
}
