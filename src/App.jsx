import React, { useState } from "react"; // นำเข้า React และ useState Hook
import axios from "axios"; // นำเข้า Axios สำหรับการ Fetch Data
import "./App.css"; // นำเข้าไฟล์ CSS

function App() {
  // State สำหรับเก็บข้อความจาก Input
  const [query, setQuery] = useState("");
  // State สำหรับเก็บผลลัพธ์การค้นหาหนังสือ
  const [books, setBooks] = useState([]);

  // ฟังก์ชันจัดการเมื่อผู้ใช้งานพิมพ์ข้อความใน Input
  function handleInputChange(event) {
    setQuery(event.target.value); // อัปเดตข้อความจาก Input ลงใน State
  }

  // ฟังก์ชันค้นหาข้อมูลหนังสือเมื่อผู้ใช้งานกด Enter
  async function fetchBooks() {
    try {
      // ส่ง Request ไปยัง Server Google Books API พร้อมกับ Parameter query
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );

      // ตรวจสอบว่ามีผลลัพธ์หรือไม่
      if (response.data.items) {
        // อัปเดต State books ด้วยข้อมูลจาก API
        setBooks(response.data.items);
      } else {
        setBooks([]); // ถ้าไม่มีข้อมูล ให้เคลียร์ผลลัพธ์
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]); // กรณีเกิดข้อผิดพลาด เคลียร์ผลลัพธ์
    }
  }

  // ฟังก์ชันจัดการการกดปุ่ม Enter ใน Input
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      fetchBooks(); // เรียกใช้ฟังก์ชัน fetchBooks เมื่อกด Enter
    }
  }

  return (
    <div className="App">
      <h1>Find a Book</h1>
      {/* กล่อง Input สำหรับค้นหาข้อความ */}
      <input
        type="text"
        placeholder="Search for a book"
        value={query} // ใช้ State เป็นค่าของ Input
        onChange={handleInputChange} // เมื่อผู้ใช้งานพิมพ์ จะอัปเดต State
        onKeyPress={handleKeyPress} // เมื่อกด Enter จะทำการค้นหา
      />

      {/* แสดงผลลัพธ์การค้นหา */}
      <ul>
        {books.map((book) => {
          return (
            <li key={book.id}>
              {book.volumeInfo.title || "No Title Available"}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
