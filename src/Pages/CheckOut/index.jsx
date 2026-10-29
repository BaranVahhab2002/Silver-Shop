import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ShoppingBag } from "lucide-react";
import useCart from "../../Hooks/useCart";

export default function Checkout() {
  const navigate = useNavigate();
  const { items: cart, totalPrice: total, clear: clearCart } = useCart();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  const createRecord = async (endpoint, data) => {
    const res = await fetch(
      `${import.meta.env.VITE_STRAPI_URL}/api/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      },
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error?.message || "ثبت اطلاعات ناموفق بود");
    }

    return result.data;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!cart.length || loading) return;

    setLoading(true);

    try {
      const customer = await createRecord("customers", {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        address: [
          {
            type: "paragraph",
            children: [{ type: "text", text: form.address.trim() }],
          },
        ],
      });

      const order = await createRecord("orders", {
        orderName: `ORD-${Date.now()}`,
        orderStatus: "ready to send",
        subTotal: Number(total),
        discountAmount: 0,
        totalAmount: Number(total),
      });

      for (const item of cart) {
        await createRecord("order-items", {
          productName: item.name,
          quantity: item.quantity,
          totalPrice: Number(item.price) * item.quantity,
          order: {
            connect: [order.documentId],
          },
        });
      }
      clearCart();
      toast.success("سفارش شما با موفقیت ثبت شد!");
      navigate("/profile", { replace: true });
    } catch (err) {
      toast.error(err.message || "خطا در ثبت سفارش");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#fdfbfc] px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-xs tracking-widest text-rose-400">CHECKOUT</p>

        <h1 className="mb-8 text-3xl font-bold text-slate-800">
          تکمیل اطلاعات مشتری
        </h1>

        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <form
            onSubmit={submit}
            className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-6 text-lg font-semibold text-slate-800">
              اطلاعات گیرنده
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                ["firstName", "نام"],
                ["lastName", "نام خانوادگی"],
                ["phone", "شماره تماس"],
                ["city", "شهر"],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="mb-2 block text-sm text-slate-500">
                    {label}
                  </label>

                  <input
                    required={key !== "city"}
                    type={key === "phone" ? "tel" : "text"}
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    className="w-full rounded-xl border border-rose-100 px-4 py-3 outline-none focus:border-rose-400"
                  />
                </div>
              ))}
            </div>

            <label className="mb-2 mt-5 block text-sm text-slate-500">
              آدرس کامل
            </label>

            <textarea
              required
              rows={4}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full rounded-xl border border-rose-100 p-4 outline-none focus:border-rose-400"
            />

            <button
              type="submit"
              disabled={loading || !cart.length}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-400 py-4 text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingBag size={19} />
              {loading ? "در حال ثبت..." : "ثبت سفارش"}
            </button>
          </form>

          <aside className="h-fit rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <h2 className="mb-5 font-semibold text-slate-800">
              خلاصه سبد خرید
            </h2>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 border-b border-rose-50 py-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 rounded-xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-700">{item.name}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    تعداد: {item.quantity}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-5 flex justify-between text-sm">
              <span className="text-slate-500">مجموع</span>
              <span className="font-bold text-rose-500">
                {total.toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
