import db from "./db.js";

// 더미 데이터
const categories = [
  { category_id: 1, category_name: "정치" },
  { category_id: 2, category_name: "경제" },
  { category_id: 3, category_name: "사회" },
  { category_id: 4, category_name: "문화" },
  { category_id: 5, category_name: "국제" },
  { category_id: 6, category_name: "지역" },
  { category_id: 7, category_name: "스포츠" },
  { category_id: 8, category_name: "IT/과학" },
];

const presses = [
  { press_id: 1, press_name: "조선일보" },
  { press_id: 2, press_name: "한겨레" },
  { press_id: 3, press_name: "중앙일보" },
  { press_id: 4, press_name: "전자신문" },
  { press_id: 5, press_name: "동아일보" },
  { press_id: 6, press_name: "채널A" },
  { press_id: 7, press_name: "매일경제" },
  { press_id: 8, press_name: "데일리안" },
  { press_id: 9, press_name: "KBS" },
];

const topics = [
  {
    topic_id: 1,
    topic_content: "총선",
    new_cnt: 35,
    sum_date: new Date(),
    keyword: "선거",
    cont_sum: "이번 총선은 치열한 접전이 예상됩니다.",
  },
  {
    topic_id: 2,
    topic_content: "환율 상승",
    new_cnt: 27,
    sum_date: new Date(),
    keyword: "경제",
    cont_sum: "환율 상승에 따라 시장 불안이 커지고 있습니다.",
  },
  {
    topic_id: 3,
    topic_content: "지진 발생",
    new_cnt: 18,
    sum_date: new Date(),
    keyword: "재난",
    cont_sum: "지진으로 인해 지역 주민들의 피해가 속출하고 있습니다.",
  },
  {
    topic_id: 4,
    topic_content: "우크라이나 전쟁",
    new_cnt: 42,
    sum_date: new Date(),
    keyword: "국제",
    cont_sum: "러시아와 우크라이나 간 충돌이 격화되고 있습니다.",
  },
  {
    topic_id: 5,
    topic_content: "AI 기술 발전",
    new_cnt: 50,
    sum_date: new Date(),
    keyword: "기술",
    cont_sum: "AI 기술이 빠르게 발전하면서 산업 전반에 영향을 미치고 있습니다.",
  },
  {
    topic_id: 6,
    topic_content: "부동산 규제",
    new_cnt: 31,
    sum_date: new Date(),
    keyword: "부동산",
    cont_sum: "정부의 부동산 규제로 매매 심리가 위축되고 있습니다.",
  },
  {
    topic_id: 7,
    topic_content: "K-콘텐츠 수출",
    new_cnt: 29,
    sum_date: new Date(),
    keyword: "문화",
    cont_sum: "K-콘텐츠가 세계적으로 주목을 받고 있습니다.",
  },
  {
    topic_id: 8,
    topic_content: "지방선거 결과",
    new_cnt: 19,
    sum_date: new Date(),
    keyword: "정치",
    cont_sum: "지방선거 결과가 전국 정계에 큰 파장을 일으키고 있습니다.",
  },
  {
    topic_id: 9,
    topic_content: "전기차 보급 확대",
    new_cnt: 23,
    sum_date: new Date(),
    keyword: "자동차",
    cont_sum: "전기차 보급 확대에 따른 인프라 확충이 요구됩니다.",
  },
  {
    topic_id: 10,
    topic_content: "물가 상승",
    new_cnt: 36,
    sum_date: new Date(),
    keyword: "경제",
    cont_sum: "생활 물가 상승으로 시민들의 체감 경기가 악화되고 있습니다.",
  },
];

