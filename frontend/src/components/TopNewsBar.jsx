import React, { useEffect, useState, useRef } from "react";

export default function TopNewsBar() {
  const [topNews, setTopNews] = useState([]);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchTopNews = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/news/top10");
        const data = await response.json();
        setTopNews(data);
      } catch (error) {
        console.error("🔥 Top 뉴스 불러오기 실패:", error);
      }
    };

    fetchTopNews();
  }, []);

  const leftNews = topNews.slice(0, 5);
  const rightNews = topNews.slice(5, 10);

  return (
    <div style={{ width: "100%", margin: "1rem" }}>
      {/* 날짜 */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem",
          color: "#444",
          fontWeight: "bold",
          fontSize: "15pt",
        }}
      >
        {new Date().toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "short",
        })}
      </div>

      {/* 뉴스 목록 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          background: "#0a0a1a",
          color: "#fff",
          padding: "1.5rem",
          borderRadius: "1rem",
        }}
      >
        {/* 왼쪽 열 */}
        <ol style={{ listStyle: "none", padding: 0, margin: 0, width: "48%" }}>
          {leftNews.map((news, i) => (
            <li
              key={news.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem 1rem",
                marginBottom: "0.5rem",
                fontSize: "1.1rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  maxWidth: "80%",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <strong style={{ marginRight: "0.75rem", color: "#ccc" }}>
                  {i + 1}
                </strong>
                {news.title}
              </span>
              <span
                style={{
                  whiteSpace: "nowrap",
                  color: "#007bff",
                  fontWeight: "bold",
                }}
              >
                {news.count ?? 0}건
              </span>
            </li>
          ))}
        </ol>

        {/* 오른쪽 열 */}
        <ol style={{ listStyle: "none", padding: 0, margin: 0, width: "48%" }}>
          {rightNews.map((news, i) => (
            <li
              key={news.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem 1rem",
                marginBottom: "0.5rem",
                fontSize: "1.1rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  maxWidth: "80%",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <strong style={{ marginRight: "0.75rem", color: "#ccc" }}>
                  {i + 6}
                </strong>
                {news.title}
              </span>
              <span
                style={{
                  whiteSpace: "nowrap",
                  color: "#007bff",
                  fontWeight: "bold",
                }}
              >
                {news.count ?? 0}건
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
