import React from "react";

export default function OrderInput({label, type, placeholder}) {
  return (
    <div>
      <label htmlFor="">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border p-3 rounded-md"
      />
    </div>
  );
}
