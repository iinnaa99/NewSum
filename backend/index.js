import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import newsRouter from "./routes/news.js";
import subscribeRouter from "./routes/subscribe.js";

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS 및 JSON 파싱
app.use(cors());
app.use(express.json());

// ✅ API 라우터 등록
app.use("/api/news", newsRouter);
app.use("/api/subscribe", subscribeRouter);

// ✅ 프론트엔드 정적 파일 서빙
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// ✅ 나머지 경로는 모두 프론트엔드 index.html 반환 (SPA 대응)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
