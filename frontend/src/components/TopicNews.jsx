import React from "react";
import NewsCard from "./NewsCardList";

const dummyCards = [
  {
    category: "사회",
    title: "특검, 윤석열 전 대통령에 체포영장 청구…법원 기각",
    count: 48,
    image: "/images/news1.jpg",
    summary: [
      "김형연, 수감 만기 전날 추가 기소…",
      "윤석열 체포영장 기각…28일 2심 선고",
    ],
    sources: ["매일신문", "조선일보"],
  },
  // ... 추가 카드들
];

export default function CategoryCards() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        justifyContent: "space-between",
      }}
    >
      {dummyCards.map((card, idx) => (
        <NewsCard
          key={idx}
          category={card.category}
          title={card.title}
          count={card.count}
          image={card.image}
          summary={card.summary}
          sources={card.sources}
        />
      ))}
    </div>
  );
}
