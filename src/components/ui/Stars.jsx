export default function Stars({ note, size = 14 }) {
  return (
    <span style={{ fontSize: size }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= note ? "#f59f00" : "#dee2e6" }}>
          ★
        </span>
      ))}
    </span>
  );
}
