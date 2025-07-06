import express from "express";
import cors from "cors";
import newsRouter from "./routes/news.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ 이 부분 꼭 필요!
app.use("/api/news", newsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
