import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
// import SpecialOfferImg from "../../../../../../myShop/assests/images/special offer.jfif";
import dior from "../../../../../../myShop/assests/images/dior.jfif";
export default function SpecialOffer() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="grid overflow-hidden rounded-[2rem] bg-gradient-to-l from-[#f9dce6] to-[#f1eef3] md:grid-cols-2"
      >
        <div className="flex flex-col justify-center gap-5 p-7 sm:p-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-2 text-sm text-rose-500"
          >
            <Sparkles size={17} />
            YOUR DAILY GLOW
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl font-bold leading-relaxed text-slate-800 sm:text-4xl"
          >
            یه حس تازه،
            <span className="block text-rose-500">برای زیبایی هر روزت</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-md text-xs leading-8 text-slate-600 md:text-sm"
          >
            محصولات موردعلاقه‌ات رو کشف کن و با انتخاب‌های جدید، روتین مراقبت و
            زیبایی خودت رو کامل‌تر کن.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-fit"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 md:px-6 md:py-4 text-sm font-medium text-rose-500 transition hover:bg-rose-50"
            >
              شروع خرید
              <ArrowLeft size={17} />
            </Link>
          </motion.div>
        </div>

        <motion.img
          src={dior}
          alt="SILVER beauty collection"
          loading="lazy"
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.03 }}
          className="h-64 w-full object-cover md:h-full md:min-h-[360px]"
        />
      </motion.div>
    </motion.section>
  );
}
