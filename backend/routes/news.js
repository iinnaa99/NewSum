// backend/routes/news.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// 📌 GET /api/news - 최신 뉴스 전체 조회
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        n.id AS id,
        n.title,
        n.photo_link,
        p.press_name,
        c.category_name
      FROM news n
      JOIN press p ON n.press_id = p.press_id
      JOIN category c ON n.category_id = c.category_id
      ORDER BY n.upload_date DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ 뉴스 목록 가져오기 실패:", error);
    res.status(500).json({ error: "뉴스를 불러오는 중 오류 발생" });
  }
});

// 📌 GET /api/news/top10 - 조회수 기준 Top 10 뉴스
router.get("/top10", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        n.id AS id,           -- ✅ 기존: n.news_id
        n.title,
        p.press_name,
        c.category_name
      FROM news n
      JOIN press p ON n.press_id = p.press_id
      JOIN category c ON n.category_id = c.category_id
      ORDER BY n.upload_date DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ Top 10 뉴스 조회 실패:", error);
    res.status(500).json({ error: "Top 뉴스 조회 중 오류 발생" });
  }
});

export default router;
