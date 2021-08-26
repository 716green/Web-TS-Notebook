# TS Notebook

> A TypeScript-based documentation notebook and Web-IDE

---

# Todo

- Add the following code as either a default, or a 'quick add' option:
  ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom';
  import 'bulma/css/bulma.css';
  ```

const App = () => {
return <div>Hello World</div>;
};

ReactDOM.render(<App />, document.querySelector('#root'));

```

# Redux

## Action Creators

|                          |
| ------------------------ |
| `updateCell`             |
| `deleteCell`             |
| `insertCellBefore/After` |
| `moveCell`               |
| `fetchCells`             |
| `Bundles`                |

---

## Redux Store

|         |     |         |                       |                            |
| ------- | --- | ------- | --------------------- | -------------------------- |
|         | ->  | data    | `{[cell Id]: Cell}`   | Array of all cells         |
| Cells   | ->  | loading | `boolean`             | True/False - Fetching Data |
|         | ->  | error   | `string \| null`      | Errors saving cells        |
|         | ->  | order   | `string[]`            | Order of cells             |
|         |     |         |                       |                            |
| Bundles | ->  | data    | `{[cell Id]: Bundle}` | Bundle for each cell       |
```
