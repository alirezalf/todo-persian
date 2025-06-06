// src/components/TodoApp/TodoItem.jsx
import { useState } from "react";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";
import CheckIcon from "./icons/CheckIcon";
// import { format } from "date-fns";
import { format } from "date-fns-jalali";


// کامپوننت آیتم هر کار در لیست Todo
export default function TodoItem({ todo, onDelete, onToggle, onUpdate }) {
  // حالت‌های کامپوننت
  const [isEditing, setIsEditing] = useState(false); // وضعیت ویرایش
  const [editValue, setEditValue] = useState(todo.title); // مقدار ویرایش شده

  // تابع فرمت‌دهی تاریخ
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "dd-MM-yyyy HH:mm"); // تبدیل به فرمت قابل خواندن
    } catch {
      return ""; // در صورت خطا رشته خالی برگردانده می‌شود
    }
  };

  // توابع مدیریت ویرایش
  const handleEditClick = () => setIsEditing(true); // فعال کردن حالت ویرایش
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditValue(todo.title); // بازگرداندن مقدار اولیه
  };

  const handleSaveEdit = () => {
    if (editValue.trim() !== "") {
      onUpdate(todo.id, editValue); // ذخیره تغییرات
      setIsEditing(false);
    }
  };

  // مدیریت کلیدهای صفحه کلید
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSaveEdit(); // ذخیره با Enter
    else if (e.key === "Escape") handleCancelEdit(); // انصراف با Escape
  };

  // بررسی اینکه کار از موعد مقرر گذشته است یا نه
  const isOverdue = (todo) => {
    if (todo.completed || !todo.dueDate) return false; // اگر تکمیل شده یا تاریخ نداشته باشد
    return new Date(todo.dueDate) < new Date(); // مقایسه با تاریخ فعلی
  };

  // ساختار ظاهری کامپوننت
  return (
    <li className="relative flex items-start justify-between px-2 py-4 border-b">
      <div className="flex flex-col w-full">
        <div className="flex items-center">
          {!isEditing ? (
            // حالت نمایش عادی
            <>
              <button
                onClick={() => onToggle(todo.id)}
                className="mr-2 text-gray-400 hover:text-green-500"
              >
                <CheckIcon completed={todo.completed} />
              </button>
              <div className="flex flex-col">
                <p
                  className={`inline-block text-gray-600 ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {todo.title}
                </p>
                <div className="text-xs text-gray-400 mt-1">
                  <span>ایجاد: {formatDate(todo.createdAt)}</span>
                  {todo.dueDate && (
                    <span
                      className={`ml-2 ${
                        isOverdue(todo) ? "text-red-500" : ""
                      }`}
                    >
                      <br/>
                      سررسید: {formatDate(todo.dueDate)}
                    </span>
                  )}
                  {todo.completed && (
                    
                    <span className="ml-2">
                      <br/>
                      تکمیل: {formatDate(todo.completedAt)}
                    </span>
                  )}
                </div>
              </div>
            </>
          ) : (
            // حالت ویرایش
            <div className="flex flex-col w-full">
              <div className="flex items-center w-full">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="w-full px-2 py-1 border rounded outline-none border-grey-600"
                />
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-2 py-1 ml-2 text-green-600"
                >
                  ✓
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-2 py-1 ml-1 text-red-600"
                >
                  ✕
                </button>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Created: {formatDate(todo.createdAt)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* دکمه‌های ویرایش و حذف */}
      {!isEditing && (
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={handleEditClick}
            className="text-blue-600 hover:text-blue-800"
          >
            <EditIcon />
          </button>
          <button
            type="button"
            onClick={() => onDelete(todo.id)}
            className="text-red-600 hover:text-red-800"
          >
            <DeleteIcon />
          </button>
        </div>
      )}
    </li>
  );
}