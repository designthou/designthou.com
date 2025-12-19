import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

const FALLBACK_IMAGE = "/rhino_class.webp";
const BASE_URL = "https://designthou.com";

export default function sanitizeHtml(html: string) {
  // 1. 개행 문자 정리
  const normalized = html.replace(/\\n/g, "");

  // 2. JSDOM 생성
  const dom = new JSDOM(normalized);
  const { window } = dom;

  // 3. DOMPurify (XSS 방어)
  const purify = DOMPurify(window);
  const cleanHtml = purify.sanitize(normalized);

  // 4. 다시 DOM으로 파싱 (이미지 필터링용)
  const document = window.document;
  document.body.innerHTML = cleanHtml;

  // 5. 이미지 필터링
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    const src = img.getAttribute("src");

    if (!src || !/^https?:\/\//.test(src)) {
      img.setAttribute("src", `${BASE_URL}/${FALLBACK_IMAGE}`);
      img.setAttribute("alt", "이미지를 불러올 수 없습니다");

      // UX 개선 (선택)
      img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");

      // 깨진 이미지 표시 방지 (client에서도 안전)
      img.setAttribute(
        "onerror",
        `this.onerror=null;this.src='${BASE_URL}/${FALLBACK_IMAGE}';`,
      );
    }
  });

  return document.body.innerHTML;
}
