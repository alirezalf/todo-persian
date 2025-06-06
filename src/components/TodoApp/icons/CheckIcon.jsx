// src/components/TodoApp/icons/CheckIcon.jsx
export default function CheckIcon({ completed, size = "5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-${size} h-${size} ${
        completed ? "text-green-500" : "text-gray-400"
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}