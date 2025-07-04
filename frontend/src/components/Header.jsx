import React from "react";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header style={{ position: "relative", background: "white" }}>
      {/* 가운데 로고 */}
      <div style={{ textAlign: "center" }}>
        <img
          src={logo}
          alt="NewSum 로고"
          style={{
            height: "200px",
            verticalAlign: "middle",
          }}
        />
      </div>

      {/* 오른쪽 상단 버튼 */}
      <button
        style={{
          position: "absolute",
          top: "20px",
          right: "30px",
          background: "limegreen",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        구독 신청
      </button>
    </header>
  );
}
