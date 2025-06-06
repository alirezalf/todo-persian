import { useState, useEffect } from "react";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import { Icon } from "@iconify/react";

export default function FloatingTodoButton({
  todos,
  onDelete,
  onToggle,
  onUpdate,
  onAddTodo,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("list");

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const incompleteCount = todos.filter((todo) => !todo.completed).length;

  // ایجاد کلاس انیمیشن اگر آیتم انجام‌نشده وجود داشته باشد
  // const iconClass = incompleteCount > 0 ? "animate-bounce" : "";
  const iconClass = incompleteCount > 0 ? "animate-heartbeat" : "";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* پاپ‌آپ لیست Todo */}
      {isVisible && (
        <div className="absolute bottom-14 right-0 w-80 bg-info rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          {/* هدر با تب‌ها */}
          <div className="flex border-b border-gray-200 bg-purple-600 text-white">
            <button
              className={`flex-1 py-2 font-medium ${
                activeTab === "list"
                  ? "bg-purple-700 text-white"
                  : "text-white opacity-80 hover:opacity-100"
              }`}
              onClick={() => setActiveTab("list")}
            >
              لیست کارها
            </button>
            <button
              className={`flex-1 py-2 font-medium ${
                activeTab === "add"
                  ? "bg-purple-700 text-white"
                  : "text-white opacity-80 hover:opacity-100"
              }`}
              onClick={() => setActiveTab("add")}
            >
              افزودن کار
            </button>
          </div>

          {/* محتوای تب‌ها */}
          <div className="max-h-96 overflow-y-auto">
            {activeTab === "list" ? (
              <TodoList
                todos={todos}
                onDelete={onDelete}
                onToggle={onToggle}
                onUpdate={onUpdate}
              />
            ) : (
              <div className="p-4">
                <TodoInput
                  onAddTodo={(title, dueDate) => {
                    onAddTodo(title, dueDate);
                    setActiveTab("list");
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* دکمه شناور با Badge */}
      <div className="relative">
        {incompleteCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-lg z-10">
            {incompleteCount}
          </span>
        )}

        <button
          onClick={toggleVisibility}
          className="w-14 h-14 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-all duration-300 relative"
        >
          <Icon
            icon={isVisible ? "mdi:close" : "mdi:check-circle-outline"}
            className={`w-8 h-8 ${iconClass}`}
          />
        </button>
      </div>
    </div>
  );
}
