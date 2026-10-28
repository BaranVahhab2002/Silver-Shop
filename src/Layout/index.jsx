
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Layout() {
  return (
    <div
      dir="rtl"
      className="flex min-h-screen flex-col overflow-x-clip bg-[#fdfbfc]"
    >
      <Navbar />

      <main className="flex-1 pt-[76px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
