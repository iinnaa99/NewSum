import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

// 카테고리 목록
export const categories = [
  "전체",
  "정치",
  "경제",
  "사회",
  "문화",
  "국제",
  "지역",
  "스포츠",
  "IT/과학",
];

export default function CategoryCards() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [allNews, setAllNews] = useState([]);
  const [page, setPage] = useState(0);
  const cardsPerPage = 3;

  // ✅ MySQL API에서 뉴스 가져오기
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/news");
        const data = await response.json();
        setAllNews(data);
      } catch (error) {
        console.error("🔥 뉴스 불러오기 실패:", error);
      }
    };

    fetchNews();
  }, []);

  // ✅ 카테고리 필터링
  const filteredCards =
    selectedCategory === "전체"
      ? allNews
      : allNews.filter((card) => card.category_name === selectedCategory);

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
              setPage(0);
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

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "12px",
          flexWrap: "wrap",
        }}
      >
        {pagedCards.map((card) => (
          <NewsCard
            key={card.id}
            category={card.category_name}
            title={card.title}
            count={card.count}
            image={card.photo_link}
            sources={[card.press_name ?? "언론사 미표시"]}
          />
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "12px" }}>
        <button onClick={handlePrev}>⬅️</button>
        <span style={{ margin: "0 10px" }}>
          {totalPages > 0 ? page + 1 : 0} / {totalPages}
        </span>
        <button onClick={handleNext}>➡️</button>
      </div>
    </div>
  );
}
