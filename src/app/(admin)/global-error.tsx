"use client"; // Error components must be Client Components

import { Button } from "@/components";
import { FileExclamationPoint, Rotate3d } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="ui-flex-center flex-1 w-screen h-screen">
          <h2 className="font-bold text-xl">
            <FileExclamationPoint size={18} /> 페이지에 문제가 있습니다.
          </h2>
          <Button onClick={() => reset()}>
            <Rotate3d size={18} /> Try Again
          </Button>
          <Button type="button">Go to HOME</Button>
        </div>
      </body>
    </html>
  );
}
