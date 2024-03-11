import React from 'react';
import ReactMarkdown from 'react-markdown';
//마크다운을 html로 랜더링
//react-markdown은 html을 마크다운으로 랜더링하는 것은 제공되지 않는다. 이유는 보안상의 이유때문이다.
//마크다운은 파일은 자체적으로 html을 지원은 한다. 하지만 라이브러리나 마크다운 플렛폼에선 보안상의 이유로 html을 렌더링을 허용하지 않는다.
//그렇다면 일부 기능만을 사용할 수는 없는가? 기본적으로 html을 사용하기 어려워서 css를 적용할 수가 없다.
//그렇다면 깃허브는? 깃허브는 md파일 자체를 렌더링한 결과이다. 깃허브의 방식대로라면 우리는 md파일에서 js 없이 개발을 해야한다.
//라이브러리는 일부 마크다운의 기능을 js에서 사용할 수 있게 제공 해주는 것일 뿐이다.
export default function MyComponent() {
  const markdown = `
    # Heading 1

    This is a **bold** text and this is a *italic* text.

    ![image](https://example.com/image.jpg)

    - List item 1
    - List item 2
  `;

  return (
    <div>
      test
      <ReactMarkdown
        components={{
          // Map `h1` (`# heading`) to use `h2`s.
          h1: 'h2',
          // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
          em(props) {
            const { node, ...rest } = props;
            return <i style={{ color: 'red' }} {...rest} />;
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
