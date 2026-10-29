import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import HeroImage from "../../../../../../myShop/assests/images/herosection.jfif";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden bg-gradient-to-bl from-[#fff0f5] via-[#fdfbfc] to-[#f2f3f6]"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 md:py-20 lg:px-12">
        <div className="order-2 space-y-6 text-center md:order-1 md:text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/70 px-4 py-2 text-xs text-rose-500">
              <Sparkles size={15} />
              SILVER BEAUTY & CARE
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl font-bold leading-[1.6] text-slate-800 sm:text-4xl lg:text-6xl"
          >
            زیبایی، از
            <span className="block text-rose-400">مراقبت شروع می‌شه</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto max-w-lg text-sm leading-9 text-slate-500 md:mx-0 sm:text-base"
          >
            با مجموعه‌ای از محصولات مراقبت پوست، مو و زیبایی، روتین مخصوص خودت
            رو بساز و هر روز بیشتر بدرخش.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 md:justify-start"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-rose-400 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-500"
            >
              مشاهده محصولات
              <ArrowLeft size={17} />
            </Link>

            <Link
              to="/brands"
              className="rounded-xl border border-rose-200 bg-white px-5 py-3 text-sm text-slate-700 transition hover:bg-rose-50"
            >
              کشف برندها
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative order-1 md:order-2"
        >
          <div className="absolute -inset-5 rounded-full bg-rose-200/30 blur-3xl" />

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-[#f9e8ee] shadow-xl shadow-rose-100/60"
          >
            <img
              src={HeroImage}
              alt="SILVER beauty products"
              className="h-[320px] w-full object-cover sm:h-[430px] lg:h-[520px]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -bottom-4 right-4 rounded-2xl border border-white bg-white/90 px-4 py-2 md:px-5 md:py-3 shadow-lg backdrop-blur flex items-center flex-col"
          >
            <p className="text-xs text-slate-400">YOUR DAILY</p>
            <p className="text-sm font-semibold tracking-widest text-rose-400 md:text-lg">
              GLOW
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
