import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", // 실제 비밀번호로 바꿔주세요
  database: "news_db",
});

export default db;
