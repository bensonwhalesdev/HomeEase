"use client";
import { motion } from "framer-motion";

const AuthHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="w-full text-center mb-8">
      {/* Animated gradient text */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
        {title}
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-2 text-gray-600 text-sm sm:text-base"
      >
        {subtitle}
      </motion.p>

      {/* Decorative divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-4 mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-pink-500"
      />
    </div>
  );
};

export default AuthHeader;
