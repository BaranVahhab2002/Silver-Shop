import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function PopularBrands({ brands = [] }) {
  return (
    <motion.section
      dir="rtl"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-gradient-to-b from-[#fffafb] via-[#faf3f6] to-[#fdfbfc] py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-rose-200/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-pink-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col items-center justify-between gap-5 text-center sm:mb-12 sm:flex-row sm:text-right"
        >
          <div>
            <div className="mb-4 flex items-center justify-center gap-2 sm:justify-start">
              <span className="text-[11px] font-semibold tracking-[0.25em] text-rose-400">
                OUR BRANDS
              </span>
              <Sparkles size={15} className="text-rose-300" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
              برندهای محبوب
              <span className="mr-2 text-rose-400">سیلور</span>
            </h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
              زیبایی رو با انتخاب برندهای محبوب و باکیفیت تجربه کن.
            </p>
          </div>

          <Link
            to="/brands"
            className="group flex shrink-0 items-center gap-2 rounded-full border border-rose-200 bg-white/80 px-5 py-3 text-xs font-medium text-rose-500 shadow-sm transition-all duration-300 hover:border-rose-300 hover:bg-rose-400 hover:text-white hover:shadow-md hover:shadow-rose-200/40"
          >
            مشاهده همه برندها
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
          </Link>
        </motion.div>

        {brands.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
            {brands.slice(0, 5).map((brand, index) => (
              <motion.div
                key={brand.documentId || brand.id || index}
                initial={{ opacity: 0, y: 25, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -8 }}
                className="min-w-0 [&>*]:h-full"
              >
                <Link
                  to={brand.href || "/brands"}
                  className="group relative flex min-w-0 flex-col items-center overflow-hidden rounded-[22px] border border-white/80 bg-white/75 p-3 shadow-[0_8px_30px_rgba(180,125,145,0.06)] backdrop-blur-md transition-all duration-500 hover:border-rose-200 hover:bg-white hover:shadow-[0_18px_40px_rgba(190,130,155,0.15)] sm:p-4"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative mb-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded-[18px] bg-gradient-to-br from-[#fff0f5] via-[#fdf6f8] to-[#f0edf1] p-5 sm:p-7">
                    <motion.div
                      whileHover={{ scale: 1.5 }}
                      transition={{ duration: 0.5 }}
                      className="absolute h-24 w-24 rounded-full bg-white/60 blur-2xl"
                    />

                    {brand.logo ? (
                      <motion.img
                        src={brand.logo}
                        alt={brand.name}
                        loading="lazy"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        className="relative z-10 max-h-20 max-w-full object-contain drop-shadow-sm sm:max-h-24"
                      />
                    ) : (
                      <span className="relative z-10 break-words text-center text-base font-bold text-slate-600 transition-colors group-hover:text-rose-500 sm:text-lg">
                        {brand.name}
                      </span>
                    )}
                  </div>

                  <div className="flex w-full flex-1 flex-col items-center justify-between gap-3 pb-1">
                    <h3 className="line-clamp-1 w-full text-center text-sm font-semibold text-slate-700 transition-colors duration-300 group-hover:text-rose-500">
                      {brand.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-rose-400 transition-colors duration-300 group-hover:text-rose-500">
                      مشاهده محصولات
                      <ArrowLeft
                        size={14}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-rose-100 bg-white/70 px-6 py-14 text-center shadow-sm"
          >
            <Sparkles size={32} className="mx-auto mb-4 text-rose-300" />
            <p className="text-sm text-slate-500">
              هنوز برندی برای نمایش وجود ندارد.
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
