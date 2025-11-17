import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

/* mouse tilt: small lightweight */
function useTilt() {
  const ref = useRef();
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (y - 0.5) * 6; // rotateX (invert)
      const ry = (x - 0.5) * -10; // rotateY
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    }
    function onLeave() {
      el.style.transform = "";
    }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return ref;
}

export default function CompanyCard({ company }) {
  const ref = useTilt();

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="group">
      <div ref={ref} className="relative p-[2px] rounded-2xl bg-gradient-to-br from-indigo-400/40 via-purple-400/30 to-blue-400/40 hover:shadow-xl transition">
        <div className="bg-white/80 dark:bg-[#1c1c1e]/85 backdrop-blur-md rounded-2xl p-5 border border-white/30 dark:border-gray-700/60 transition-transform duration-300 group-hover:-translate-y-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{company.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-4">{company.industry} • {company.location}</p>

          <div className="flex justify-between mb-5">
            <div>
              <p className="text-xs text-gray-400">Employees</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{company.employees}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Founded</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{company.founded}</p>
            </div>
          </div>

          <a href={company.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
            Visit Website <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
