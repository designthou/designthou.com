"use client";

import { toast } from "sonner";
import { Button, Input, Textarea, Wip } from "@/components";
import { Sparkle } from "lucide-react";

export default function SupportForm() {
  return (
    <form
      className="flex flex-col gap-4 pb-8"
      onSubmit={(e) => {
        e.preventDefault();
        toast.info("Email Support will activate soon");
      }}
    >
      <Input type="email" placeholder="email@designthou.com" />
      <Textarea />
      <Button type="submit" size="lg">
        Submit
      </Button>
      <Wip
        icon={<Sparkle size={16} />}
        message={"현재 지원하지 않습니다. 곧 지원예정입니다."}
        className="font-semibold bg-gradient-indigo-gray-100"
      />
    </form>
  );
}
