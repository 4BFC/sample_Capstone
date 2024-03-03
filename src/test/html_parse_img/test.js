import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';

export default function LabExam() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetch('http://localhost:3001/sample')
      .then(res => res.json())
      .then((data) => {
        setData(data.slice(0, limit));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [limit]);

  const parseImageTag = (question, questionImgUrls) => {
    let parsedQuestion = question;

    // 이미지 URL 배열이 정의되었는지 확인합니다.
    if (Array.isArray(questionImgUrls) && questionImgUrls.length > 0) {
      // 이미지 URL 배열의 각 요소를 반복하여 이미지 태그를 생성하고 질문에 삽입합니다.
      questionImgUrls.forEach((imageUrl, index) => {
        // 이미지 태그를 생성합니다. index + 1을 사용하여 이미지 태그의 src 속성에 대응하는 번호를 삽입합니다.
        const imgTag = `<img src="${imageUrl}"/>`;

        // 이미지 태그를 질문에 삽입합니다.
        parsedQuestion = parsedQuestion.replace(`<img src=${index + 1}/>`, imgTag);
      });
    }
    else {
      const imgRegex = /<img.*?\/?>/g;
      // 이미지 URL 배열이 없는 경우 직접적으로 이미지 태그를 대체합니다.
      parsedQuestion = parsedQuestion.replace(imgRegex, `<img src="${questionImgUrls}"/>`);
    }

    return parsedQuestion;
  };

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
        {data.map((item, index) => (
          <li key={index}>
            {/* 질문 */}
            <p>{parse(parseImageTag(item.question, item.images))}</p>
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
