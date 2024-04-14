function If(cond, func) {
  if (cond) return func()
}

function calc(op, a, b) {
  switch (op) {
    case "+":
      return a + b
    case "-":
      return a - b
    case "*":
      return a * b
    case "/":
      return a / b
  }
}
