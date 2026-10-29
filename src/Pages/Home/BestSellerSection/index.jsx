
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "../../../Components/ProductCards";

export default function BestSellers({
  products = [],
  onAddToCart,
  onWishlist,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="bg-[#fdf7f9] py-16"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-9 flex flex-wrap items-end justify-between gap-4"
        >
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
            className="inline-flex items-center gap-2 text-sm text-rose-500 transition-colors hover:text-rose-700"
          >
            مشاهده همه
            <ArrowLeft size={17} />
          </Link>
        </motion.div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {products.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.12,
                }}
                whileHover={{ y: -5 }}
                className="min-w-0 [&>*]:h-full"
              >
                <ProductCard
                  product={{
                    ...product,
                    onAddToCart,
                    onWishlist,
                  }}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-white p-8 text-center text-sm text-slate-500"
          >
            هنوز محصول پرفروشی برای نمایش وجود ندارد.
          </motion.p>
        )}
      </div>
    </motion.section>
  );
}
