"use client";

import { Button } from "@/components";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold">문제가 발생했습니다</h2>
      <p>{error.message}</p>
      <Button onClick={() => reset()}>RETRY</Button>
    </div>
  );
}
