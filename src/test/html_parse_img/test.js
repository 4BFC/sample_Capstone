import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import "./style.css";

export default function LabExam() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);

  //Bring API with useEffect
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

  //정규식으로 파싱 후에 이미지 렌더링 함수
  const parseImageTag = (question, questionImgUrls) => {
    let parsedQuestion = question;

    // 이미지 URL 배열이 정의되었는지 확인합니다.
    if (Array.isArray(questionImgUrls) && questionImgUrls.length > 0) {
      // 이미지 URL 배열의 각 요소를 반복하여 이미지 태그를 생성하고 질문에 삽입합니다.
      questionImgUrls.forEach((imageUrl, index) => {
        // 정규 표현식을 사용하여 이미지 태그를 대체합니다.
        const regex = new RegExp(`src=${index + 1}`, 'g');
        console.log(regex)
        console.log(questionImgUrls.length)
        parsedQuestion = parsedQuestion.replace(regex, `src="${imageUrl}"`);
      });
    }
    // else {
    //   // 이미지 URL 배열이 없는 경우 직접적으로 이미지 태그를 대체합니다.
    //   const imgRegex = /src=\d+/g;
    //   parsedQuestion = parsedQuestion.replace(imgRegex, `src="${questionImgUrls}"`);
    // }

    return parsedQuestion;
  };

  // 이미지 렌더링 함수
  const renderImages = (outsideImage) => {
    if (Array.isArray(outsideImage) && outsideImage.length > 0) {
      return outsideImage.map((image, imageIndex) => (
        <img key={imageIndex} src={image} alt={`Image ${imageIndex + 1}`} style={{ width: '100%' }} />
      ));
    } else if (typeof outsideImage === 'string' && outsideImage.trim() === '') {
      // outside_image 필드가 빈 문자열인 경우
      return null; // 빈 문자열일 경우 아무것도 반환하지 않습니다.
    } else {
      return <img src={outsideImage} alt="Image" style={{ width: '100%' }} />;
    }
  };

  //rendering
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
          <li key={index} style={{ marginBottom: '70px', border: '1px solid black', width: '60%' }}>
            {/* 질문 */}
            <p>{parse(parseImageTag(item.question, item.images))}</p>
            {/* 이미지 렌더링 함수 호출 */}
            {renderImages(item.outside_image)}
            {/* 4선지 */}
            {item.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                {option}
              </div>
            ))}
          </li>
        ))}
      </ol>

    </div>
  );
}
