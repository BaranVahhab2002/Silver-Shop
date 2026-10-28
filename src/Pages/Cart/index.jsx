import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

export default function Cart() {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [items]);

  const increase = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrease = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  };

  const remove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <div
        dir="rtl"
        className="flex min-h-[70vh] flex-col items-center justify-center bg-[#fdfbfc] px-4 text-center"
      >
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-rose-50">
          <ShoppingBag size={42} className="text-rose-300" />
        </div>

        <h2 className="mb-3 text-2xl font-bold text-slate-800 sm:text-3xl">
          سبد خریدت خالیه!
        </h2>

        <p className="mb-8 text-sm leading-7 text-slate-500">
          هنوز محصولی به سبد خریدت اضافه نکردی.
          <br />
          محصولات موردعلاقه‌ات رو انتخاب کن و خریدت رو شروع کن.
        </p>

        <Link
          to="/products"
          className="flex items-center gap-2 rounded-xl bg-rose-400 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-rose-500"
        >
          مشاهده محصولات
          <ArrowLeft size={17} />
        </Link>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fdfbfc] px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-xs tracking-[0.2em] text-rose-400">
              SILVER SHOPPING CART
            </p>

            <h1 className="flex items-center gap-3 text-2xl font-bold text-slate-800 sm:text-3xl">
              <ShoppingCart size={28} className="text-rose-400" />
              سبد خرید من
            </h1>
          </div>

          <Link
            to="/products"
            className="flex items-center gap-2 text-sm text-rose-500 hover:text-rose-600"
          >
            ادامه خرید
            <ArrowLeft size={17} />
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[850px] text-sm">
              <thead className="border-b border-rose-100 bg-[#fff6f9]">
                <tr className="text-slate-600">
                  <th className="px-4 py-5 text-center font-semibold">ردیف</th>
                  <th className="px-4 py-5 text-right font-semibold">محصول</th>
                  <th className="px-4 py-5 text-center font-semibold">قیمت</th>
                  <th className="px-4 py-5 text-center font-semibold">تعداد</th>
                  <th className="px-4 py-5 text-center font-semibold">
                    قیمت کل
                  </th>
                  <th className="px-4 py-5 text-center font-semibold">حذف</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-rose-50 transition hover:bg-[#fffafd]"
                  >
                    <td className="px-4 py-5 text-center text-slate-400">
                      {(index + 1).toLocaleString("fa-IR")}
                    </td>

                    <td className="px-4 py-5">
                      <div className="flex min-w-[220px] items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 shrink-0 rounded-xl border border-rose-100 bg-rose-50 object-cover"
                        />

                        <div>
                          <p className="max-w-52 font-medium leading-6 text-slate-700">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-rose-400">
                            SILVER BEAUTY
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-5 text-center text-slate-600">
                      {Number(item.price).toLocaleString("fa-IR")}
                      <span className="mr-1 text-xs">تومان</span>
                    </td>

                    <td className="px-4 py-5">
                      <div className="mx-auto flex w-fit items-center gap-4 rounded-xl border border-rose-100 px-3 py-2">
                        <button
                          onClick={() => increase(item.id)}
                          className="text-rose-500 transition hover:text-rose-600"
                          aria-label="افزایش تعداد"
                        >
                          <Plus size={16} />
                        </button>

                        <span className="min-w-5 text-center font-semibold text-slate-700">
                          {item.quantity.toLocaleString("fa-IR")}
                        </span>

                        <button
                          onClick={() => decrease(item.id)}
                          disabled={item.quantity === 1}
                          className="text-rose-500 transition hover:text-rose-600 disabled:opacity-30"
                          aria-label="کاهش تعداد"
                        >
                          <Minus size={16} />
                        </button>
                      </div>
                    </td>

                    <td className="px-4 py-5 text-center font-semibold text-slate-800">
                      {(item.price * item.quantity).toLocaleString("fa-IR")}
                      <span className="mr-1 text-xs font-normal">تومان</span>
                    </td>

                    <td className="px-4 py-5 text-center">
                      <button
                        onClick={() => remove(item.id)}
                        className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                        aria-label="حذف محصول"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-6 border-t border-rose-100 bg-[#fff9fb] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-5 text-sm">
              <p className="text-slate-500">
                تعداد محصولات:
                <span className="mr-2 font-semibold text-slate-800">
                  {totalItems.toLocaleString("fa-IR")}
                </span>
              </p>

              <p className="text-slate-500">
                مجموع:
                <span className="mr-2 text-lg font-bold text-rose-500">
                  {totalPrice.toLocaleString("fa-IR")}
                  <span className="mr-1 text-xs font-normal">تومان</span>
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={clearCart}
                className="rounded-xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-medium text-red-500 transition hover:bg-red-100"
              >
                پاک کردن سبد
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="rounded-xl bg-rose-400 px-7 py-3 text-sm font-medium text-white transition hover:bg-rose-500"
              >
                ثبت سفارش
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-rose-100 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-slate-500">جمع کل سفارش</p>

            <p className="text-xl font-bold text-rose-500">
              {totalPrice.toLocaleString("fa-IR")}
              <span className="mr-2 text-sm font-normal text-slate-500">
                تومان
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
