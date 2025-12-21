"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingOverlay({
  show = false,
  text = "Memproses...",
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm text-white"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            <p className="text-lg font-medium">{text}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
