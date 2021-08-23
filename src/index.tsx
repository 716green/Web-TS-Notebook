import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState<string>('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClickHandler = async () => {
    if (!ref.current) {
      return;
    }

    iframe.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

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

  return (
    <div>
      <CodeEditor initialValue={input} onChange={(value) => setInput(value)} />
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <div>
        <button onClick={onClickHandler}>Submit</button>
      </div>
      <iframe
        ref={iframe}
        title="preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
