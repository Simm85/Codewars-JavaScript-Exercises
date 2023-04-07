function highAndLow(numbers) {
    numbers = numbers.split(' ').map(number => Number(number));
    if (numbers.length < 2) return new Array(numbers[0], numbers[0]).join(' ');
    numbers.sort((a, b) => a - b);
    return new Array(numbers[numbers.length - 1], numbers[0]).join(' ');
  }