const news = [
  {
    title: "여야 총선 준비 본격화",
    link: "https://news.example.com/1",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/277/2025/07/06/0005618291_001_20250706150511818.png?type=w860",
    press_id: 1,
    category_id: 1,
    topic_id: 1,
  },
  {
    title: "환율 1400원 돌파",
    link: "https://news.example.com/2",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/015/2025/07/06/0005154180_001_20250706220709652.jpg?type=w860",
    press_id: 2,
    category_id: 2,
    topic_id: 2,
  },
  {
    title: "규모 5.2 지진 발생",
    link: "https://news.example.com/3",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/277/2025/07/06/0005618291_001_20250706150511818.png?type=w860",
    press_id: 3,
    category_id: 3,
    topic_id: 3,
  },
  {
    title: "우크라이나 동부 전투 격화",
    link: "https://news.example.com/4",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/015/2025/07/06/0005154180_001_20250706220709652.jpg?type=w860",
    press_id: 4,
    category_id: 4,
    topic_id: 4,
  },
  {
    title: "AI 기술로 인한 직업 변화",
    link: "https://news.example.com/5",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/015/2025/07/06/0005154180_001_20250706220709652.jpg?type=w860",
    press_id: 5,
    category_id: 5,
    topic_id: 5,
  },
  {
    title: "부동산 거래량 급감",
    link: "https://news.example.com/6",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/277/2025/07/06/0005618291_001_20250706150511818.png?type=w860",
    press_id: 1,
    category_id: 6,
    topic_id: 6,
  },
  {
    title: "K-드라마 수출 30% 증가",
    link: "https://news.example.com/7",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/008/2025/07/06/0005217631_001_20250706211014839.jpg?type=w860",
    press_id: 2,
    category_id: 5,
    topic_id: 7,
  },
  {
    title: "지방선거서 여당 압승",
    link: "https://news.example.com/8",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/008/2025/07/06/0005217631_001_20250706211014839.jpg?type=w860",
    press_id: 3,
    category_id: 1,
    topic_id: 8,
  },
  {
    title: "전기차 충전소 확대 추진",
    link: "https://news.example.com/9",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/031/2025/07/06/0000946274_001_20250706182707340.jpg?type=w860",
    press_id: 4,
    category_id: 6,
    topic_id: 9,
  },
  {
    title: "물가 상승률 5% 돌파",
    link: "https://news.example.com/10",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/031/2025/07/06/0000946274_001_20250706182707340.jpg?type=w860",
    press_id: 5,
    category_id: 2,
    topic_id: 10,
  },
  {
    title: "야당 총선 후보 확정",
    link: "https://news.example.com/11",
    upload_date: new Date(),
    photo_link:
      "hhttps://imgnews.pstatic.net/image/031/2025/07/06/0000946274_001_20250706182707340.jpg?type=w860",
    press_id: 1,
    category_id: 1,
    topic_id: 1,
  },
  {
    title: "달러 강세에 원화 약세",
    link: "https://news.example.com/12",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/031/2025/07/06/0000946274_001_20250706182707340.jpg?type=w860",
    press_id: 2,
    category_id: 2,
    topic_id: 2,
  },
  {
    title: "지진 피해 복구 현장",
    link: "https://news.example.com/13",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/138/2025/07/05/0002200033_001_20250705000508243.jpg?type=w860",
    press_id: 3,
    category_id: 3,
    topic_id: 3,
  },
  {
    title: "전쟁 장기화로 난민 증가",
    link: "https://news.example.com/14",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/138/2025/07/05/0002200033_001_20250705000508243.jpg?type=w860",
    press_id: 4,
    category_id: 4,
    topic_id: 4,
  },
  {
    title: "AI 반도체 개발 경쟁",
    link: "https://news.example.com/15",
    upload_date: new Date(),
    photo_link:
      "hhttps://imgnews.pstatic.net/image/138/2025/07/05/0002200033_001_20250705000508243.jpg?type=w860",
    press_id: 5,
    category_id: 5,
    topic_id: 5,
  },
  {
    title: "주택담보대출 규제 강화",
    link: "https://news.example.com/16",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/138/2025/07/05/0002200033_001_20250705000508243.jpg?type=w860g",
    press_id: 1,
    category_id: 6,
    topic_id: 6,
  },
  {
    title: "K-POP 열풍 미국 강타",
    link: "https://news.example.com/17",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/138/2025/07/05/0002200033_001_20250705000508243.jpg?type=w860",
    press_id: 2,
    category_id: 5,
    topic_id: 7,
  },
  {
    title: "야당, 지방선거 패배 인정",
    link: "https://news.example.com/18",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/030/2025/07/05/0003328512_001_20250705223111189.png?type=w860",
    press_id: 3,
    category_id: 1,
    topic_id: 8,
  },
  {
    title: "전기차 보조금 확대 발표",
    link: "https://news.example.com/19",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/030/2025/07/05/0003328512_001_20250705223111189.png?type=w860",
    press_id: 4,
    category_id: 2,
    topic_id: 9,
  },
  {
    title: "식료품 물가 고공행진",
    link: "https://news.example.com/20",
    upload_date: new Date(),
    photo_link:
      "https://imgnews.pstatic.net/image/030/2025/07/05/0003328512_001_20250705223111189.png?type=w860",
    press_id: 5,
    category_id: 2,
    topic_id: 10,
  },
];

async function seedDatabase() {
  try {
    // 외래키 체크 끄기
    await db.query("SET FOREIGN_KEY_CHECKS = 0");

    // 기존 데이터 제거
    await db.query("DELETE FROM news");
    await db.query("DELETE FROM topics");
    await db.query("DELETE FROM press");
    await db.query("DELETE FROM category");

    // 외래키 체크 다시 켜기
    await db.query("SET FOREIGN_KEY_CHECKS = 1");

    // 카테고리 삽입
    for (const cat of categories) {
      await db.query("INSERT INTO category SET ?", [cat]);
    }

    // 언론사 삽입
    for (const press of presses) {
      await db.query("INSERT INTO press SET ?", [press]);
    }

    // 토픽 삽입
    for (const topic of topics) {
      await db.query("INSERT INTO topics SET ?", [topic]);
    }

    // 뉴스 삽입
    for (const item of news) {
      await db.query("INSERT INTO news SET ?", [item]);
    }

    console.log("🎉 DB 시드 데이터 삽입 완료!");
    process.exit();
  } catch (err) {
    console.error("❌ 시드 실패:", err);
    process.exit(1);
  }
}

seedDatabase();
