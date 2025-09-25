import React from "react";

export default function OrderInput({ref, label, type, placeholder}) {
  return (
    <div>
      <label htmlFor="">{label}</label>
      <input
      ref={ref}
        type={type}
        placeholder={placeholder}
        className="w-full border p-3 rounded-md"
      />
    </div>
  );
}
