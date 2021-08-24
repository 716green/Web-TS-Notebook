import { useRef, useEffect } from 'react';

interface PreviewProps {
  code: string;
}

const html = /*html*/ `
  <html lang="en">
  <head>
    <title>IFrame</title>
  </head>
  <body>
    <div id="root"></div>
    <script>
    window.addEventListener('message', (event) => {
      try {
        eval(event.data)
      } catch (err) {
        const root = document.querySelector('#root')
        root.innerHTML = '<div style="background-color: #fff0f1;color: #ff3f39;">' + err + '</div>'
        console.error(err)
      }
    }, false)
    </script>
    
  </body>
  </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <iframe
      ref={iframe}
      title="preview"
      sandbox="allow-scripts"
      srcDoc={html}
    />
  );
};

export default Preview;