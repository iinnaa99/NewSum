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

export default function CategoryCards({ onTitleClick }) {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [allNews, setAllNews] = useState([]);
  const [categoryPage, setCategoryPage] = useState(0);
  const cardsPerPage = 3;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/news/topic");
        const data = await response.json();
        setAllNews(data);
      } catch (error) {
        console.error("🔥 뉴스 불러오기 실패:", error);
      }
    };

    fetchNews();
  }, []);

  const filteredCards =
    selectedCategory === "전체"
      ? allNews
      : allNews.filter((card) => card.category_name === selectedCategory);

  const pagedCards = filteredCards.slice(
    categoryPage,
    categoryPage + cardsPerPage
  );

  const handleCategoryNext = () => {
    if (categoryPage < filteredCards.length - cardsPerPage) {
      setCategoryPage((prev) => prev + 1);
    }
  };

  const handleCategoryPrev = () => {
    if (categoryPage > 0) {
      setCategoryPage((prev) => prev - 1);
    }
  };

  const handleTitleClick = (news) => {
    onTitleClick?.(news);
  };

  return (
    <div>
      <h2>주제별</h2>
      <div style={{ marginBottom: "1.4rem" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCategoryPage(0);
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
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center",
        }}
      >
        {pagedCards.map((card, index) => (
          <NewsCard
            key={index}
            title={card.news_title}
            link={card.news_link}
            image={card.photo_link}
            category={card.category_name}
            count={filteredCards.length}
            sources={[card.press_name ?? "언론사 미표시"]}
            onTitleClick={handleTitleClick}
          />
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "12px" }}>
        <button onClick={handleCategoryPrev} disabled={categoryPage === 0}>
          ⬅️
        </button>
        <span style={{ margin: "0 10px" }}>
          {filteredCards.length > 0
            ? `${Math.min(
                categoryPage + 1,
                filteredCards.length - cardsPerPage + 1
              )} / ${Math.max(filteredCards.length - cardsPerPage + 1, 1)}`
            : "0 / 0"}
        </span>
        <button
          onClick={handleCategoryNext}
          disabled={categoryPage >= filteredCards.length - cardsPerPage}
        >
          ➡️
        </button>
      </div>
    </div>
  );
}
