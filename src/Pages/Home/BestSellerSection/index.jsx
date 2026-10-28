
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductCard from "../../../Components/ProductCards";

export default function BestSellers({ products = [], onAddToCart, onWishlist }) {
  return (
    <section className="bg-[#fdf7f9] py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs tracking-widest text-rose-400">
              BEST SELLERS
            </p>
            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              محصولات پرفروش
            </h2>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-rose-500"
          >
            مشاهده همه
            <ArrowLeft size={17} />
          </Link>
        </div>

        {products.length ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  onAddToCart,
                  onWishlist,
                }}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-white p-8 text-center text-sm text-slate-500">
            هنوز محصول پرفروشی برای نمایش وجود ندارد.
          </p>
        )}
      </div>
    </section>
  );
}
