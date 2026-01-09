"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { route } from "@/constants";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <Button
      type="button"
      onClick={async () => {
        try {
          const supabase = createClient();

          // sign out from the current session only
          const { error } = await supabase.auth.signOut({ scope: "local" });

          if (error) {
            throw new Error(error.message);
          }

          toast.success("성공적으로 로그아웃하였습니다.");
          router.push(route.AUTH.LOGIN);
          router.refresh();
        } catch (e) {
          console.error(e);
          toast.error("로그아웃에 문제가 발생하였습니다.");
        }
      }}
    >
      로그아웃
    </Button>
  );
}
