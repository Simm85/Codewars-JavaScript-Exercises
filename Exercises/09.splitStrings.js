function solution(str) {
    const printResult = [];
    str = str.split('');
    while (str.length > 0) {
        str.length > 1
            ? printResult.push(str.shift() + str.shift())
            : printResult.push(str.shift() + '_');
    }
    return printResult;
}