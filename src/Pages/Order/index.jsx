import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ChevronLeft, ShoppingBag } from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_STRAPI_URL}/api/orders?sort=createdAt:desc&pagination[pageSize]=100`,
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error?.message || "خطا در دریافت سفارش‌ها");
        }

        setOrders(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <p className="py-16 text-center text-slate-400">
        در حال دریافت سفارش‌ها...
      </p>
    );
  }

  if (error) {
    return <p className="py-16 text-center text-red-500">{error}</p>;
  }

  return (
    <div
      dir="rtl"
      className="rounded-3xl border border-rose-100 bg-white p-5 sm:p-8"
    >
      <h2 className="mb-7 text-xl font-bold text-slate-800">سفارش‌های من</h2>

      {!orders.length ? (
        <div className="flex flex-col items-center py-16 text-center">
          <Package size={50} className="mb-5 text-rose-300" />
          <h3 className="font-semibold text-slate-700">
            هنوز سفارشی ثبت نشده است
          </h3>
          <Link
            to="/products"
            className="mt-6 flex items-center gap-2 rounded-xl bg-rose-400 px-6 py-3 text-sm text-white"
          >
            <ShoppingBag size={17} />
            مشاهده محصولات
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.documentId || order.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-rose-100 p-5"
            >
              <div className="space-y-2">
                <p className="font-semibold text-slate-800">
                  {order.orderName}
                </p>

                <p className="text-xs text-slate-400">
                  {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                </p>

                <p className="text-sm font-semibold text-rose-500">
                  {Number(order.totalAmount).toLocaleString("fa-IR")} تومان
                </p>

                <span className="inline-block rounded-lg bg-rose-50 px-3 py-1 text-xs text-rose-500">
                  {order.orderStatus || "در حال بررسی"}
                </span>
              </div>

              <Link
                to={`/orders/${order.documentId}`}
                className="flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-500 hover:bg-rose-100"
              >
                مشاهده اقلام سفارش
                <ChevronLeft size={17} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
