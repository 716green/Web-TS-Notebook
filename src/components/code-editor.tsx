import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor
      .getModel()
      ?.updateOptions({ tabSize: 2, trimAutoWhitespace: true });
  };

  const onFormatHandler = () => {
    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });

    editorRef.current.setValue(formatted);
  };

  return (
    <div>
      <button onClick={onFormatHandler}>Format</button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme="dark"
        language="javascript"
        height="500px"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          folding: false,
          lineNumbersMinChars: 3,
          showUnused: false,
          formatOnPaste: true,
          fontFamily: "'Fira Code', monospace",
          fontLigatures: true,
          fontSize: 16,
          scrollBeyondLastColumn: 5,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
