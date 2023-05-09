function permutations(string) {
    const result = new Array(string);
    const strLength = string.length;
    const lastIndex = string.length - 1;
    let start, mid, end;
    let counter = 0;
    let factorial = 1;

    for (let i = 1; i <= strLength; i++) {
        factorial *= i;
    }

    while (result.length !== factorial) {
        if (result.includes(string)) {
            let i = Math.floor(Math.random() * strLength);
            start = string.substring(0, i);
            mid = string.substring(i, lastIndex);
            end = string.substring(lastIndex);
            string = end + mid + start;
        } else {
            result.push(string);
        }
        
        if (string === result[0]) {
            counter++;
            if (counter === factorial) break;
        }
    }
    return result;
}
//permutations('');
//permutations('a');
//permutations('ab');
permutations('aabb'); // ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']
permutations('abc'); // ['abc','acb','bac','bca','cab','cba']