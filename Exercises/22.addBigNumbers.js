function add(a, b) {
    let result = ""; // variable to store the result
    let carry = 0; // variable to store the carry-over digit

    // loop through each digit in the input strings, starting from the right-most digit
    for (let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0 || carry > 0; i--, j--) {
        // convert the current digit of each input string to a number
        let digitA = i >= 0 ? parseInt(a[i]) : 0;
        let digitB = j >= 0 ? parseInt(b[j]) : 0;

        // add the two digits and the carry-over digit
        let sum = digitA + digitB + carry;

        // calculate the new carry-over digit and the current result digit
        carry = Math.floor(sum / 10);
        let digitResult = sum % 10;

        // add the current result digit to the result string
        result = digitResult.toString() + result;
    }

    // trim leading zeroes from the result string
    result = result.replace(/^0+/, '');

    return result;
}
add('63829983432984289347293874', '90938498237058927340892374089') //"91002328220491911630239667963"