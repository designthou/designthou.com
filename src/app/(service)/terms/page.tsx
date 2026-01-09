import { Metadata } from "next";
import { SiteConfig } from "@/app/config";

export const metadata: Metadata = {
  title: SiteConfig.title.TERMS,
  description: SiteConfig.description.TERMS,
  openGraph: {
    title: SiteConfig.title.TERMS,
    description: SiteConfig.title.TERMS,
    images: [
      {
        url: `${SiteConfig.url}/og/static?title=${encodeURIComponent(SiteConfig.title.TERMS)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ServiceTermsPage() {
  return (
    <section
      id=""
      className="mx-auto p-4 max-w-200 border-gray-200 border-dashed border-l border-r"
    >
      <h2 className="page-title">Terms Of Service(이용약관)</h2>
      <div className="flex flex-col gap-12 mt-8">
        <div>
          <h3 className="page-subtitle">제1조 (목적)</h3>
          <p>
            본 약관은 쇼핑몰을 운영하는 회사(이하 “사이트”)가 제공하는 인터넷
            관련 서비스 (이하 “서비스”)를 이용함에 있어 회원의 권리·의무 및
            책임사항을 규정함을 목적으로 합니다.
          </p>
          <p>
            서비스란 접속 가능한 유·무선 단말기의 종류와 상관없이 사이트가
            제공하는 모든 서비스를 의미합니다.
          </p>
        </div>

        <div>
          <h3 className="page-subtitle">제2조 (정의)</h3>
          <ol>
            <li>
              <strong>사이트</strong>란 회사가 상품을 회원에게 제공하기 위하여
              컴퓨터 등 정보통신설비를 이용하여 상품 등을 거래할 수 있도록
              설정한 가상의 영업장을 말하며, 사이버몰을 운영하는 사업자의
              의미로도 사용합니다.
              <p>
                현재 회사가 운영하는 사이트는{" "}
                <strong>https://designthou.com</strong>이며, 모바일 웹 서비스를
                포함합니다.
              </p>
            </li>
            <li className="mt-4">
              <strong>회원</strong>이란 사이트에 개인정보를 제공하여 회원등록을
              한 자로서, 사이트의 정보를 지속적으로 제공받으며 서비스를 계속
              이용할 수 있는 자를 말합니다.
            </li>
            <li className="mt-4">
              <strong>비밀번호</strong>란 회원의 동일성 확인과 권익 및
              비밀보호를 위하여 회원이 설정하여 사이트에 등록한 영문과 숫자의
              조합을 말합니다.
            </li>
            <li>
              본 약관에서 정의되지 않은 용어는 관계법령 및 일반 상관례에
              따릅니다.
            </li>
          </ol>
        </div>
        <div>
          <h3 className="page-subtitle">제3조 (약관의 명시와 개정)</h3>
          <ol>
            <li>
              회사는 약관의 내용, 상호, 대표자 성명, 주소, 전화번호,
              전자우편주소, 사업자등록번호 등을 사이트 초기 화면에 게시합니다.
            </li>
            <li>
              회사는 관계법령을 위배하지 않는 범위에서 약관을 개정할 수
              있습니다.
            </li>
            <li>
              약관을 개정할 경우 적용일자 및 개정사유를 명시하여 적용일자 7일
              전부터 공지합니다.
            </li>
            <li>
              개정약관은 적용일자 이후 체결되는 계약에만 적용됩니다.
              <p>단, 기존 회원이 동의한 경우 개정약관을 적용할 수 있습니다.</p>
            </li>
            <li>
              개정약관 시행 이후 서비스를 계속 이용하는 경우 동의한 것으로
              봅니다.
            </li>
          </ol>
        </div>

        <div>
          <h3 className="page-subtitle">제4조 (약관 외 준칙)</h3>
          <p>
            본 약관에 명시되지 않은 사항은 관계법령 및 일반 상관례에 따릅니다.
          </p>
        </div>

        <div>
          <h3 className="page-subtitle">제5조 (이용계약의 성립)</h3>
          <ol>
            <li>
              이용계약은 가입신청자가 약관에 동의하고 회원가입을 신청하여 회사가
              이를 승인함으로써 성립합니다.
            </li>
            <li>
              회사는 다음 각 호에 해당하는 경우 가입을 거부할 수 있습니다.
              <ul className="ml-4 my-4">
                <li className="list-decimal">이전에 회원자격을 상실한 경우</li>
                <li className="list-decimal">허위 정보 기재 또는 기재 누락</li>
                <li className="list-decimal">만 14세 미만</li>
                <li className="list-decimal">
                  동일한 전자우편주소로 중복 가입
                </li>
                <li className="list-decimal">부정한 목적의 이용</li>
                <li className="list-decimal">기타 약관 또는 법령 위반</li>
              </ul>
            </li>
            <li>
              회사는 설비 여유 또는 기술·업무상 문제로 승인을 유보할 수
              있습니다.
            </li>
            <li>
              이용계약 성립 시점은 회사가 가입 완료를 표시한 시점으로 합니다.
            </li>
          </ol>
        </div>

        <div>
          <h3 className="page-subtitle">제6조 (개인정보의 변경)</h3>
          <p>회원은 언제든지 개인정보를 열람하고 수정할 수 있습니다.</p>
        </div>

        <div>
          <h3 className="page-subtitle">제7조 (개인정보의 보호)</h3>
          <ol>
            <li>회사는 관계법령에 따라 회원의 개인정보를 보호합니다.</li>
            <li>개인정보처리방침을 제정하여 사이트에 게시합니다.</li>
            <li>
              회사의 공식 사이트 외 링크된 사이트에 대해서는 책임을 지지
              않습니다.
            </li>
            <li>
              법령에 따라 필요한 경우 제3자에게 개인정보를 제공할 수 있습니다.
            </li>
          </ol>
        </div>

        <div>
          <h3 className="page-subtitle">제8조 (이용계약의 종료)</h3>
          <ol>
            <li>회원은 언제든지 해지할 수 있습니다.</li>
            <li>
              회사는 약관 위반 등의 사유가 있는 경우 계약을 해지할 수 있습니다.
            </li>
            <li>계약 종료 시 적립금 및 쿠폰은 소멸됩니다.</li>
          </ol>
        </div>

        <div>
          <h3 className="page-subtitle">제9조 (회원탈퇴 및 자격상실)</h3>
          <p>
            회사는 회원이 약관을 위반하거나 거래질서를 해치는 경우 회원자격을
            제한 또는 상실시킬 수 있습니다.
          </p>
        </div>

        <div>
          <h3 className="page-subtitle">제10조 (ID 및 비밀번호 관리)</h3>
          <ol>
            <li>ID 및 비밀번호 관리 책임은 회원에게 있습니다.</li>
            <li>제3자에게 이용하게 해서는 안 됩니다.</li>
            <li>도용 사실 인지 시 즉시 회사에 통지해야 합니다.</li>
          </ol>
        </div>

        <div>
          <h3 className="page-subtitle">제11조 (회원의 의무)</h3>
          <p>
            회원은 관계법령 및 약관을 준수해야 하며, 다음 행위를 해서는 안
            됩니다.
          </p>
          <ul className="ml-4 my-4">
            <li className="list-decimal">허위 정보 등록</li>
            <li className="list-decimal">타인 정보 도용</li>
            <li className="list-decimal">저작권 침해</li>
            <li className="list-decimal">음란·폭력적 내용 게시</li>
            <li className="list-decimal">영리 목적 무단 이용</li>
          </ul>
        </div>

        <div>
          <h3 className="page-subtitle">제12조 (게시물의 관리)</h3>
          <p>
            회사는 다음에 해당하는 게시물을 사전 통지 없이 삭제할 수 있습니다.
          </p>
          <ul className="ml-4 my-4">
            <li className="list-decimal">명예훼손</li>
            <li className="list-decimal">불법·음란물</li>
            <li className="list-decimal">저작권 침해</li>
            <li className="list-decimal">상업 광고</li>
          </ul>
        </div>

        <div>
          <h3 className="page-subtitle">제13조 (회원에 대한 통지)</h3>
          <p>
            회사는 전자우편, SMS, PUSH 등으로 통지할 수 있으며, 공지로 갈음할 수
            있습니다.
          </p>
        </div>

        <div>
          <h3 className="page-subtitle">제14조 (회사의 의무)</h3>
          <p>
            회사는 안정적인 서비스 제공과 개인정보 보호를 위해 최선을 다합니다.
          </p>
        </div>

        <div>
          <h3 className="page-subtitle">제15조 (개별 서비스 약관)</h3>
          <p>
            개별 서비스에 별도 약관이 있을 경우 해당 약관이 우선 적용됩니다.
          </p>
        </div>

        <div>
          <h3 className="page-subtitle">제16조 (서비스 이용시간)</h3>
          <p>서비스는 연중무휴 24시간 제공을 원칙으로 합니다.</p>
          <p>단, 정기점검 시간은 제외됩니다.</p>
        </div>

        <div>
          <h3 className="page-subtitle">제17조 (서비스 이용책임)</h3>
          <p>회사의 명시적 허가 없이 영업활동을 할 수 없습니다.</p>
        </div>

        <div>
          <h3 className="page-subtitle">제18조 (서비스 제공 중지)</h3>
          <p>
            천재지변, 시스템 장애 등 불가항력 사유로 서비스 제공을 중지할 수
            있습니다.
          </p>
        </div>

        <div>
          <h3 className="page-subtitle">제19조 (정보 제공 및 광고)</h3>
          <p>
            회사는 서비스 운영과 관련된 정보를 제공하거나 광고를 게재할 수
            있습니다.
          </p>
        </div>

        <div>
          <h3 className="page-subtitle">제20조 (구매신청)</h3>
          <p>
            회원은 상품 선택, 배송정보 입력, 결제 동의 절차를 거쳐 구매를
            신청합니다.
          </p>
        </div>

        <div>
          <h3 className="page-subtitle">제21조 (대금지급방법)</h3>
          <p>
            신용카드, 계좌이체, 무통장입금 등 회사가 지정한 방법으로 결제할 수
            있습니다.
          </p>
        </div>

        <div>
          <h3 className="page-subtitle">제22조 (상품 공급)</h3>
          <p>회사는 상품을 신속히 배송하며, 배송 관련 정보를 명시합니다.</p>
        </div>

        <div>
          <h3 className="page-subtitle">제23조 (환급)</h3>
          <p>품절 등으로 공급이 불가한 경우 7영업일 이내 환급합니다.</p>
        </div>

        <div>
          <h3 className="page-subtitle">제24조 (청약철회)</h3>
          <p>회원은 상품 수령일로부터 7일 이내 청약철회를 할 수 있습니다.</p>
          <p>단, 사용·훼손된 상품 등은 제외됩니다.</p>
        </div>

        <div>
          <h3 className="page-subtitle">제25조 (청약철회 효과)</h3>
          <p>
            환불은 7영업일 이내 처리되며, 단순 변심 시 비용은 회원 부담입니다.
          </p>
        </div>

        <div>
          <h3 className="page-subtitle">제26조 (환불 특칙)</h3>
          <p>반품 상품 도착 및 확인 후 환불이 진행됩니다.</p>
        </div>

        <div>
          <h3 className="page-subtitle">제27조 (게시물 관련 조치)</h3>
          <p>
            권리 침해 게시물은 법령에 따라 게시중단 또는 삭제될 수 있습니다.
          </p>
        </div>
        <div>
          <h3 className="page-subtitle">제28조 (면책조항)</h3>
          <p>
            회사는 불가항력, 회원 귀책사유로 인한 손해에 대해 책임을 지지
            않습니다.
          </p>
        </div>

        <div>
          <h3 className="page-subtitle">제29조 (분쟁해결)</h3>
          <p>회사는 피해보상처리기구를 운영하며 신속히 처리합니다.</p>
        </div>

        <div>
          <h3 className="page-subtitle">제30조 (준거법 및 관할)</h3>
          <p>
            본 약관은 대한민국 법을 준거법으로 하며, 관할법원은 민사소송법에
            따릅니다.
          </p>

          <h4 className="mt-8 text-bold text-lg">부칙</h4>
          <ul>
            <li className="font-semibold font-mono">
              본 약관은 <strong>2022년 01월 01일</strong>부터 시행합니다.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
