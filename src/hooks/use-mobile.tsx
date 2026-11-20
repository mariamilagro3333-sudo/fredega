import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // This check is to prevent "window is not defined" error during server-side rendering.
    if (typeof window === 'undefined') {
        return;
    }
    
    const checkSize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkSize(); 

    window.addEventListener("resize", checkSize);
    
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isMobile;
}
