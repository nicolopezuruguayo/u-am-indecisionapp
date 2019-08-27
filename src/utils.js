console.log('utils.js');

const square = (x) => x * x;

function add (a,b)  {return a + b}

const subtract = (a,b) => a - b;

export { square, add, subtract as default};