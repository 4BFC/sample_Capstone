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
  /**
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
  */
  // const renderQuestionWithImages = (question, questionImages) => {
  //   // 유효한 이미지 배열인지 확인합니다.
  //   if (!Array.isArray(questionImages)) {
  //     return <div>No images available</div>;
  //   }

  //   // 정규 표현식을 사용하여 이미지 태그를 파싱합니다.
  //   const regex = /<img src=(\d+)>/g;

  //   // question을 정규 표현식으로 파싱하여 이미지 태그를 찾고, 각 이미지 태그를 적절한 URL로 교체합니다.
  //   const parsedQuestion = question.replace(regex, (match, imgUrlIndex) => {
  //     imgUrlIndex = parseInt(imgUrlIndex); // 이미지 URL 인덱스

  //     // 인덱스가 유효한지 확인합니다.
  //     if (!isNaN(imgUrlIndex) && imgUrlIndex >= 0 && imgUrlIndex < questionImages.length) {
  //       const imageUrl = questionImages[imgUrlIndex].url; // 이미지 URL을 가져옵니다.
  //       return `<img src="${imageUrl}" alt="Image ${imgUrlIndex}" />`;
  //     } else {
  //       return match; // 유효하지 않은 인덱스인 경우 원래의 이미지 태그를 반환합니다.
  //     }
  //   });

  //   // 파싱된 질문을 반환합니다.
  //   return <div dangerouslySetInnerHTML={{ __html: parsedQuestion }} />;
  // };

  const renderQuestionWithImages = (question, questionImages) => {
    // 유효한 이미지 배열인지 확인합니다.
    if (!Array.isArray(questionImages)) {
      return <div>No images available</div>;
    }

    // 정규 표현식을 사용하여 이미지 태그를 파싱합니다.
    const regex = /<img src=(\d+)>/g;

    // question을 정규 표현식으로 파싱하여 이미지 태그를 찾고, 각 이미지 태그를 적절한 URL로 교체합니다.
    const parsedQuestion = question.replace(regex, (match, imgUrlIndex) => {
      imgUrlIndex = parseInt(imgUrlIndex); // 이미지 URL 인덱스

      // 인덱스가 유효한지 확인합니다.
      if (!isNaN(imgUrlIndex) && imgUrlIndex >= 0 && imgUrlIndex < questionImages.length) {
        const imageUrl = questionImages[imgUrlIndex].url; // 이미지 URL을 가져옵니다.
        return `<img src="${imageUrl}" alt="Image ${imgUrlIndex}" />`;
      } else {
        return match; // 유효하지 않은 인덱스인 경우 원래의 이미지 태그를 반환합니다.
      }
    });

    // 파싱된 질문을 반환합니다.
    return <div>{parse(parsedQuestion)}</div>;
  };

  // 이미지 렌더링 함수 수정
  const renderImages = (imageData) => {
    if (Array.isArray(imageData) && imageData.length > 0) {
      return (
        <div>
          {imageData.map((image, imageIndex) => (
            <img
              key={imageIndex}
              src={image.url} // 이미지 객체에서 URL을 가져옵니다.
              alt={`Image ${imageIndex + 1}`}
              style={{ width: '100%' }}
            />
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  // const renderImages = (outsideImage) => {
  //   if (Array.isArray(outsideImage) && outsideImage.length > 0) {
  //     return outsideImage.map((image, imageIndex) => (
  //       <img key={imageIndex} src={image} alt={`Image ${imageIndex + 1}`} style={{ width: '100%' }} />
  //     ));
  //   } else if (typeof outsideImage === 'string' && outsideImage.trim() === '') {
  //     // outside_image 필드가 빈 문자열인 경우
  //     return null; // 빈 문자열일 경우 아무것도 반환하지 않습니다.
  //   } else {
  //     return <img src={outsideImage} alt="Image" style={{ width: '100%' }} />;
  //   }
  // };

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
            {/* <p>{parseImageTag(item.question, item.question_images_in)}</p> */}
            {renderQuestionWithImages(item.question, item.question_images_in)}
            {/* 이미지 렌더링 */}
            <div>{renderImages(item.question_images_out)}</div>
            {/* 4선지 */}
            <ol>
              {item.options.map((option, optionIndex) => (
                <li key={optionIndex}>{option}</li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
      <div style={{ width: "1000px" }}>
        <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fnspuc%2FbtsFt5GRCru%2FQyCoV4BBeEMoBGyNWoMCRk%2Fimg.png"></img>
        <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fnspuc%2FbtsFt5GRCru%2FQyCoV4BBeEMoBGyNWoMCRk%2Fimg.png"></img>
        <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fnspuc%2FbtsFt5GRCru%2FQyCoV4BBeEMoBGyNWoMCRk%2Fimg.png"></img>
        <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fnspuc%2FbtsFt5GRCru%2FQyCoV4BBeEMoBGyNWoMCRk%2Fimg.png"></img>
      </div>

    </div>
  );
}
