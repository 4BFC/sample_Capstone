import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function LabExam() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetch('http://localhost:3001/sample')
      .then(res => res.json())
      .then((data) => {
        // 데이터를 가져온 후, 제한된 개수만큼 자르고 섞음
        const limitedData = data.slice(0, limit);
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

  // 문제를 섞는 함수를 호출하는 버튼 클릭 핸들러
  const handleShuffle = () => {
    const shuffledData = shuffleArray(data);
    setData([...shuffledData]); // 새로운 배열로 설정하여 React가 업데이트를 감지할 수 있게 함
  };

  return (
    <div>
      <h2>Test</h2>
      <button onClick={handleShuffle}>Shuffle</button> {/* 문제 섞기 버튼 */}
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
