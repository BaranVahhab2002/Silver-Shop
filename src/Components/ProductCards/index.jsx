
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="group min-w-0 overflow-hidden rounded-2xl border border-rose-100 bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-100/50">
      <Link to={product.href || "/products"} className="block">
        <div className="relative overflow-hidden bg-[#faf3f6]">
          <img
            src={product.image || "/images/product-placeholder.jpg"}
            alt={product.name}
            loading="lazy"
            className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {product.badge && (
            <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-[11px] text-rose-500">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      <div className="space-y-3 p-3 sm:p-5">
        <p className="text-xs text-rose-400">
          {product.brand || "SILVER"}
        </p>

        <Link to={product.href || "/products"}>
          <h3 className="line-clamp-2 min-h-11 text-sm font-medium leading-6 text-slate-700">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm font-semibold text-slate-800">
          {Number(product.price).toLocaleString("fa-IR")} تومان
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => product.onAddToCart?.(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-400 px-2 py-3 text-xs text-white transition hover:bg-rose-500"
          >
            <ShoppingBag size={16} />
            افزودن به سبد
          </button>

          <button
            type="button"
            onClick={() => product.onWishlist?.(product)}
            aria-label="افزودن به علاقه‌مندی‌ها"
            className="rounded-xl border border-rose-100 p-3 text-rose-400 hover:bg-rose-50"
          >
            <Heart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
