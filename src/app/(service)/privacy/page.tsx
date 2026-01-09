import { Metadata } from "next";
import { SiteConfig } from "@/app/config";

export const metadata: Metadata = {
  title: SiteConfig.title.PRIVACY,
  description: SiteConfig.description.PRIVACY,
  openGraph: {
    title: SiteConfig.title.PRIVACY,
    description: SiteConfig.title.PRIVACY,
    images: [
      {
        url: `${SiteConfig.url}/og/static`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ServicePrivacyPage() {
  return (
    <section className="mx-auto p-4 max-w-200 border-gray-200 border-dashed border-l border-r">
      <h3 className="page-title">Privacy Policy(개인정보취급방침)</h3>
      <div className="flex flex-col gap-12 mt-8">
        <div
          className="flex flex-col gap-4"
          aria-label="Privacy First Description Section"
        >
          <h2 className="text-lg font-semibold">1. 개인정보 수집항목</h2>
          <p>
            회사는 회원가입, 쇼핑몰 이용, 서비스 신청 및 제공 등을 위하여 다음과
            같은 개인정보를 수집합니다.
          </p>
          <p>
            회사는{" "}
            <strong>
              주민등록번호 및 아이핀(I-PIN) 정보는 수집하지 않습니다.
            </strong>
          </p>

          <h3 className="text-base font-semibold">
            (1) 수집하는 개인정보 항목
          </h3>

          <div>
            <h4>① 회원 필수항목</h4>
            <ul>
              <li>전자우편주소</li>
              <li>페이스북 ID 및 페이스북에서 제공하는 정보</li>
              <li>트위터 ID 및 트위터에서 제공하는 정보</li>
              <li>구글+ ID 및 구글에서 제공하는 정보</li>
            </ul>
          </div>

          <div>
            <h4>② 비회원 필수항목</h4>
            <ul>
              <li>주문자 이름</li>
              <li>주문 결제자 주소</li>
              <li>수취인 이름</li>
              <li>배송지 정보</li>
              <li>연락처</li>
              <li>고객 메모</li>
            </ul>
          </div>

          <div>
            <h4>③ 부가항목</h4>
            <ul>
              <li>주문자 이름</li>
              <li>주문 결제자 주소</li>
              <li>수취인 이름</li>
              <li>배송지 정보</li>
              <li>연락처</li>
              <li>환불 요청 시 환불 계좌번호</li>
            </ul>
          </div>

          <div>
            <h4>④ 서비스 이용 과정에서 자동 수집되는 정보</h4>
            <ul>
              <li>서비스 이용 기록</li>
              <li>접속 로그</li>
              <li>쿠키</li>
              <li>접속 IP 정보</li>
              <li>결제 기록</li>
            </ul>
          </div>

          <h3 className="text-base font-semibold">(2) 개인정보 수집 방법</h3>
          <ul>
            <li>쇼핑몰 회원가입 시 입력 정보</li>
            <li>고객센터를 통한 전화 상담 및 온라인 상담</li>
          </ul>
        </div>

        <div aria-label="Privacy Second Description Section">
          <h4 className="text-lg font-semibold">
            2. 개인정보 수집 및 이용 목적
          </h4>

          <p>회사는 다음의 목적을 위하여 개인정보를 수집 및 이용합니다.</p>

          <ul>
            <li>회원 관리 및 본인 확인</li>
            <li>서비스 제공에 따른 대금 결제</li>
            <li>상품 배송 및 환불 처리</li>
            <li>고객 문의 및 민원 처리</li>
            <li>맞춤형 서비스 제공</li>
          </ul>

          <p>
            회사는 서비스 제공에 필요한{" "}
            <strong>최소한의 개인정보만을 수집</strong>하며, 수집한 개인정보를
            목적 외의 용도로 이용하거나 회원의 동의 없이 제3자에게 제공하지
            않습니다.
          </p>
        </div>

        <div
          className="flex flex-col gap-4"
          aria-label="Privacy Third Description Section"
        >
          <h3 className="text-lg font-semibold">
            3. 개인정보 보유 및 이용 기간
          </h3>
          <p>
            회사는 원칙적으로 개인정보의 수집 및 이용 목적이 달성된 후에는 해당
            정보를 <strong>지체 없이 파기</strong>합니다.
          </p>
          <p>
            단, 관계법령에 따라 보존할 필요가 있는 경우에는 아래와 같이 일정
            기간 보관합니다.
          </p>
          <h4 className="text-base font-semibold">
            (1) 관계법령에 따른 보관 기간
          </h4>
          <table border={1} className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left">보존 항목</th>
                <th className="text-left">보존 근거</th>
                <th className="text-left">보존 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left">표시·광고에 관한 기록</td>
                <td className="text-left">
                  전자상거래 등에서의 소비자보호에 관한 법률
                </td>
                <td className="text-left">6개월</td>
              </tr>
              <tr>
                <td className="text-left">계약 또는 청약철회에 관한 기록</td>
                <td className="text-left">
                  전자상거래 등에서의 소비자보호에 관한 법률
                </td>
                <td className="text-left">5년</td>
              </tr>
              <tr>
                <td className="text-left">대금결제 및 재화 등의 공급 기록</td>
                <td className="text-left">
                  전자상거래 등에서의 소비자보호에 관한 법률
                </td>
                <td className="text-left">5년</td>
              </tr>
              <tr>
                <td className="text-left">소비자 불만 및 분쟁처리 기록</td>
                <td className="text-left">
                  전자상거래 등에서의 소비자보호에 관한 법률
                </td>
                <td className="text-left">3년</td>
              </tr>
              <tr>
                <td className="text-left">신용정보 수집·처리 기록</td>
                <td className="text-left">
                  신용정보의 이용 및 보호에 관한 법률
                </td>
                <td className="text-left">3년</td>
              </tr>
              <tr>
                <td className="text-left">본인확인 기록</td>
                <td className="text-left">
                  정보통신망 이용촉진 및 정보보호 등에 관한 법률
                </td>
                <td className="text-left">6개월</td>
              </tr>
              <tr>
                <td className="text-left">접속 기록</td>
                <td className="text-left">통신비밀보호법</td>
                <td className="text-left">3개월</td>
              </tr>
            </tbody>
          </table>
          <h4 className="text-base font-semibold">(2) 기타</h4>
          <ul>
            <li>
              회원의 개별 동의가 있는 경우에는 동의한 기간 동안 보관합니다.
            </li>
          </ul>
        </div>

        <div
          className="flex flex-col gap-4"
          aria-label="Privacy Fourth Description Section"
        >
          <h3 className="text-lg font-semibold">4. 개인정보의 제3자 제공</h3>
          <p>
            회사는 회원의 개인정보를 수집·이용 목적 범위 내에서만 사용하며,
            회원의 사전 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
          </p>
          <h4 className="text-base font-semibold">(1) 예외 제공 사유</h4>
          <ol>
            <li>회원이 사전에 동의한 경우</li>
            <li>
              법령에 의거하거나 수사·조사 목적으로 관계기관의 요청이 있는 경우
            </li>
          </ol>
          <h3 className="text-base font-semibold">(2) 거래 이행을 위한 제공</h3>
          <p>
            서비스 이용 과정에서 주문 및 결제가 발생한 경우, 원활한 거래 이행 및
            배송을 위하여 필요한 최소한의 정보가 제공될 수 있습니다.
          </p>
          <div>
            <p>
              <strong>제공받는 자 및 제공 정보</strong>
            </p>
            <ul>
              <li>
                <strong>OO택배사</strong>
                <ul>
                  <li>주문자 이름</li>
                  <li>수취인 이름</li>
                  <li>배송지 정보</li>
                  <li>연락처</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <p>
          그 밖에 개인정보의 제3자 제공이 필요한 경우에는 사전에 회원의 동의를
          받은 후 제공됩니다.
        </p>
      </div>
    </section>
  );
}
