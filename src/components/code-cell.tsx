import { useState, useEffect } from 'react';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

interface CodeCellProps {
  cell: Cell;
}

// Provides just under 1 second between keystrokes before attempting to refresh the render
const renderDebounceSeconds = 750;

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState<string>('');
  const [err, setErr] = useState<string>('');

  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, renderDebounceSeconds);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            // onChange={(value) => updateCell(cell.id, value)}
            onChange={(value) => updateCell(cell.id, value || '')}
          />
        </Resizable>

        <Preview code={code} bundleError={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
