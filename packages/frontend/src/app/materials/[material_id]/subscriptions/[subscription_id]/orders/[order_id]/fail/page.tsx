export default async function MaterialSubscriptionOrderSuccess({
  params: { material_id, subscription_id, order_id },
}: {
  params: { material_id: string; subscription_id: string; order_id: string };
}) {
  return (
    <main>
      <p>Произошла ошибка. Попробуйте позже</p>
    </main>
  );
}
