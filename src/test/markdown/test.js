import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function LabExam() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetch('http://localhost:3001/sample')
      .then(res => res.json())
      .then((data) => {
        setData(data.slice(0, limit)); // limit에 맞게 잘라서 사용
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [limit]);

  return (
    <div>
      <h2>Test</h2>
      <select onChange={(e) => { setLimit(e.target.value); }}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
      <Link to="/">back</Link>
      <ol>
        {data.map((item) => (
          <li key={item.id}>
            <h1>test</h1>
            {/* 이미지 */}
            <img src="https://png.pngtree.com/thumb_back/fh260/background/20230609/pngtree-three-puppies-with-their-mouths-open-are-posing-for-a-photo-image_2902292.jpg" className="test_image" style={{ width: "250px" }} />
            {/* 질문 */}
            <p>{item.question}</p>
            {/* 4선지 */}
            {item.options.map((option, index) => (
              <div key={index}>{option}</div>
            ))}
          </li>
        ))}
      </ol>
    </div>
  );
}
