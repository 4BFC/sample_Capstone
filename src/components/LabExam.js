import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function LabExam() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetch('http://localhost:3001/sample')
      .then(res => res.json())
      .then((fetchedData) => {
        // 데이터를 가져온 후, 제한된 개수만큼 자르고 섞음
        const limitedData = fetchedData.slice(0, limit);
        const shuffledData = shuffleArray(limitedData);
        setData(shuffledData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [limit]);

  // Fisher-Yates 알고리즘을 사용하여 배열을 랜덤하게 섞는 함수
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <div>
      <h2>Test</h2>
      <select onChange={(e) => { setLimit(parseInt(e.target.value)); }}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
      <Link to="/">back</Link>
      <ol>
        {data.map((item) => (
          <li key={item.id}><p>{item.question}</p>{item.options}</li>
        ))}
      </ol>
    </div>
  );
}
