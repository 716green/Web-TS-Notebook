import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';

import 'bulmaswatch/superhero/bulmaswatch.min.css';

const CodeCell = () => {
  const [code, setCode] = useState<string>('');
  const [input, setInput] = useState<string>('');

  const onClickHandler = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor initialValue={input} onChange={(value) => setInput(value)} />
      <div>
        <button onClick={onClickHandler}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
