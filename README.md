git-commands
============

```js
// Each item is a chalk command. (See https://github.com/chalk/chalk)
// So [ [ 'hex', '#f00' ], 'underline' ] will print the text in red and underlined
const defaultOptions = {
  colors: {
    'text': [],
    'issue-number': [ 'cyan' ],
    'initial-issue-number': [ 'cyan', 'bold', 'underline' ],
    'smart-command': [ 'underline' ],
    'excess': [ [ 'hex', '#fff' ], [ 'bgHex', '#ef2f6f' ] ],
  },
  limit: 0,
};
```
