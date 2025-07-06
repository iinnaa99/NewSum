import React from "react";
import Header from "../components/Header";
import TopNewsBar from "../components/TopNewsBar";
import TopicNews from "../components/TopicNews";
import PressNews from "../components/PressNews";

export default function Home() {
  return (
    <div style={{ height: "100%", boxSizing: "border-box" }}>
      <Header />
      <TopNewsBar />

      {/* 가로로 배치 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "2rem",
          padding: "1rem 2rem",
        }}
      >
        {/* 왼쪽: 주제별 */}
        <div style={{ flex: "1 1 48%", minWidth: "350px" }}>
          <TopicNews />
        </div>

        {/* 오른쪽: 언론사별 */}
        <div style={{ flex: "1 1 48%", minWidth: "350px" }}>
          {/* <PressNews /> */}
        </div>
      </div>
    </div>
  );
}
