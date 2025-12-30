import Image from "next/image";
import Link from "next/link";
import kakaoSVG from "@/public/kakao.svg";

export default function KakaoOpenChat() {
  return (
    <Link
      href="https://open.kakao.com/o/gzL5v2Hd"
      target="_blank"
      className="fixed bottom-24 right-4 inline-flex justify-center items-center p-2 w-12 h-12 rounded-full bg-amber-300 z-20"
      aria-label="Open Kakao Open Chat of Designthou"
    >
      <Image src={kakaoSVG} alt="kakao" className="block w-full h-full" />
    </Link>
  );
}
