import { useState, useEffect } from "react";
import { throttle } from "es-toolkit";

const WAIT_TIME = 300;

export default function useScroll() {
  const [pageYOffset, setPageYOffset] = useState(0);

  const handleScroll = throttle(() => {
    setPageYOffset(window.pageYOffset);
  }, WAIT_TIME);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return pageYOffset;
}
