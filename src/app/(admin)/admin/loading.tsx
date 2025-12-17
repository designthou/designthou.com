import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="ui-flex-center w-full h-full">
      <Loader className="animtate-spin" />
    </div>
  );
}
