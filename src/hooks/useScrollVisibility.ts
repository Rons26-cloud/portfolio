"use client";

import { useEffect, useState } from "react";

const TOP_OFFSET = 24;
const DIRECTION_THRESHOLD = 8;

export function useScrollVisibility() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let anchorY = window.scrollY;

    const onScroll = () => {
      const currentY = Math.max(window.scrollY, 0);
      const delta = currentY - anchorY;

      if (currentY <= TOP_OFFSET) {
        setHidden(false);
        anchorY = currentY;
      } else if (delta > DIRECTION_THRESHOLD) {
        setHidden(true);
        anchorY = currentY;
      } else if (delta < -DIRECTION_THRESHOLD) {
        setHidden(false);
        anchorY = currentY;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}
