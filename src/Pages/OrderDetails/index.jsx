import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const API = import.meta.env.VITE_STRAPI_URL;

        const [orderRes, itemsRes] = await Promise.all([
          fetch(`${API}/api/orders/${encodeURIComponent(id)}`),
          fetch(
            `${API}/api/order-items?populate=order&pagination[pageSize]=100`,
          ),
        ]);

        const orderData = await orderRes.json();
        const itemsData = await itemsRes.json();

        if (!orderRes.ok) {
          throw new Error(orderData.error?.message || "سفارش پیدا نشد");
        }

        if (!itemsRes.ok) {
          throw new Error(
            itemsData.error?.message || "خطا در دریافت اقلام سفارش",
          );
        }

        setOrder(orderData.data);

        const filteredItems = (itemsData.data || []).filter(
          (item) =>
            String(item.order?.documentId || item.order?.id) === String(id),
        );

        setItems(filteredItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <p className="py-20 text-center text-slate-400">در حال دریافت سفارش...</p>
    );
  }

  if (error || !order) {
    return (
      <p className="py-20 text-center text-red-500">
        {error || "سفارش پیدا نشد"}
      </p>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#fdfbfc] px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/profile"
          className="mb-7 inline-flex items-center gap-2 text-sm text-slate-500"
        >
          <ArrowRight size={18} />
          بازگشت به پروفایل
        </Link>

        <div className="rounded-3xl border border-rose-100 bg-white p-6 sm:p-8">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-rose-100 pb-6">
            <div>
              <p className="mb-2 text-xs text-rose-400">ORDER DETAILS</p>
              <h1 className="text-2xl font-bold text-slate-800">
                {order.orderName}
              </h1>
            </div>

            <span className="rounded-xl bg-rose-50 px-4 py-2 text-sm text-rose-500">
              {order.orderStatus || "در حال بررسی"}
            </span>
          </div>

          <h2 className="mb-5 flex items-center gap-2 font-semibold text-slate-800">
            <Package size={20} className="text-rose-400" />
            اقلام سفارش
          </h2>

          <div className="space-y-4">
            {items.length ? (
              items.map((item) => (
                <div
                  key={item.documentId || item.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-rose-100 p-4"
                >
                  <div>
                    <p className="font-medium text-slate-700">
                      {item.productName}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      تعداد: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-rose-500">
                    {Number(item.totalPrice).toLocaleString("fa-IR")} تومان
                  </p>
                </div>
              ))
            ) : (
              <p className="py-10 text-center text-slate-400">
                آیتمی برای این سفارش پیدا نشد.
              </p>
            )}
          </div>

          <div className="mt-7 space-y-3 border-t border-rose-100 pt-6 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>جمع محصولات</span>
              <span>
                {Number(order.subTotal).toLocaleString("fa-IR")} تومان
              </span>
            </div>

            <div className="flex justify-between text-slate-500">
              <span>تخفیف</span>
              <span>
                {Number(order.discountAmount).toLocaleString("fa-IR")} تومان
              </span>
            </div>

            <div className="flex justify-between text-lg font-bold text-rose-500">
              <span>مبلغ نهایی</span>
              <span>
                {Number(order.totalAmount).toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
