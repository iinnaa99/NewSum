import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import SummaryModal from "./SummaryModal";

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
  const [categoryPage, setCategoryPage] = useState(0);
  const [summaryModalData, setSummaryModalData] = useState(null);
  const [newsModalData, setNewsModalData] = useState(null);
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

  // 🧠 SummaryModal 오픈
  const handleOpenSummaryModal = (news) => {
    const relatedNews = allNews.filter(
      (n) => n.topic_id === news.topic_id && n.news_title !== news.news_title
    );
    const keywords = news.keyword
      ? news.keyword.split(",").map((k) => k.trim())
      : [];

    setSummaryModalData({
      title: news.topic_title || "제목 없음",
      press: news.press_name ?? "언론사 미표시",
      upload_date: news.upload_date,
      link: news.news_link,
      summary: news.topic_content ?? "요약 없음",
      relatedWords: keywords,
      relatedNews: relatedNews.map((n) => ({
        title: n.news_title,
        link: n.news_link,
        press: n.press_name,
        upload_date: n.upload_date,
      })),
    });
  };

  // 📰 NewsModal 오픈
  const handleOpenNewsModal = (newsItem) => {
    setNewsModalData(newsItem); // 제목 클릭 시 newsItem은 { title, link, press, upload_date }
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
        {pagedCards.map((card, index) => {
          const sameTopicNews = filteredCards
            .filter((c) => c.topic_title === card.topic_title)
            .slice(0, 3)
            .map((c) => ({
              news_title: c.news_title,
              news_link: c.news_link,
              press_name: c.press_name,
              upload_date: c.upload_date,
            }));

          return (
            <NewsCard
              key={index}
              title={card.topic_title}
              link={card.news_link}
              image={card.photo_link}
              category={card.category_name}
              count={sameTopicNews.length}
              sources={sameTopicNews}
              onTitleClick={() => handleOpenSummaryModal(card)}
              onNewsClick={(newsItem) => handleOpenNewsModal(newsItem)}
            />
          );
        })}
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

      {/* 모달들 렌더링 */}
      {summaryModalData && (
        <SummaryModal
          {...summaryModalData}
          onClose={() => setSummaryModalData(null)}
        />
      )}
      {newsModalData && (
        <NewsModal {...newsModalData} onClose={() => setNewsModalData(null)} />
      )}
    </div>
  );
}
