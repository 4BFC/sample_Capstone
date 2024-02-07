import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Sub_Lab() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/sample')
      .then(res => res.json())
      .then((data) => {
        setData(data); // slice를 통해서 10개의 아이템만 가져올 것
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Test</h2>
      <Link to="/">back</Link>
      {/* {data.length > 20 && <div>{data[20].question}</div>} */}
      {/* 옵셔널 체이닝 */}
      {/* <div>{data[19]?.question}</div>
      <div>{data[19]?.options}</div> */}
      <ol>
        {data.map((data) => (
          <li key={data.id}><p>{data.question}</p>{data.options}</li>
        ))}
      </ol>
    </div>
  );
}
