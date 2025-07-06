import React, { useEffect, useState } from "react";
import PressNewsCard from "./PressNewsCard";

export default function PressNews() {
  const [allNews, setAllNews] = useState([]);
  const [selectedPress, setSelectedPress] = useState("전체");
  const [page, setPage] = useState(0);
  const cardsPerPage = 3;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const q = query(collection(db, "news"), orderBy("upload_date", "desc"));
        const snapshot = await getDocs(q);
        const newsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllNews(newsList);
      } catch (err) {
        console.error("🔥 언론사별 뉴스 불러오기 실패:", err);
      }
    };

    fetchNews();
  }, []);

  const pressList = Array.from(
    new Set(allNews.map((item) => item.press?.press_name || "기타 언론사"))
  );

  const filteredNews =
    selectedPress === "전체"
      ? allNews
      : allNews.filter(
          (news) => (news.press?.press_name || "기타 언론사") === selectedPress
        );

  const totalPages = Math.ceil(filteredNews.length / cardsPerPage);
  const pagedNews = filteredNews.slice(
    page * cardsPerPage,
    page * cardsPerPage + cardsPerPage
  );

  const handleNext = () => setPage((prev) => (prev + 1) % totalPages);
  const handlePrev = () =>
    setPage((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>언론사별</h2>

      {/* 언론사 버튼 */}
      <div style={{ marginBottom: "1rem", visibility: "hidden" }}>
        {["전체", ...pressList].map((press) => (
          <button
            key={press}
            onClick={() => {
              setSelectedPress(press);
              setPage(0);
            }}
            style={{
              margin: "0 6px 6px 0",
              fontWeight: selectedPress === press ? "bold" : "normal",
              padding: "6px 12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              backgroundColor: selectedPress === press ? "#f0f0f0" : "#fff",
              cursor: "pointer",
            }}
          >
            {press}
          </button>
        ))}
      </div>

      {/* 선택된 언론사 이름 표시 */}
      {selectedPress !== "전체" && (
        <h3
          style={{ marginBottom: "0.5rem", fontWeight: "bold", color: "#222" }}
        >
          {selectedPress}
        </h3>
      )}

      {/* 뉴스 카드 3개씩 표시 */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "12px",
          flexWrap: "wrap",
        }}
      >
        {pagedNews.map((news) => (
          <PressNewsCard
            key={news.id}
            press={news.press?.press_name || "기타 언론사"}
            image={news.photo_link}
            count={filteredNews.length}
            titles={filteredNews.map((n) => ({
              title: n.title,
              press: n.press?.press_name || "기타 언론사",
            }))}
          />
        ))}
      </div>

      {/* 페이지 네비게이션 */}
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
