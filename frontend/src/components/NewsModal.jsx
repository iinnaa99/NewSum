import React, { useEffect } from "react";

export default function NewsModal({
  title,
  press,
  upload_date,
  link,
  summary = "AI 요약 내용이 여기에 들어갑니다.",
  relatedNews = [],
  relatedWords = [],
  onClose,
}) {
  // 모달 열릴 때 스크롤 비활성화
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {/* 🔲 회색 오버레이 마스크 */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 999,
        }}
        onClick={onClose}
      />

      {/* 📰 모달 본체 */}
      <div
        style={{
          position: "fixed",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "white",
          padding: "30px",
          border: "1px solid #ccc",
          borderRadius: "15px",
          zIndex: 1000,
          width: "750px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* ✖ 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            fontSize: "1.2rem",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {/* ① 제목 */}
        <h2
          style={{
            fontSize: "1.6rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "30px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
            background: "#f9f9f9",
          }}
        >
          {title}
        </h2>

        {/* ② AI 요약 + ③ 연관어 */}
        <div style={{ display: "flex", gap: "30px", marginBottom: "30px" }}>
          {/* 요약 */}
          <div style={{ flex: 2, minWidth: "45%", minHeight: "45%" }}>
            <h4>🧠 AI 요약</h4>
            <p style={{ lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
              {summary}
            </p>
          </div>

          {/* 연관어 */}
          <div style={{ flex: 1, minWidth: "45%", minHeight: "45%" }}>
            <h4>🔗 연관어</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {relatedWords.length > 0 ? (
                relatedWords.map((word, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: "#eef",
                      borderRadius: "15px",
                      padding: "6px 10px",
                      fontSize: "0.85rem",
                      color: "#333",
                    }}
                  >
                    {word}
                  </span>
                ))
              ) : (
                <p style={{ color: "#888" }}>연관어 없음</p>
              )}
            </div>
          </div>
        </div>

        {/* ④ 관련 뉴스 */}
        <div>
          <h4 style={{ marginBottom: "10px", fontWeight: "bold" }}>
            📰 관련 뉴스
          </h4>
          {relatedNews.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                maxHeight: "180px", // 고정 높이
                overflowY: "scroll",
                paddingRight: "8px",
              }}
            >
              {relatedNews.map((news, idx) => (
                <div
                  key={idx}
                  style={{
                    width: "calc(50% - 8px)", // 가로 2개씩
                    borderBottom: "1px solid #eee",
                    paddingBottom: "10px",
                  }}
                >
                  <a
                    href={news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "#007bff",
                      textDecoration: "none",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    {news.title}
                  </a>
                  <div style={{ fontSize: "0.85rem", color: "#555" }}>
                    {news.press} |{" "}
                    {new Date(news.upload_date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#888" }}>관련 뉴스 없음</p>
          )}
        </div>
      </div>
    </>
  );
}
