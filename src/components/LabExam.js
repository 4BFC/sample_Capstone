import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// shuffleArray(Fisher-Yates) 알고리즘을 사용하여 배열을 섞는 함수
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function LabExam() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetch('http://localhost:3001/sample')
      .then(res => res.json())
      .then((data) => {
        setData(data.slice(0, limit)); // slice를 통해서 10개의 아이템만 가져올 것 -> useEffect의 특징상 한번 호출하고 다시 re-render가 되지 않는다. 따라서 useEffect를 limit에 의존 시켜야한다.
        // map((data)=>{cons})
        console.log(data); //data 배열 값 확인
        console.log(data[0]); //data 배열 값 확인
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [limit]);

  // 문제를 섞는 함수를 호출하는 버튼 클릭 핸들러
  const handleShuffle = () => {
    const shuffledData = shuffleArray(data);
    setData([...shuffledData]); // 새로운 배열로 설정하여 React가 업데이트를 감지할 수 있게 함
  };

  return (
    <div>
      <h2>Test</h2>
      {/* 문제 섞기 버튼 */}
      <button onClick={handleShuffle}>Shuffle</button>
      <select onChange={(e) => { setLimit(e.target.value); }}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
      <Link to="/">back</Link>
      <ol>
        {data.map((data) => (
          <li key={data.id}><p>{data.question}</p>{data.options}</li>
        ))}
      </ol>
    </div >
  );
}
