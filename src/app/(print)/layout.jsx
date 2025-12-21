export default function PrintLayout({ children }) {
  return (
    <div
      style={{
        margin: 0,
        background: "#e5e7eb",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      {children}
    </div>
  );
}
