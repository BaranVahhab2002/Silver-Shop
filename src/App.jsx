import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "./Router";
import { motion } from "framer-motion";

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: "inherit",
            direction: "rtl",
          },
          success: {
            style: {
              background: "#ecfdf5",
              color: "#047857",
            },
          },
          error: {
            style: {
              background: "#fef2f2",
              color: "#dc2626",
            },
          },
        }}
      />

      <RouterProvider router={router} />
    </motion.div>
  );
}
