"use client";

import { FaSpinner } from "react-icons/fa";

export function ButtonLoader({ className = "" }: { className?: string }) {
  return <FaSpinner className={`animate-spin h-4 w-4 ${className}`} />;
}