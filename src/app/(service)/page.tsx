import Image from "next/image";
import { Construction, Sparkle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AspectRatio,
  Progress,
} from "@/components";
import RhinoClassImage from "/public/rhino_class.webp";

export default async function HomePage() {
  // const supabase = await createClient();
  // const { data } = await supabase.from('documents').select('*');
  // console.log(data);

  return (
    <section className="flex flex-col justify-items-center gap-12 p-4 bg-white">
      <p className="flex items-center gap-3 py-6 px-3 bg-muted text-sm text-gray-600 font-semibold rounded-lg border border-gray-100">
        <Construction size={21} />
        현재 디자인도우 플랫폼은 리뉴얼 중입니다. <br />
        플랫폼 정비 후, 올해 안으로 재오픈 예정입니다.
      </p>
      <div>
        <h2 className="mb-3 text-lg font-bold">재정비 진도율 - 20%</h2>
        <Progress value={18} className="w-full" />
      </div>

      <div>
        <h2 className="text-lg font-bold">Q & A</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold">
              <div className="flex items-center gap-2">
                <Sparkle size={16} />
                기존에 제공하던 서비스 그대로 제공하나요?
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                기존에 제공하던 건축 관련 뉴스, 공모전, 일러스트/캐드 소스,
                다양한 팁 영상 등의 컨텐츠를 순차적으로 제공할 예정입니다.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold">
              <div className="flex items-center gap-2">
                <Sparkle size={16} />
                기존 수강하던 강의는 계속 수강 가능한가요?
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="font-medium">
                기존 수강 등록해주신 분들을 대상으로{" "}
                <b>간단한 검증(이름, 이메일 대조)</b>으로 이어서 수강가능하도록
                조치할 예정입니다.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-bold">
              <div className="flex items-center gap-2">
                <Sparkle size={16} />왜 재정비에 들어갔나요?
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                기존에 운영중이던 인프라 최적화를 위해 잠시 플랫폼 운영을 쉬게
                되었습니다. 온라인 강의 제공, 다양한 소스 제공 시 발생하던 잦은
                오류를 방지하기 위해, 재정비 이후 기존 플랫폼보다 최적화된
                서비스를 제공할 예정입니다.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
        <Image
          src={RhinoClassImage}
          alt="Rhino All in one class"
          fill
          loading="lazy"
          placeholder="blur"
          className="h-full w-full rounded-xl object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </AspectRatio>
    </section>
  );
}
