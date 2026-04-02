import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const TestimonialsColumn = ({
  className,
  testimonials,
  duration = 10,
  reverse = false
}) => {
  return (
    <div className={cn("overflow-hidden w-full relative", className)}>
      <motion.div
        animate={{
          translateY: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 w-full"
      >
        {[...new Array(2)].map((_, arrayIndex) => (
          <React.Fragment key={arrayIndex}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div 
                className="p-8 rounded-3xl glass-card bg-white/[0.03] border border-white/10 hover:border-[#0080CC]/30 hover:bg-white/[0.05] transition-colors w-full flex flex-col gap-6" 
                key={`test-${arrayIndex}-${i}`}
              >
                <p className="text-gray-300 font-light leading-relaxed font-['Inter']">"{text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[#0080CC] to-[#0A1628] flex-shrink-0 border border-white/10 flex items-center justify-center">
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                       <span className="font-['Space_Grotesk'] font-bold text-white text-lg">{name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="font-['Space_Grotesk'] font-bold text-white tracking-tight">{name}</div>
                    <div className="text-sm font-['Inter'] text-[#60B5F0]">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
