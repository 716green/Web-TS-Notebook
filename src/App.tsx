// todo - re-enable

// import CodeCell from './components/code-cell';
import { Provider } from 'react-redux';
import { store } from './state';
import TextEditor from './components/text-editor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        <TextEditor />
      </div>
    </Provider>
  );
};

export default App;
