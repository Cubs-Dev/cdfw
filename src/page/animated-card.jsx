{/*import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";

export default function AnimatedCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-40 rounded-t-xl" />

      <motion.div
        className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-lg"
        animate={{
          scale: isHovered ? 1.1 : 1,
          y: isHovered ? -5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative w-24 h-24 rounded-full overflow-hidden">
          {/* Remplacement de Image par img pour React 
          <img
            src="/placeholder.svg?height=96&width=96"
            alt="Profile"
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
      </motion.div>

      <div className="bg-white pt-16 pb-6 px-6 rounded-b-xl">
        <motion.div
          className="text-center"
          animate={{
            y: isHovered ? -5 : 0,
          }}
          transition={{ delay: 0.05 }}
        >
          <h3 className="text-xl font-bold text-gray-800">Sarah Johnson</h3>
          <p className="text-gray-600 mt-1">UI/UX Designer</p>
        </motion.div>

        <motion.div
          className="flex justify-between mt-6"
          animate={{
            y: isHovered ? -5 : 0,
            opacity: isHovered ? 1 : 0.9,
          }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-center">
            <p className="text-gray-800 font-bold">125</p>
            <p className="text-gray-600 text-sm">Projects</p>
          </div>
          <div className="text-center">
            <p className="text-gray-800 font-bold">12K</p>
            <p className="text-gray-600 text-sm">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-gray-800 font-bold">48</p>
            <p className="text-gray-600 text-sm">Reviews</p>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 flex gap-2"
          animate={{
            y: isHovered ? -5 : 0,
            opacity: isHovered ? 1 : 0.9,
          }}
          transition={{ delay: 0.15 }}
        >
          <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            Follow
            <Heart size={16} />
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            View Profile
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}*/}
