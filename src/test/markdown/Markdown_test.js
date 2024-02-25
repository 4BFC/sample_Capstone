import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

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
        setData(shuffledData.slice(0, limit)); // limit에 맞게 잘라서 사용
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [limit]);

  const markdown = `
  # Heading 1

  This is a **bold** text and this is a *italic* text.
  <img src="https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004" width="10" height="10" alt="img">

  <div>
    This is an HTML <span style="color: red;">element</span>.
  </div>
`;

  return (
    <div>
      <div>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
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
          // <li key={item.id}><p>{item.question}</p>{item.options}</li>
          <li key={item.id}>
            <ReactMarkdown>
              {`### ${item.question}\n\n${item.options}`}
            </ReactMarkdown>
          </li>
        ))}
      </ol>
    </div >
  );
}
