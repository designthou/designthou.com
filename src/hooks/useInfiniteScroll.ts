import React from "react";

const defaultOptions: IntersectionObserverInit = {
  root: null,
  threshold: 0.5,
  rootMargin: "100px",
};

const useInfiniteScroll = <T extends HTMLElement>({
  callback,
  isLoading = false,
  hasNextPage = true,
  options = defaultOptions,
}: {
  callback: () => void;
  isLoading?: boolean;
  hasNextPage?: boolean;
  options?: IntersectionObserverInit;
}) => {
  const targetRef = React.useRef<T | null>(null);

  React.useEffect(() => {
    if (!targetRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isLoading) {
        callback();
      }
    }, options);

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoading, hasNextPage, options]);

  return targetRef;
};

export default useInfiniteScroll;
