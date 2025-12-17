import { Loader } from "lucide-react";

export default function LayoutLoader() {
  return (
    <div className="fixed inset-0 ui-flex-center w-full h-full bg-white z-9999">
      <Loader className="animate-spin" size={18} />
    </div>
  );
}
