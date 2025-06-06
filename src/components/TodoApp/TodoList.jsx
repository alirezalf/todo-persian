// src/components/TodoApp/TodoList.jsx
import TodoItem from "./TodoItem";

/**
 * کامپوننت TodoList - نمایش لیست کارها
 * 
 * این کامپوننت مسئول نمایش لیستی از کارها (todos) است و به عنوان 
 * پدر کامپوننت TodoItem عمل می‌کند.
 * 
 * @param {Object} props - ویژگی‌های کامپوننت
 * @param {Array} props.todos - آرایه‌ای از اشیاء کارها
 * @param {Function} props.onDelete - تابع حذف یک کار
 * @param {Function} props.onToggle - تابع تغییر وضعیت انجام/انجام نشده
 * @param {Function} props.onUpdate - تابع به‌روزرسانی عنوان کار
 * @returns {JSX.Element} - لیست رندر شده از کارها
 */
export default function TodoList({ todos, onDelete, onToggle, onUpdate }) {
  return (
    // لیست اصلی با قابلیت اسکرول عمودی
    <ul className="list-reset max-h-[400px] overflow-y-auto">
      {/* نمایش هر کار به صورت جداگانه با استفاده از کامپوننت TodoItem */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id} // شناسه منحصر به فرد برای بهینه‌سازی رندر
          todo={todo} // اطلاعات کار
          onDelete={onDelete} // تابع حذف
          onToggle={onToggle} // تابع تغییر وضعیت
          onUpdate={onUpdate} // تابع ویرایش
        />
      ))}
    </ul>
  );
}