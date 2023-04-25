function nextBigger(n) {
    const digits = String(n).split('').map(n => Number(n));
    let result = 0;
    let i = digits.length - 1;
    while (i > 0) {
        let a = digits[i];
        let b = digits[i - 1];
        if (a - b > 0) {
            digits.splice(i, 1, b);
            digits.splice(i - 1, 1, a);
            result = Number(digits.join(''));
            break;
        }
        i--;
    }
    return console.log(result);
}
nextBigger(67540) // 70456
nextBigger(996739262213331); // 996739262231133
nextBigger(513); // 531  
nextBigger(2017); // 2071
nextBigger(414); // 441
nextBigger(144); // 414

/**
 
9 ==> -1
111 ==> -1
531 ==> -1

 */

