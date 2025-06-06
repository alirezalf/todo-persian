// src/components/TodoApp/TodoInput.jsx
import { useState } from "react";
import CheckIcon from "./icons/CheckIcon";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

// کامپوننت ورودی برای افزودن کار جدید
export default function TodoInput({ onAddTodo }) {
  // حالت‌های کامپوننت
  const [inputValue, setInputValue] = useState(""); // مقدار ورودی عنوان کار
  const [dueDate, setDueDate] = useState(""); // مقدار ورودی تاریخ سررسید

  // تابع برای افزودن کار جدید به لیست
  const handleAddTodo = () => {
    // بررسی اینکه عنوان کار خالی نباشد
    if (inputValue.trim() !== "") {
      onAddTodo(inputValue, dueDate); // فراخوانی تابع والد برای افزودن کار
      setInputValue(""); // ریست کردن فیلد عنوان
      setDueDate(""); // ریست کردن فیلد تاریخ
    }
  };

  // تابع برای تشخیص کلید Enter هنگام تایپ
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  // ساختار ظاهری کامپوننت
  return (
    <div className="space-y-3">
      {/* بخش ورودی عنوان کار */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="امروز چه کارهایی باید برنامه شود؟"
          className="w-full px-2 py-3 border rounded outline-none border-grey-600 pr-10"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // آپدیت مقدار عنوان هنگام تایپ
          onKeyDown={handleKeyDown} // تشخیص فشار دادن کلید
        />
        {/* دکمه تایید/افزودن */}
        <button
          onClick={handleAddTodo}
          disabled={!inputValue.trim()} // غیرفعال کردن دکمه اگر عنوان خالی باشد
          className={`absolute right-2 p-1 rounded-full ${
            inputValue.trim()
              ? "text-green-500 hover:text-green-700 cursor-pointer"
              : "text-gray-300 cursor-not-allowed"
          }`}
        >
          <CheckIcon completed={false} /> {/* آیکون تیک */}
        </button>
      </div>

      {/* بخش انتخاب تاریخ سررسید */}
      <div className="flex items-center ">
        <label className="mr-2 text-sm text-gray-600">تاریخ سررسید:</label>
        <DatePicker
          value={dueDate}
          onChange={setDueDate}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          format="YYYY/MM/DD HH:mm"
          plugins={[<TimePicker position="bottom" />]}
          portal
          style={{ zIndex: 9999 }}
          className="border rounded px-2 py-1 w-full"
        />
      </div>
    </div>
  );
}
