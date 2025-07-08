import React from "react";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header
      style={{ background: "white", padding: "1rem 2rem", width: "100%" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center", // 로고 가운데
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* 가운데 로고 */}
        <img
          src={logo}
          alt="NewSum 로고"
          style={{
            height: "250px",
            verticalAlign: "middle",
          }}
        />

        {/* 오른쪽 상단 버튼 */}
        <button
          style={{
            position: "absolute",
            top: "0",
            right: "0",
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
      </div>
    </header>
  );
}
