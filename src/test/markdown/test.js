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
  const parseImageTag = (htmlString) => {
    // 정규식을 사용하여 <img src=1> 문자열을 찾습니다.
    const imgRegex = /<img\s+src=1\s*\/?>/g;
    // 대체할 이미지 태그로 교체합니다.
    return htmlString.replace(imgRegex, '<img src="https://png.pngtree.com/thumb_back/fh260/background/20230609/pngtree-three-puppies-with-their-mouths-open-are-posing-for-a-photo-image_2902292.jpg" />');
  };


  // 수정된 코드
  // const parseImageTag = (htmlString) => {
  //   const imgRegex = /<img.*?src="(.*?)".*?\/?>/g;
  //   return htmlString.replace(imgRegex, (match, imageUrl) => {
  //     // 원하는 이미지 URL로 대체
  //     const customImageUrl = "https://png.pngtree.com/thumb_back/fh260/background/20230609/pngtree-three-puppies-with-their-mouths-open-are-posing-for-a-photo-image_2902292.jpg";
  //     return `<img src="${customImageUrl}" />`;
  //   });
  // };


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
            <p dangerouslySetInnerHTML={{ __html: parseImageTag(item.question) }} />
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
