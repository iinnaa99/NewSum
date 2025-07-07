import React, { useEffect, useState } from "react";
import axios from "axios";
import PressGroupCard from "./PressGroupCard"; // 언론사 단위 카드 컴포넌트
import NewsModal from "./NewsModal"; // 모달 import 추가

export default function PressNews() {
  const [groupedNews, setGroupedNews] = useState({});
  const [page, setPage] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState(null); // 선택된 뉴스
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const groupsPerPage = 3; // 한 페이지에 보여줄 언론사 그룹 수

  const handleTitleClick = (title) => {
    setSelectedTitle(title);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/news/press");
        const rows = res.data;

        const grouped = {};
        rows.forEach((item) => {
          const press = item.press_name || "기타 언론사";
          if (!grouped[press]) grouped[press] = [];
          grouped[press].push(item);
        });

        setGroupedNews(grouped);
      } catch (err) {
        console.error("🔥 언론사별 뉴스 API 실패:", err);
      }
    };

    fetchNews();
  }, []);

  const pressNames = Object.keys(groupedNews);
  const totalPages = Math.ceil(pressNames.length / groupsPerPage);
  const pagedPressNames = pressNames.slice(
    page * groupsPerPage,
    (page + 1) * groupsPerPage
  );

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setPage((prev) => Math.min(prev + 1, totalPages - 1));

  return (
    <div>
      <h2>언론사별</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center", // ← 가운데 정렬
        }}
      >
        {pagedPressNames.map((pressName) => (
          <PressGroupCard
            key={pressName}
            pressName={pressName}
            articles={groupedNews[pressName]}
            onTitleClick={handleTitleClick}
          />
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "12px" }}>
        <button onClick={handlePrev} disabled={page === 0}>
          ⬅️
        </button>
        <span style={{ margin: "0 0 10px" }}>
          {page + 1} / {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages - 1}>
          ➡️
        </button>
      </div>
      {/* 🔹 모달 컴포넌트 추가 */}
      {selectedTitle && (
        <NewsModal
          title={selectedTitle.title}
          link={selectedTitle.link}
          press={selectedTitle.press}
          upload_date={selectedTitle.upload_date}
          onClose={() => setSelectedTitle(null)}
        />
      )}
    </div>
  );
}
