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
        const shuffledData = shuffleArray(data); // 데이터 배열을 랜덤하게 섞음

        // 옵션 문자열에서 '①, ②, ③, ④'를 '■'으로 변경
        const modifiedData = shuffledData.map(item => ({
          ...item,
          options: item.options.map(option => option.replace(/[①②③④]/g, '■'))
        }));

        setData(modifiedData.slice(0, limit)); // limit에 맞게 잘라서 사용
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
        {/* 간이로 이미지를 삽입하고 className을 작성 및 문제들의 css를 적용해본 테스트 */}
        {data.map((item) => (
          <li key={item.id}>
            <h1>test</h1>
            {/* 이미지 */}
            <img src="https://png.pngtree.com/thumb_back/fh260/background/20230609/pngtree-three-puppies-with-their-mouths-open-are-posing-for-a-photo-image_2902292.jpg" className="test_image" style={{ width: "250px" }} />
            {/* 질문 */}
            <p>{item.question}</p>
            {/* 4선지 */}
            {item.options}
          </li>

        ))}
      </ol>
    </div >
  );
}
