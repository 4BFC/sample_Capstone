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

  //HTML 문자열에 포함된 <img> 태그를 실제 이미지로 변경하는 함수
  const parseImageTag = (question_img, question_img_url, question_img_class) => {
    // 정규식을 사용하여 <img src=1> 문자열을 찾는다.
    const imgRegex = /<img.*?\/?>/g;
    // 대체할 이미지 태그로 교체한다.
    return question_img.replace(imgRegex, `<img src="${question_img_url}" className="${question_img_class}" />`);
  };

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
        {data.map((item, index) => (
          <li key={index}>
            {/* 질문 */}
            <p dangerouslySetInnerHTML={{ __html: parseImageTag(item.question, item.image, "test_image") }} />
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
