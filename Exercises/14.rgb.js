function rgb(r, g, b) {
  let numbers = new Array(r, g, b).map(n => {
    if (n > 255) {
      n = 255;
    } else if (n < 0) {
      n = 0;
    }
    return n.toString(16).padStart(2, 0);
  });
  return numbers.join('').toUpperCase();
}