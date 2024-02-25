import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Markdown_test() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/sample')
      .then(res => res.json())
      .then((data) => {
        setData(data.slice(0, 5)); // limit에 맞게 잘라서 사용
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const markdown = `
  # Heading 1

  This is a **bold** text and this is a *italic* text.
  <div>
    This is an HTML <span style="color: red;">element</span>.
  </div>
`;

  return (
    <div>
      <Link to="/">back</Link>
      <div style={{ display: 'absolute', margin: '10px', height: '100px', width: '400px' }}>
        <img src="https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004" style={{ float: 'left', width: '200px', margin: '10px', marginBottom: '0px' }} />Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti perspiciatis quo quia ea vitae iusto excepturi autem quod molestias beatae eveniet fugiat corporis delectus, eos fugit iure cupiditate optio eaque?Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti <img src="https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004" style={{ width: '20px', margin: '0px', marginBottom: '0px' }} />perspiciatis quo quia ea vitae iusto excepturi autem quod molestias beatae eveniet fugiat corporis delectus, eos fugit iure cupiditate optio eaque?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est harum rerum repudiandae aliquid eaque nihil delectus, saepe facere aut, ab qui. Temporibus, reiciendis? Atque quasi facere expedita reprehenderit modi voluptatem!
        {/* <ReactMarkdown>{markdown}</ReactMarkdown> */}
        <div style={{ display: 'absolute' }}>
          <ol>
            {data.map((item) => (
              <li key={item.id}><p>{item.question}</p>{item.options}</li>
              // <li key={item.id}>
              //   <ReactMarkdown>
              //     {`### ${item.question}\n\n${item.options}`}
              //   </ReactMarkdown>
              // </li>
            ))}
          </ol>
        </div>
      </div>
    </div >
  );
}
