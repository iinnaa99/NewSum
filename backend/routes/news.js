// backend/routes/news.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// // 📌 GET /api/news - 최신 뉴스 전체 조회
// router.get("/", async (req, res) => {
//   try {
//     const [rows] = await db.query(`
//       SELECT
//         n.id AS id,
//         n.title,
//         n.photo_link,
//         p.press_name,
//         c.category_name
//       FROM news n
//       JOIN press p ON n.press_id = p.press_id
//       JOIN category c ON n.category_id = c.category_id
//       ORDER BY n.upload_date DESC
//     `);
//     res.json(rows);
//   } catch (error) {
//     console.error("❌ 뉴스 목록 가져오기 실패:", error);
//     res.status(500).json({ error: "뉴스를 불러오는 중 오류 발생" });
//   }
// });

// // 📌 GET /api/news/top10 - 조회수 기준 Top 10 뉴스
// router.get("/top10", async (req, res) => {
//   try {
//     const [rows] = await db.query(`
//       SELECT
//         n.id AS id,           -- ✅ 기존: n.news_id
//         n.title,
//         p.press_name,
//         c.category_name
//       FROM news n
//       JOIN press p ON n.press_id = p.press_id
//       JOIN category c ON n.category_id = c.category_id
//       ORDER BY n.upload_date DESC
//       LIMIT 10
//     `);
//     res.json(rows);
//   } catch (error) {
//     console.error("❌ Top 10 뉴스 조회 실패:", error);
//     res.status(500).json({ error: "Top 뉴스 조회 중 오류 발생" });
//   }
// });

// // 📌 GET /api/news/press - 언론사별 뉴스
// router.get("/press", async (req, res) => {
//   try {
//     const [rows] = await db.query(`
//       SELECT
//         p.press_name,
//         n.id AS news_id,
//         n.title,
//         n.photo_link,
//         n.upload_date
//       FROM news n
//       JOIN press p ON n.press_id = p.press_id
//       ORDER BY p.press_name ASC, n.upload_date DESC;
//     `);
//     res.json(rows);
//   } catch (error) {
//     console.error("❌ Top 10 뉴스 조회 실패:", error);
//     res.status(500).json({ error: "Top 뉴스 조회 중 오류 발생" });
//   }
// });

// 📌 GET /api/news/top10 - top10 뉴스
router.get("/top10", async (req, res) => {
  try {
    const [rows] = await db.query(`
SELECT 
    t.topic_id,
    t.topic_title,
    t.new_cnt,
    t.topic_content,
    t.keyword,
    n.title AS news_title,
    n.link AS news_link,
    p.press_name,
    n.upload_date
FROM (
    SELECT *
    FROM topics
    ORDER BY new_cnt DESC
    LIMIT 10
) AS t
LEFT JOIN (
    SELECT *
    FROM (
        SELECT *,
               ROW_NUMBER() OVER (PARTITION BY topic_id ORDER BY upload_date DESC) AS rn
        FROM news
    ) AS ranked
    WHERE rn <= 2
) AS n ON t.topic_id = n.topic_id
LEFT JOIN press p ON n.press_id = p.press_id
ORDER BY t.new_cnt DESC, n.upload_date DESC;

    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ Top 10 뉴스 조회 실패:", error);
    res.status(500).json({ error: "Top 뉴스 조회 중 오류 발생" });
  }
});

// 📌 GET /api/news/topic - 주제별 뉴스
router.get("topic", async (req, res) => {
  try {
    const [rows] = await db.query(`
SELECT 
    t.topic_title,
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
    COUNT(n.id) AS news_count,
    GROUP_CONCAT(n.title SEPARATOR '\n') AS news_titles,
    GROUP_CONCAT(n.link SEPARATOR '\n') AS news_links
FROM press p
JOIN news n ON p.press_id = n.press_id
GROUP BY p.press_id, p.press_name
ORDER BY news_count DESC;

    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ 언론사별 뉴스 조회 실패:", error);
    res.status(500).json({ error: "언론사별 뉴스 조회 중 오류 발생" });
  }
});

export default router;
