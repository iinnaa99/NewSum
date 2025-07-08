import express from "express";
import cors from "cors";
import newsRouter from "./routes/news.js";
import subscribeRouter from "./routes/subscribe.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/news", newsRouter);
app.use("/api/subscribe", subscribeRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
