import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function InfiniteSlider({
  children,
  gap = 42,
  reverse = false,
  speed = 80,
  speedOnHover,
  className,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  // We map the speed strictly to an abstract duration where 100 speed = 50s duration, etc.
  const duration = (100 - speed) > 0 ? (100 - speed) : 20; 
  const hoverDuration = speedOnHover ? (100 - speedOnHover) : duration;

  return (
    <div
      className={cn("flex overflow-hidden relative w-full", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <motion.div
        className="flex min-w-max"
        style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
        animate={{ x: reverse ? [0, "-50%"] : ["-50%", 0] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: isHovered ? hoverDuration : duration,
        }}
      >
        {/* Render children twice to enable infinite loop effect */}
        {children}
        {children}
      </motion.div>
    </div>
  );
}
