import { Sparkle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components";

export default function FaqAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold text-base">
          <div className="flex items-center gap-2">
            <Sparkle size={16} />왜 재정비에 들어갔나요?
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 pl-4 text-balance">
          <p>
            기존에 운영중이던 인프라 최적화를 위해 잠시 플랫폼 운영을 쉬게
            되었습니다. 온라인 강의 제공, 다양한 소스 제공 시 발생하던 잦은
            오류를 방지하기 위해, 재정비 이후 기존 플랫폼보다 최적화된 서비스를
            제공할 예정입니다.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="font-bold text-base">
          <div className="flex items-center gap-2">
            <Sparkle size={16} />
            기존에 제공하던 서비스 그대로 제공하나요?
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 pl-4 text-balance">
          <p>
            기존에 제공하던 건축 관련 뉴스, 공모전, 일러스트/캐드 소스, 다양한
            팁 영상 등의 컨텐츠를 순차적으로 제공할 예정입니다.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="font-bold text-base">
          <div className="flex items-center gap-2">
            <Sparkle size={16} />
            기존 수강하던 강의는 계속 수강 가능한가요?
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 pl-4 text-balance">
          <p className="font-medium">
            기존 수강 등록해주신 분들을 대상으로{" "}
            <b>간단한 검증(이름, 이메일 대조)</b>으로 이어서 수강가능하도록
            조치할 예정입니다.
          </p>
          <p>
            기존과 같이 구매 / 신청한 기간으로부터 최대 6개월 간 수강가능합니다.
            예외적으로, Rhino All-in-One Class무료 이벤트 참여하셨던
            수강생분들은 지속적으로 수강 가능합니다.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
