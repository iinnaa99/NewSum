// backend/routes/news.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// 📌 GET /api/news/top10 - top10 뉴스
router.get("/top10", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        t.topic_id,
        t.topic_title,
        t.topic_content,
        t.keyword,
        t.new_cnt,
        n.title AS news_title,
        n.link AS news_link,
        p.press_name,
        n.upload_date,
        n.photo_link
      FROM (
        SELECT *
        FROM topics
        ORDER BY new_cnt DESC
        LIMIT 10
      ) t
      JOIN news n ON t.topic_id = n.topic_id
      JOIN press p ON n.press_id = p.press_id
      ORDER BY t.new_cnt DESC, n.upload_date DESC;
    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ Top 10 뉴스 조회 실패:", error);
    res.status(500).json({ error: "Top 뉴스 조회 중 오류 발생" });
  }
});

// 📌 GET /api/news/topic - 주제별 뉴스
router.get("/topic", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
          t.topic_id,
          t.topic_title,
          t.topic_content,
          t.keyword,
          t.new_cnt,
          n.title AS news_title,
          n.link AS news_link,
          p.press_name,
          n.upload_date,
          n.photo_link,
          c.category_name
      FROM topics t
      JOIN news n ON t.topic_id = n.topic_id
      JOIN press p ON n.press_id = p.press_id
      JOIN category c ON n.category_id = c.category_id
      ORDER BY t.new_cnt DESC, n.upload_date DESC;
    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ 주제별 뉴스 조회 실패:", error);
    res.status(500).json({ error: "주제별 뉴스 조회 중 오류 발생" });
  }
});

// 📌 GET /api/news/press - 언론사별 뉴스
router.get("/press", async (req, res) => {
  try {
    const [rows] = await db.query(`
    SELECT 
        p.press_name,
        n.title,
        n.link,
        n.upload_date,
        n.photo_link,
        p.press_id
    FROM news n
    JOIN press p ON n.press_id = p.press_id
    ORDER BY p.press_id, n.upload_date DESC;
    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ 언론사별 뉴스 조회 실패:", error);
    res.status(500).json({ error: "언론사별 뉴스 조회 중 오류 발생" });
  }
});

export default router;
