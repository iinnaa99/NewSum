export default function NewsModal({
  title,
  link,
  press,
  upload_date,
  onClose,
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translate(-50%, -20%)",
        backgroundColor: "white",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        zIndex: 1000,
        maxWidth: "600px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
      }}
    >
      <h2>{title}</h2>
      <p>언론사: {press}</p>
      <p>날짜: {upload_date}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        본문 보기
      </a>
      <button onClick={onClose} style={{ marginTop: "1rem" }}>
        닫기
      </button>
    </div>
  );
}
