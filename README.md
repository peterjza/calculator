This solution uses Webpack, TypeScript, Jest

```bash
# Install dependencies
npm i

# Run the development server
npm run dev
```

## Ambiguity

This calculator doesn't have an add, subtract, divide, or multiply method. Instead, it relies on evaluating a string expression. This allows us to get BODMAS for free and not have to worry about any level of arithmetic.

Rather than using eval():

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!

We follow recommended practice and use:

```javascript
new Function('return ' + '5+3*2')();

// Calculator.js
this.currentResult = new Function('return ' + this.currentExpression)();
```

### Testing

Because we leverage the above expression evaluation, our test focuses on checking expression strings.

```bash
# TDD
npm run test-watch

# Run the tests
npm run test
```

### Time taken

Total time was 8-9 hours from Scratch
