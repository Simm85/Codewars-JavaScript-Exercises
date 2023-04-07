function highAndLow(numbers) {
  numbers = numbers.split(' ').map(Number);
  if (numbers.length < 2) return new Array(numbers[0], numbers[0]).join(' ');
  numbers.sort((a, b) => a - b);
  return new Array(numbers.pop(), numbers.shift()).join(' ');
}
highAndLow('1 -3 5 105 20 49');