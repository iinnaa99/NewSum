// NewsCardList.jsx
import React from "react";
import NewsCard from "./NewsCard"; // ⬅️ 이렇게 별도의 카드 컴포넌트로 분리
import news1 from "../assets/news1.jpg";
import news2 from "../assets/news2.jpg";

const dummyCards = [
  {
    category: "사회",
    title: "특검, 윤석열 전 대통령에 체포영장 청구…법원 기각",
    count: 48,
    image: news1,
    summary: [
      "김형연, 수감 만기 전날 추가 기소…",
      "윤석열 체포영장 기각…28일 2심 선고",
      "법원, 김용현 전 장관 추가 구속영장 발부..",
      "尹측 '특검 소환 요청에 당당히 응할 예정'",
      "尹측 '특검 28일 소환 요청에 당당히 응할 것'",
    ],
    sources: ["매일신문", "조선일보", "대구신문", "매일경제", "아시아투데이"],
  },
  {
    category: "경제",
    title: "아이오닉5N, 2025 오토카 어워즈 '파이널리스트 카' 선정",
    count: 45,
    image: news1,
    summary: [
      "아이오닉5 N, 첫 오토카 파이널리스트 선정",
      "전기차 스포츠 성능도 주목받아",
    ],
    sources: ["경향신문", "브릿지경제"],
  },
  {
    category: "국제",
    title: '트럼프 "이란 핵시설 재건 땐 다시 공격할 것"',
    count: 44,
    image: news2,
    summary: [
      "트럼프 “국방장관은 26일 회견…재공격 경고”",
      "美-이란 갈등 격화될 듯",
    ],
    sources: ["디지털타임스", "YTN"],
  },
];

export default function NewsCardList() {
  return (
    <div>
      {dummyCards.map((card, idx) => (
        <NewsCard {...card} key={idx} />
      ))}
    </div>
  );
}
