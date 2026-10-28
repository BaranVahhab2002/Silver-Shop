import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Package,
  ShieldCheck,
  Truck,
  Heart,
} from "lucide-react";

const readFavorites = () => {
  try {
    const data = JSON.parse(localStorage.getItem("favorites") || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  const [favorites, setFavorites] = useState(readFavorites);

  useEffect(() => {
    const sync = () => setFavorites(readFavorites());
    window.addEventListener("favoritesUpdated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("favoritesUpdated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function getProduct() {
      setLoading(true);
      setError("");
      setProduct(null);
      setQuantity(1);
      setAdded(false);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_STRAPI_URL}/api/products/${id}?populate=*`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("محصول پیدا نشد");
        const data = await res.json();
        if (!controller.signal.aborted)
          setProduct(data.data?.attributes || data.data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    getProduct();
    return () => controller.abort();
  }, [id]);

  if (loading)
    return (
      <div
        dir="rtl"
        className="flex min-h-[70vh] items-center justify-center bg-[#fdfbfc] text-slate-500"
      >
        در حال دریافت اطلاعات محصول...
      </div>
    );

  if (error || !product)
    return (
      <div
        dir="rtl"
        className="flex min-h-[70vh] flex-col items-center justify-center gap-5 bg-[#fdfbfc]"
      >
        <p className="text-slate-500">{error || "محصول موردنظر پیدا نشد"}</p>
        <Link
          to="/products"
          className="rounded-xl bg-rose-400 px-6 py-3 text-sm text-white"
        >
          بازگشت به محصولات
        </Link>
      </div>
    );

  const name = product.name || product.title || "محصول";
  const price = Number(product.price || 0);
  const image = Array.isArray(product.image) ? product.image[0] : product.image;
  const imageUrl =
    image?.url || image?.data?.attributes?.url || image?.data?.url;
  const src = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `${import.meta.env.VITE_STRAPI_URL}${imageUrl}`
    : "/images/product-placeholder.jpg";
  const description = product.description;
  const isFavorite = favorites.some((item) => String(item.id) === String(id));

  const toggleFavorite = () => {
    const current = readFavorites();
    const exists = current.some((item) => String(item.id) === String(id));
    const updated = exists
      ? current.filter((item) => String(item.id) !== String(id))
      : [...current, { id, title: name, price, image: src }];

    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => String(item.id) === String(id));

    if (existing) existing.quantity += quantity;
    else cart.push({ id, name, price, image: src, quantity });

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    setAdded(true);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#fdfbfc]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-rose-500"
        >
          <ArrowRight size={18} /> بازگشت به محصولات
        </Link>

        <div className="grid gap-10 rounded-3xl border border-rose-100 bg-white p-5 sm:p-8 lg:grid-cols-2 lg:gap-14">
          <div className="relative flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#fff1f5] to-[#f6f3f6] p-5 sm:p-10">
            <img
              src={src}
              alt={name}
              className="aspect-square w-full max-w-md rounded-2xl object-contain"
            />
            <button
              type="button"
              onClick={toggleFavorite}
              aria-label={
                isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
              }
              aria-pressed={isFavorite}
              className={`absolute left-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-md transition hover:scale-110 sm:left-6 sm:top-6 ${isFavorite ? "text-rose-500" : "text-slate-400 hover:text-rose-400"}`}
            >
              <Heart
                size={22}
                strokeWidth={1.8}
                fill={isFavorite ? "currentColor" : "none"}
              />
            </button>
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-4 text-xs font-medium tracking-[0.2em] text-rose-400">
              SILVER BEAUTY & CARE
            </p>
            <h1 className="text-2xl font-bold leading-10 text-slate-800 sm:text-3xl">
              {name}
            </h1>
            <div className="my-6 h-px bg-rose-100" />

            <p className="mb-2 text-sm text-slate-400">قیمت محصول</p>
            <p className="text-2xl font-bold text-rose-500">
              {price.toLocaleString("fa-IR")}
              <span className="mr-2 text-sm font-normal text-slate-500">
                تومان
              </span>
            </p>

            <div className="my-7 h-px bg-rose-100" />
            <h2 className="mb-3 font-semibold text-slate-800">توضیحات محصول</h2>
            <div className="mb-8 text-sm leading-8 text-slate-500">
              {typeof description === "string"
                ? description
                : Array.isArray(description)
                  ? description
                      .map((block) =>
                        (block.children || [])
                          .map((child) => child.text || "")
                          .join(""),
                      )
                      .join(" ")
                  : "توضیحاتی برای این محصول ثبت نشده است."}
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="text-sm text-slate-600">تعداد:</span>
              <div className="flex items-center gap-5 rounded-xl border border-rose-100 px-3 py-2">
                <button
                  onClick={() => {
                    setQuantity(quantity + 1);
                    setAdded(false);
                  }}
                  className="text-rose-500"
                  aria-label="افزایش تعداد"
                >
                  <Plus size={18} />
                </button>
                <span className="min-w-5 text-center font-semibold text-slate-700">
                  {quantity.toLocaleString("fa-IR")}
                </span>
                <button
                  onClick={() => {
                    setQuantity(Math.max(1, quantity - 1));
                    setAdded(false);
                  }}
                  className="text-rose-500 disabled:opacity-30"
                  disabled={quantity === 1}
                  aria-label="کاهش تعداد"
                >
                  <Minus size={18} />
                </button>
              </div>
            </div>

            <button
              onClick={addToCart}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-rose-400 px-6 py-4 font-medium text-white transition hover:bg-rose-500"
            >
              {added ? <Check size={20} /> : <ShoppingBag size={20} />}
              {added ? "به سبد خرید اضافه شد" : "افزودن به سبد خرید"}
            </button>

            {added && (
              <Link
                to="/cart"
                className="mt-4 text-center text-sm font-medium text-rose-500 hover:underline"
              >
                مشاهده سبد خرید
              </Link>
            )}

            <div className="mt-9 grid grid-cols-1 gap-4 border-t border-rose-100 pt-7 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck size={20} className="shrink-0 text-rose-400" />{" "}
                ضمانت اصالت کالا
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Truck size={20} className="shrink-0 text-rose-400" /> ارسال
                سفارش
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Package size={20} className="shrink-0 text-rose-400" />{" "}
                بسته‌بندی مناسب
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
