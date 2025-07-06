import React from "react";
import PressNewsCard from "./PressNewsCard";

export default function PressGroupCard({ pressName, articles }) {
  return (
    <div
      style={{
        border: "2px solid #ccc",
        borderRadius: "12px",
        padding: "1rem",
        marginBottom: "2rem",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h3
        style={{
          marginBottom: "1rem",
          fontSize: "1.25rem",
          color: "#222",
          borderBottom: "1px solid #ddd",
          paddingBottom: "0.5rem",
        }}
      >
        {pressName}
      </h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {articles.slice(0, 3).map((article) => (
          <PressNewsCard
            key={pressName}
            press={pressName}
            image={articles[0]?.photo_link}
            count={articles.length}
            titles={articles.map((a) => ({
              title: a.title,
              press: a.press?.press_name || "기타 언론사",
            }))}
          />
        ))}
      </div>
    </div>
  );
}
