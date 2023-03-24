# react-bib
A React component for adding inline citations.

## Install

```bash
npm install react-bib
```

## Usage

```js
import { Bibliography } from 'react-bib'

<Bibliography
  mode='input'
  num={1}
  source='https://google.com'
  style={{ color: 'red' }}
/>

<Bibliography
  mode='print'
/>

```
## Reference

| prop  | type  | default  | functionality  |
|-------|-------|----------|----------------|
| mode  | string   | - |  input: accepts citation number and source, print: prints collected stations as a list. |
| num  | number   | - |  Citation number to show inline and bibliography order under the page |
|  source | string  | -  | The citation source  |
| style   | React.CSSProperties   | {}  | Inline styling for the Bibliography component  |