import React from "react";

export default function NewsCard({
  category,
  title,
  count,
  image,
  summary,
  sources,
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        minWidth: "280px",
        maxWidth: "340px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* 카테고리 뱃지 */}
      <div
        style={{
          fontSize: "0.7rem",
          color: "#555",
          background: "#eee",
          display: "inline-block",
          padding: "0.3rem 0.6rem",
          borderRadius: "999px",
          margin: "1rem",
          width: "10%",
          textAlign: "center",
        }}
      >
        {category}
      </div>

      {/* 제목 + 건수 */}
      <div
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* 제목 */}
        <h4
          style={{
            margin: "0.25rem 0 0 0",
            fontSize: "1rem",
            fontWeight: "bold",
            lineHeight: "1.4",
            margin: "1rem",
          }}
        >
          {title}
        </h4>

        {/* 건수 - 오른쪽 정렬 */}
        <div
          style={{
            textAlign: "right",
            color: "#007bff",
            fontWeight: "bold",
            fontSize: "0.85rem",
            margin: "1rem",
          }}
        >
          {count}건
        </div>
      </div>

      {/* 이미지 */}
      <img
        src={image}
        alt="뉴스 이미지"
        style={{
          width: "100%",
          height: "140px",
          objectFit: "cover",
          borderRadius: "8px",
          margin: "0.5rem 0",
        }}
      />

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {summary?.slice(0, 5).map((item, i) => (
          <li key={i} style={{ marginBottom: "0.75rem" }}>
            <div style={{ fontSize: "0.85rem", color: "#333" }}>{item}</div>
            <div
              style={{ fontSize: "10pt", color: "#000", fontWeight: "bold" }}
            >
              {sources?.[i] ?? ""}
            </div>
          </li>
        ))}
      </ul>

      {/* 버튼 2개 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #eee",
          marginTop: "1rem",
        }}
      >
        <button style={{ ...btnStyle, borderRadius: "0 0 0 10px" }}>
          전체 뉴스보기
        </button>
        <button style={{ ...btnStyle, borderRadius: "0 0 10px 0" }}>
          관련도 분석
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  background: "#fff",
  border: "1px solid #ddd",
  borderTop: "none",
  fontSize: "0.8rem",
  padding: "0.7rem 0",
  width: "50%",
  cursor: "pointer",
};
