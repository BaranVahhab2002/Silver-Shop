import { useState } from "react";
import {
  Menu,
  X,
  ShoppingBag,
  UserRound,
  Heart,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";

const navLinks = [
  { label: "خانه", href: "/" },
  { label: "محصولات", href: "/products" },
  { label: "برندها", href: "/brands" },
];

export default function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems: cartCount } = useCart();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-pink-100/80 bg-white/95 shadow-[0_4px_24px_rgba(190,130,155,0.06)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex min-h-[76px] items-center justify-between gap-3">
          <a href="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-200 via-rose-100 to-slate-200 text-rose-500 shadow-sm">
              <Sparkles size={21} strokeWidth={1.7} />
            </span>
            <span className="flex flex-col">
              <span className="text-lg font-semibold tracking-[0.12em] text-slate-700 sm:text-xl">
                SILVER
              </span>
              <span className="text-[9px] tracking-[0.19em] text-rose-400 sm:text-[10px]">
                BEAUTY & CARE
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-5 lg:flex xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap text-sm text-slate-600 transition-colors duration-200 hover:text-rose-400"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="علاقه‌مندی‌ها"
              onClick={() => navigate("/favorites")}
              className="hidden h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-pink-50 hover:text-rose-400 sm:flex"
            >
              <Heart size={19} strokeWidth={1.7} />
            </button>

            <button
              type="button"
              aria-label="حساب کاربری"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-pink-50 hover:text-rose-400 sm:flex"
            >
              <UserRound size={19} strokeWidth={1.7} />
            </button>

            <button
              type="button"
              aria-label="سبد خرید"
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-400 transition hover:bg-rose-100 sm:h-10 sm:w-10"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <ShoppingBag size={19} strokeWidth={1.7} />

              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-400 px-1 text-[9px] font-medium text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-rose-200 hover:bg-pink-50 lg:hidden"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-pink-100/80 py-3 lg:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-pink-50 hover:text-rose-400"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/account"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-pink-50 hover:text-rose-400"
              >
                <UserRound size={17} />
                حساب کاربری
              </a>
              <a
                href="/favorites"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-pink-50 hover:text-rose-400"
              >
                <Heart size={17} />
                علاقه‌مندی‌ها
              </a>
            </div>
          </nav>
        )}
      </div>
    </nav>
  );
}
