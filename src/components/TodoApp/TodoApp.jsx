// src/components/TodoApp/TodoApp.jsx
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import useLocalStorage from "../../hooks/useLocalStorage";
import FloatingTodoButton from "./FloatingTodoButton";

// کامپوننت اصلی برنامه مدیریت کارها (Todo App)
export default function TodoApp() {
  // استفاده از هوک useLocalStorage برای ذخیره و بازیابی لیست کارها
  const [todos, setTodos] = useLocalStorage("todos", []);

  // تابع برای افزودن کار جدید به لیست
  const addTodo = (title, dueDate) => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
        dueDate: dueDate || null,
      },
    ]);
  };

  // تابع برای حذف یک کار از لیست
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // تابع برای تغییر وضعیت انجام/انجام نشده یک کار
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: todo.completed ? null : new Date().toISOString(),
            }
          : todo
      )
    );
  };

  // تابع برای به‌روزرسانی عنوان یک کار
  const updateTodo = (id, newTitle) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  // ساختار ظاهری کامپوننت
  // فقط این خط return را تغییر دهید:
  return (
    <FloatingTodoButton
      todos={todos}
      onDelete={deleteTodo}
      onToggle={toggleTodo}
      onUpdate={updateTodo}
      onAddTodo={addTodo}
    />
  );
}
