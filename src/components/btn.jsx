// components/Button.jsx
function Button({ type = "button", children, onClick, className = "" }) {
    console.log("📌 Button Props:");
  console.log("👉 type:", type);
  console.log("👉 onClick:", onClick);
  return (
    <button
      type={type}
    
      onClick={onClick}
      className={`w-25 rounded-lg font-normal text-lg py-1 px-1 transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
