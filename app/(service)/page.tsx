import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
// import { Button } from '@/components';
import { route } from "@/constants";
// import { createClient } from '@/utils/supabase/server';

export default async function HomePage() {
  // const supabase = await createClient();
  // const { data } = await supabase.from('documents').select('*');
  // console.log(data);

  return (
    <div className="flex flex-col justify-items-center min-h-screen gap-3 p-3 pb-20 bg-white">
      <div className="p-12 text-white font-semibold bg-gradient-indigo-gray-100 rounded-lg">
        <p>This is a lightweight PDF Editor</p>
        <p>Still Work In Progress ⚡️</p>
      </div>
    </div>
  );
}
