# TS Notebook

> A TypeScript-based documentation notebook and Web-IDE

---

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
