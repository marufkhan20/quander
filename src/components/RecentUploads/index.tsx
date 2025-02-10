import { SIDEBAR_ITEMS } from "@/contants";
import { motion } from "framer-motion";
import VideoItem from "./VideoItem";

const RecentUploads = () => {
  const videos = [1, 2, 3, 4];
  return (
    <div className="mt-[30px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: SIDEBAR_ITEMS?.length * 0.1 }}
      >
        <h3 className="text-base font-semibold text-[#f1f1f1]">
          Recent Uploads
        </h3>
      </motion.div>

      <div className="mt-5 flex flex-col gap-5">
        {videos?.map((item, idx) => (
          <motion.div
            key={item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: (SIDEBAR_ITEMS?.length + idx) * 0.1 }}
            className="relative group w-full"
          >
            <VideoItem />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentUploads;
