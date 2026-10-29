import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";

export default function ProductCard({
  id,
  title,
  slug,
  price,
  finalPrice,
  image,
  brandTitle,
  discountPercent,
  minPrice,
  maxPrice,
  onAddToCart,
  onWishlist,
  isFavorite = false,
}) {
  return (
    <div className="group min-w-0 overflow-hidden rounded-2xl border border-rose-100 bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-100/50">
      <Link
        to={`/product-details/${id}/${encodeURIComponent(title || "")}`}
        className="block"
      >
        <div className="relative overflow-hidden bg-[#faf3f6]">
          <img
            src={image}
            alt={title || "محصول"}
            className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {Number(discountPercent) > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-rose-500 px-3 py-1 text-[11px] text-white">
              {discountPercent}٪ تخفیف
            </span>
          )}
        </div>
      </Link>

      <div className="space-y-3 p-3 sm:p-5">
        <p className="text-xs text-rose-400">{brandTitle || "SILVER"}</p>

        <Link to={`/product-details/${id}/${encodeURIComponent(title || "")}`}>
          <h3 className="line-clamp-2 min-h-11 text-sm font-medium leading-6 text-slate-700">
            {title || "محصول"}
          </h3>
        </Link>

        {minPrice != null &&
          maxPrice != null &&
          Number(minPrice) !== Number(maxPrice) && (
            <p className="text-xs text-slate-500">
              از {Number(minPrice).toLocaleString("fa-IR")} تا{" "}
              {Number(maxPrice).toLocaleString("fa-IR")} تومان
            </p>
          )}

        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-slate-800">
            {Number(finalPrice ?? price ?? minPrice ?? 0).toLocaleString(
              "fa-IR",
            )}{" "}
            تومان
          </p>

          {finalPrice != null &&
            price != null &&
            Number(finalPrice) < Number(price) && (
              <p className="text-xs text-slate-400 line-through">
                {Number(price).toLocaleString("fa-IR")} تومان
              </p>
            )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              onAddToCart?.({
                id,
                title,
                slug,
                price,
                finalPrice,
                image,
                brandTitle,
              })
            }
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-400 px-2 py-3 text-xs text-white transition hover:bg-rose-500"
          >
            <ShoppingBag size={16} />
            افزودن به سبد
          </button>

          <button
            type="button"
            onClick={() =>
              onWishlist?.({
                id,
                title,
                price: finalPrice ?? price ?? minPrice ?? 0,
                image,
              })
            }
            aria-label="افزودن به علاقه‌مندی‌ها"
            aria-pressed={isFavorite}
            className={`rounded-xl border border-rose-100 p-3 transition hover:bg-rose-50 ${
              isFavorite ? "text-rose-500" : "text-rose-400"
            }`}
          >
            <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        <Link
          to={`/product-details/${id}/${encodeURIComponent(title || "")}`}
          className="flex flex-1 items-center justify-center rounded-xl border border-rose-200 px-2 py-3 text-center text-xs text-rose-500 transition hover:bg-rose-50"
        >
          مشاهده جزئیات
        </Link>
      </div>
    </div>
  );
}
