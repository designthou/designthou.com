import { Metadata } from "next";
import Link from "next/link";
import { SiteConfig } from "@/app/config";

export const metadata: Metadata = {
  title: SiteConfig.title.ABOUT,
  description: SiteConfig.description.ABOUT,
  openGraph: {
    title: SiteConfig.title.ABOUT,
    description: SiteConfig.title.ABOUT,
    images: [
      {
        url: `${SiteConfig.url}/og/static`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ServiceAboutPage() {
  return (
    <section className="mx-auto p-4 max-w-200 border-gray-200 border-dashed border-l border-r">
      <h2 className="page-title">About Designthou.</h2>
      <p className="font-semibold font-mono">Start from 2022</p>
      <div className="flex flex-col gap-12 mt-8">
        <div className="">
          <h3 className="text-lg font-semibold font-mono">Platform</h3>
          <p className="mt-4">
            건축, 공간 디자이너를 위한 오픈 플랫폼.
            Designthou(디자인도우)입니다. 이곳은 건축 디자인을 위한 열린
            공간으로 건축 뉴스, 건축 / 인테리어 / 디자인 공모전 소식, 무료 캐드
            & 일러스트 오픈 소스, 유용한 작업 팁, 그리고 온라인 강의를 자유롭게
            이용할 수 있는 커뮤니티 플랫폼입니다.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold font-mono">Us</h4>
          <p className="mt-4">
            DesignThou는 건축가, 인테리어 디자이너, 가구 디자이너, 개발자 등
            다양한 구성원으로 이루어진 디자인 그룹입니다. 다양한 국내외 공모전
            경험과, 실무 프로젝트들을 진행하면서 얻은 노하우들을 기반으로
            효율적인 건축, 공간 작업 방식에 대해 수업을 기획하여 온라인 강의도
            운영하고 있습니다.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold font-mono"> Awards</h4>
          <ul className="flex flex-col gap-4 mt-4">
            <li>
              2015_ [Archallenge] Barcelona’s Monumental Pictures – Honorable
              mention
            </li>
            <li>2015_ [서울건축문화제] 을지로+지하보도 – 최우수상</li>
            <li>2015_ [19회 LH건축대전] 가로주택 재활성화 – 장려상</li>
            <li>
              2015_ [Archmedium Architecture competition] San juan cruise hub –
              3rd prize
            </li>
            <li>
              2016_ [AC-CA Architecture competition] Circus School in Moscow –
              3rd prize
            </li>
            <li>
              2016_ [Archasm Architectural competition] Rio Olympic sustainable
              Fanbox – honorable mention
            </li>
            <li>
              2018_ [임시정부기념관 공모] – 특선 2018_ [Arch Out Loud] Mumbai
              Mixed Housing – Honorable mention (Jury : Daniel Libeskind, Norman
              Foster, Dominique Perrault)
            </li>
            <li>2018_ [CYSOA]The Beach Cinema – TOP10 Shortlist</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold font-mono">Sharing Contents</h4>
          <ul className="flex flex-col gap-4 mt-4">
            <li className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <span className="font-medium">Youtube</span>
              <Link
                href="https://www.youtube.com/@DesignThou"
                target="_blank"
                rel="noopenner"
                className="text-blue-500 underline"
              >
                https://www.youtube.com/@DesignThou
              </Link>
            </li>
            <li className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <span className="font-medium">OPEN COMMUNITY(KAKAO_TALK)</span>
              <Link
                href="https://open.kakao.com/o/gzL5v2Hd"
                target="_blank"
                rel="noopenner"
                className="text-blue-500 underline"
              >
                https://open.kakao.com/o/gzL5v2Hd
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold font-mono">Outro</h4>
          <p className="mt-4">
            Thank you for reading and being part of this community
          </p>
        </div>
      </div>
    </section>
  );
}
