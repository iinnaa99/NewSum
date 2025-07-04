import React from "react";
import Header from "../components/Header";
import TopNewsBar from "../components/TopNewsBar";
import TopicNews from "../components/TopicNews";

import PressNews from "../components/PressNews";

export default function Home() {
  return (
    <div style={{ width: "100%", height: "100%", boxSizing: "border-box" }}>
      <Header />
      <TopNewsBar />
      <TopicNews />

      <PressNews />
    </div>
  );
}
