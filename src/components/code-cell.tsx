import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

import 'bulmaswatch/superhero/bulmaswatch.min.css';

const renderDebounceSeconds = 750;

const CodeCell = () => {
  const [code, setCode] = useState<string>('');
  const [err, setErr] = useState<string>('');
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, renderDebounceSeconds);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={input}
            onChange={(value) => setInput(value)}
          />
        </Resizable>

        <Preview code={code} bundleError={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
