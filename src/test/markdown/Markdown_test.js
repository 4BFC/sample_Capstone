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
  const markdown = `
    # Heading 1

    This is a **bold** text and this is a *italic* text.

    ![image](https://example.com/image.jpg)

    - List item 1
    - List item 2
  `;

  const customComponents = {
    // h1을 렌더링할 때 추가할 클래스나 스타일 적용
    h1: ({ children }) => <h1 style={{ color: 'blue' }}>{children}</h1>,
    // 이미지를 렌더링할 때 추가할 클래스나 스타일 적용
    img: ({ src, alt }) => <img src={src} alt={alt} style={{ maxWidth: '100%' }} />,
  };

  return (
    <div>
      <ReactMarkdown components={customComponents}>{markdown}</ReactMarkdown>
    </div>
  );
}
