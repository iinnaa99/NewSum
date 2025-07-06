import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// 뉴스 1건 삽입 예시
const seedNewsData = async () => {
  const newsItem = {
    title: "윤 전 대통령 체포영장 기각",
    link: "https://example.com/news/1",
    photo_link: "https://example.com/image.jpg",
    upload_date: new Date().toISOString(),
    press: {
      press_id: 1,
      press_name: "조선일보",
    },
    category: {
      category_id: 3,
      category_name: "사회",
    },
    topic: {
      topic_id: 10,
      topic_content: "정치",
      cont_sum: "윤 전 대통령에 대한 체포영장이 기각되었습니다.",
      sum_date: new Date().toISOString(),
      keyword: "윤석열",
    },
  };

  try {
    const docRef = await addDoc(collection(db, "news"), newsItem);
    console.log("✅ 생성 완료:", docRef.id);
  } catch (error) {
    console.error("🔥 생성 실패:", error);
  }
};

export default seedNewsData;
