import { C, F, R } from "../../styles/theme";

export default function Card({ children, style = {}, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: C.white,
        borderRadius: R.lg,
        padding: 24,
        border: `1px solid ${C.gray}`,
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
