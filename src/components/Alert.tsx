import React from "react";
import type { AlertType } from "@/lib/types";

const Alert: React.FC<AlertType> = ({ message, type = "info" }) => {
  const isVisible = message.length > 0;

  // Define colors based on the type prop
  const colorClasses = {
    success: "bg-emerald-500 text-white",
    error: "bg-rose-500 text-white",
    info: "bg-sky-500 text-white",
  };

  return (
    <div
      className={`
        overflow-hidden transition-all duration-500 ease-in-out
        
        ${
          isVisible
            ? "max-h-40 opacity-100 mb-4 py-3 px-4 translate-y-0"
            : "max-h-0 opacity-0 mb-0 py-0 px-4 -translate-y-2"
        }
        
        rounded-lg shadow-md font-medium
        ${colorClasses[type]}
      `}
      role="alert"
    >
      <div className="flex items-center">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Alert;
