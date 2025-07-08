export default function ProfileOrders() {
  return (
    <section className="profile-orders-section bg-neutral-900 rounded-lg p-4 shadow-inner">
      <h3 className="profile-orders-title text-lg font-semibold mb-3 text-neutral-100">
        Orders
      </h3>
      <ul className="profile-orders-list space-y-3">
        <li className="order-item bg-neutral-700 rounded px-4 py-2 text-neutral-200 shadow-sm">
          Order #12345 - Game Title 1 - 2024-06-01
        </li>
        <li className="order-item bg-neutral-700 rounded px-4 py-2 text-neutral-200 shadow-sm">
          Order #12346 - Game Title 2 - 2024-05-15
        </li>
        <li className="order-item bg-neutral-700 rounded px-4 py-2 text-neutral-200 shadow-sm">
          Order #12347 - Game Title 3 - 2024-04-20
        </li>
      </ul>
    </section>
  );
}
