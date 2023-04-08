function persistence(num) {
    let counter = 0;
    while (num > 9) {
        num = String(num).split('').reduce((result, n) => result *= Number(n));
        counter++;
    }
    return counter;
}
persistence(25);