const dummyTopNews = [
  { title: "특검, 윤석열 전 대통령에 체포영장 청구…법원 기각", count: 48 },
  { title: "아이오닉5N, 2025 오토카 어워즈 파이널리스트 선정", count: 45 },
  { title: "트럼프 “이란 핵시설 재건 땐 다시 공격할 것”", count: 44 },
  { title: "이재명 대통령, 6·25전쟁 75주년 맞아 “평화·안보 강조”", count: 38 },
  { title: "윤석열 전 대통령 출국금지 조치도 이야기", count: 32 },
  { title: "SK 최태원 회장 차녀 남편, 중동 파병에 이란 공습 참여", count: 32 },
  { title: "송미령 농식품부 장관, '농망법' 표현 사과", count: 31 },
  { title: "음성군, 기업 현장 목소리 청취 및 지원 계획 수립", count: 28 },
  {
    title: "삼송 폭행·학대한 장애인 재활원 원생·직원에 구속영장 등 20명 입건",
    count: 27,
  },
  { title: "폭염 선제 대응 매뉴얼…작업장 온열질환 예방 강화", count: 26 },
];

export default function TopNewsBar() {
  const leftNews = dummyTopNews.slice(0, 5);
  const rightNews = dummyTopNews.slice(5, 10);

  return (
    <div style={{ width: "100%" }}>
      {/* 날짜 */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem",
          color: "#444",
          fontWeight: "bold",
          fontSize: "15pt",
        }}
      >
        2025년 6월 30일 (월) 11:00 기준
      </div>

      {/* 뉴스 목록 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          background: "#0a0a1a",
          color: "#fff",
          padding: "1.5rem",
          borderRadius: "1rem",
        }}
      >
        {/* 왼쪽 열 */}
        <ol style={{ listStyle: "none", padding: 0, margin: 0, width: "45%" }}>
          {leftNews.map((news, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem 1rem",
                marginBottom: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  maxWidth: "80%",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <strong style={{ marginRight: "0.75rem", color: "#ccc" }}>
                  {i + 1}
                </strong>
                {news.title}
              </span>
              <span style={{ color: "#aaa", whiteSpace: "nowrap" }}>
                {news.count}건
              </span>
            </li>
          ))}
        </ol>

        {/* 오른쪽 열 */}
        <ol style={{ listStyle: "none", padding: 0, margin: 0, width: "45%" }}>
          {rightNews.map((news, i) => (
            <li
              key={i + 5}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem 1rem",
                marginBottom: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  maxWidth: "80%",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <strong style={{ marginRight: "0.75rem", color: "#ccc" }}>
                  {i + 6}
                </strong>
                {news.title}
              </span>
              <span style={{ color: "#aaa", whiteSpace: "nowrap" }}>
                {news.count}건
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
