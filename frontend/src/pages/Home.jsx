import Header from "../components/Header";
import TopNewsBar from "../components/TopNewsBar";
import TopicNews from "../components/TopicNews";
import PressNews from "../components/PressNews";
import React, { useState } from "react";
import NewsModal from "../components/NewsModal";

export default function Home() {
  const [selectedNews, setSelectedNews] = useState(null);

  return (
    <div style={{ width: "100%", boxSizing: "border-box" }}>
      {/* 전체를 감싸는 중앙 정렬 컨테이너 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center", // 카드들이 가운데로 오도록
          maxWidth: "12000px",
          margin: "0 auto",
          padding: "1rem",
        }}
      >
        <Header />
        <TopNewsBar />

        {/* 주제별 + 언론사별 레이아웃 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {/* 왼쪽: 주제별 */}
          <div
            className="news-section topic"
            style={{ flex: "1 1 48%", minWidth: "350px" }}
          >
            <TopicNews key="topic-news" onTitleClick={setSelectedNews} />
          </div>

          {/* 오른쪽: 언론사별 */}
          <div
            className="news-section press"
            style={{ flex: "1 1 48%", minWidth: "350px" }}
          >
            <PressNews key="press-news" onTitleClick={setSelectedNews} />
          </div>
        </div>
      </div>

      {/* 팝업창 */}
      {selectedNews && (
        <NewsModal
          title={selectedNews.title}
          link={selectedNews.link}
          press={selectedNews.press}
          upload_date={selectedNews.upload_date}
          onClose={() => setSelectedNews(null)}
        />
      )}
    </div>
  );
}
