import { C } from "../../styles/theme";

export default function Toggle({ enabled, onChange }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: enabled ? C.green : "#cbd5e1",
        cursor: "pointer",
        position: "relative",
        transition: "background .2s",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          left: enabled ? 22 : 3,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          transition: "left .2s",
          boxShadow: "0 1px 4px rgba(0,0,0,.2)",
        }}
      />
    </div>
  );
}
