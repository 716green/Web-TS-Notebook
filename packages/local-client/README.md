# TS Notebook

> A TypeScript-based documentation notebook and Web-IDE

You can reference variables from between blocks within a notebook

---

# Todo

- Look into adding HTML into the Markdown (Try it, it does strange things)
- Add the following code as either a default, or a 'quick add' option:
  ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom';
  import 'bulma/css/bulma.css';
  const Code = () => {
    return <div>Hello World</div>;
  };
  ReactDOM.render(<Code />, document.querySelector('#root'));
  ```

# Lerna

## Project Folder

|            |     |              |
| ---------- | --- | ------------ |
| lerna.json |     |              |
|            |     |              |
| packages   | ->  | cli          |
|            |     |              |
|            | ->  | local-api    |
|            |     |              |
|            | ->  | local-client |

# Redux

## Action Creators

|                   |
| ----------------- |
| `updateCell`      |
| `deleteCell`      |
| `insertCellAfter` |
| `moveCell`        |
| `fetchCells`      |
| `Bundles`         |

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

```
