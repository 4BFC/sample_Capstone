import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SelectExam.css';
import axios from 'axios';

export default function SelectExam() {
  const navigate = useNavigate();
  const [examType, setExamType] = useState(); //시험지 종류
  const [checkType, setCheckType] = useState([]); //체크박스 리스트
  const [search, setSearch] = useState(""); // 검색어
  const [keywords, setKeywords] = useState([]);
  const [select, setSelect] = useState(20);// 문제 문항 수 select 값
  const [isClicked, setIsClicked] = useState(false); // 
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState(null);

  //체크박스 중복 불가
  // function setCheckType_Fn(e) {
  //   const value = e.target.value;
  //   if (e.target.checked) {
  //     console.log(e.target.value);
  //     setCheckType((prevCheckType) => [...prevCheckType, value]);
  //   } else if (!e.target.checked) {
  //     setCheckType((prevCheckType) => prevCheckType.filter(item => item !== value)); // item이 e.target.value처럼 target이 되었는지 확인
  //   }
  // }

  // 모달 열기
   const openModal = () => {
    setShowModal(true);
  }

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setKeywords([]); // 키워드 초기화
    setSelectedTags([]); // 선택된 태그 초기화
    setSelectedQuestions(null); // 선택된 문항 초기화
  }


  const handleButtonClick = (e) => {
    setExamType(e.target.value);
    // console.log(e.target.value);
    setIsClicked(true); // Button 클릭 상태를 true로 설정
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      setKeywords([...keywords, search]); // 입력된 단어를 키워드 배열에 추가
      setSearch(''); // 검색어를 초기화
    }
  }

  const handelDeleteKeyword = (index) => {
    const deleteKeywords = [...keywords];
    deleteKeywords.splice(index, 1); // 선택된 인덱스의 키워드를 제거
    setKeywords(deleteKeywords); // 변경된 키워드 배열을 업데이트
  }

  const handleTagClick = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (selectedTags.includes(value)) {
      setSelectedTags(selectedTags.filter(tag => tag !== value));
    } else {
      setSelectedTags([...selectedTags, value]);
    }
  }

  const handleQuestionClick = (e) => {
    e.preventDefault();
    setSelectedQuestions(e.target.value);
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedQuestions) {
      alert("문항수는 하나를 꼭 선택해야합니다.");
      return;
    }
  
    const format_info = {
      exam_title: examType,
      exam_id: checkType,
      tags: selectedTags,
      includes: keywords,
      count: Number(select),
    };
  
    console.log(format_info);

    // const url = `http://13.125.253.41:8080/api/v1/exams/${checkType}/questions?count=${format_info.count}&tags=${format_info.tags.join(',')}&includes=${format_info.includes.join(',')}`;

    // axios.post(url, format_info)
    //     .then((response) => {
    //         console.log(response.data);
    //         navigate(`/lab`);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

    navigate(`/lab`);

  }
  

  return (
    <div>
       <div className="examList">
        <button value="운전면허" onClick={handleButtonClick} >운전면허</button>
        <button value="수능">수능</button>
        <button value="컴퓨터활용능력">컴퓨터활용능력</button>
      </div>
   
    <form action="" onSubmit={handleSubmit} >
     
    
      {isClicked && (
          <select onChange={(e)=> {setCheckType(e.target.value); openModal(); }}>
            <option value={1}>1종 보통</option>
            <option value={"2"}>2종 보통</option>
            <option value={"대형"}>대형</option>
            <option value={"특수"}>특수</option>
            <option value={"소형"}>소형</option>
            <option value={"원동기"}>원동기</option>
          </select>
        )}
      
        {showModal && (
          <div className="modal" >
            <div className="modal-content">
            <button onClick={closeModal}> X </button>
            <br />
            <span> 태그 </span>
              <div className="tags">
              <button 
                value="상황" 
                onClick={handleTagClick}
                style={{backgroundColor: selectedTags.includes("상황") ? "blue" : "initial"}}
              ># 상황</button>
              <button 
                value="표지" 
                onClick={handleTagClick}
                style={{backgroundColor: selectedTags.includes("표지") ? "blue" : "initial"}}
              ># 표지</button>
              </div>
            <span> 검색어 </span>
            <input type="text" value={search} 
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}/>
            <br />
            {keywords.map((keyword, index) => (
              <div key={index} >
                <span className="keyword">{keyword} </span>
                <button type="button" onClick={()=> handelDeleteKeyword(index)}>x</button>
              </div>
            ))}
            <br />
            <span>문항수 </span>
            <div>
              {[20, 15, 10, 5].map(questionCount => (
                  <button 
                    key={questionCount}
                    value={questionCount}
                    onClick={handleQuestionClick}
                    style={{backgroundColor: selectedQuestions === questionCount.toString() ? "blue" : "initial"}}
                  >{questionCount}</button>
                ))}
             </div>

              <br />  
              <input type="submit" value="시험지 생성" />
            </div>
          </div>
        )}
    </form>
    </div>
  )
}

