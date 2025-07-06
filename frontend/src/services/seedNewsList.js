import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// 10개 뉴스 더미 데이터
const dummyNewsList = [
  {
    title: "이재명 대통령, 경제 재도약 강조",
    link: "https://example.com/news/3",
    photo_link: "https://example.com/image3.jpg",
    count: Math.floor(Math.random() * 50) + 10,
    upload_date: new Date().toISOString(),
    press: { press_id: 3, press_name: "한겨레" },
    category: { category_id: 1, category_name: "경제" },
    topic: {
      topic_id: 12,
      topic_content: "정책",
      cont_sum: "대통령이 경제정책 방향을 설명했습니다.",
      sum_date: new Date().toISOString(),
      keyword: "경제정책",
    },
  },
  {
    title: "트럼프 전 대통령, 국제 정치 발언 화제",
    link: "https://example.com/news/4",
    photo_link: "https://example.com/image4.jpg",
    count: Math.floor(Math.random() * 50) + 10,
    upload_date: new Date().toISOString(),
    press: { press_id: 4, press_name: "조선일보" },
    category: { category_id: 2, category_name: "국제" },
    topic: {
      topic_id: 13,
      topic_content: "외교",
      cont_sum: "트럼프가 이란 핵 관련 발언을 했습니다.",
      sum_date: new Date().toISOString(),
      keyword: "이란",
    },
  },
  {
    title: "서울시, 지하철 냉방 강화 조치 발표",
    link: "https://example.com/news/5",
    photo_link: "https://example.com/image5.jpg",
    count: Math.floor(Math.random() * 50) + 10,
    upload_date: new Date().toISOString(),
    press: { press_id: 5, press_name: "서울신문" },
    category: { category_id: 3, category_name: "사회" },
    topic: {
      topic_id: 14,
      topic_content: "생활",
      cont_sum: "폭염 대응으로 냉방 강화 방안이 도입됩니다.",
      sum_date: new Date().toISOString(),
      keyword: "폭염",
    },
  },
];

// Firestore에 모든 뉴스 삽입
const seedNewsList = async () => {
  try {
    for (const item of dummyNewsList) {
      const docRef = await addDoc(collection(db, "news"), item);
      console.log("✅ 저장 완료:", docRef.id);
    }
  } catch (error) {
    console.error("🔥 저장 실패:", error);
  }
};

export default seedNewsList;
