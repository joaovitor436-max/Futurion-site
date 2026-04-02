import React from "react";
import { InfiniteSlider } from "./infinite-slider";
import { cn } from "../../lib/utils";

export function LogoCloud({ className, logos, ...props }) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-12 [mask-image:linear-gradient(to_right,transparent,black,transparent)] w-full",
        className
      )}
    >
      <InfiniteSlider gap={160} reverse speed={68} speedOnHover={50}>
        {logos.map((logo, idx) => (
          <img
            alt={logo.alt}
            className={cn(
              "pointer-events-none w-auto object-contain select-none opacity-90 hover:opacity-100 transition-all duration-300 brightness-[1.1] hover:brightness-[1.2]",
              logo.scale ? "" : "h-[60px] md:h-[76px]"
            )}
            style={logo.scale ? { height: `calc(${logo.scale} * 76px)` } : {}}
            height={logo.height || "auto"}
            key={`logo-${idx}-${logo.alt}`}
            loading="lazy"
            src={logo.src}
            width={logo.width || "auto"}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}
