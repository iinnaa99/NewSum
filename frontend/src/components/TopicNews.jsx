import React, { useState } from "react";
import NewsCard from "./NewsCard"; // ✅ 카드 단일 컴포넌트만 사용

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
  {
    category: "경제",
    title: "아이오닉5N, 2025 오토카 어워즈 파이널리스트 선정",
    count: 45,
    image: "/images/news2.jpg",
    summary: ["아이오닉5 N, 파이널리스트 선정", "세계 첫 고성능 전기차 기술"],
    sources: ["경향신문"],
  },
  {
    category: "정치",
    title: "트럼프 '이란 핵시설 재건 땐 다시 공격할 것'",
    count: 44,
    image: "/images/news2.jpg",
    summary: ["재공격 경고", "美-이란 갈등 격화"],
    sources: ["YTN"],
  },
  {
    category: "국제",
    title: "이상민 대통령, 6·25 전쟁 75주년 발언",
    count: 40,
    image: "/images/news1.jpg",
    summary: ["‘한·미·일 연합’ 강조", "보훈 강화 정책"],
    sources: ["연합뉴스"],
  },
  {
    category: "정치",
    title: "윤석열 전 대통령 출국금지 조치",
    count: 32,
    image: "/images/news2.jpg",
    summary: ["법무부 발표", "수사 연장 가능성"],
    sources: ["조선일보"],
  },
];

const categories = [
  "전체",
  "정치",
  "경제",
  "사회",
  "문화",
  "국제",
  "지역",
  "스포츠",
  "IT과학",
];

export default function CategoryCards() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [page, setPage] = useState(0);
  const cardsPerPage = 3;

  const filteredCards =
    selectedCategory === "전체"
      ? dummyCards
      : dummyCards.filter((card) => card.category === selectedCategory);

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  const pagedCards = filteredCards.slice(
    page * cardsPerPage,
    page * cardsPerPage + cardsPerPage
  );

  const handleNext = () => setPage((prev) => (prev + 1) % totalPages);
  const handlePrev = () =>
    setPage((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <div>
      <h2>주제별</h2>
      <div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setPage(0); // reset page
            }}
            style={{
              margin: "0 6px",
              fontWeight: selectedCategory === cat ? "bold" : "normal",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 카드 표시 */}
      <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
        {pagedCards.map((card, index) => (
          <NewsCard key={index} {...card} />
        ))}
      </div>

      {/* 페이지 이동 */}
      <div style={{ textAlign: "center", marginTop: "12px" }}>
        <button onClick={handlePrev}>⬅️</button>
        <span style={{ margin: "0 10px" }}>
          {page + 1} / {totalPages}
        </span>
        <button onClick={handleNext}>➡️</button>
      </div>
    </div>
  );
}
