function permutations(string) {
    const result = new Array(string);
    let start, mid, end;

    while (true) {
        if (!result.includes(string)) {
            result.push(string);
        } else {
            string = string.split('');
            let str1 = string[1];
            let str2 = string[2];
            string.splice(1, 1, str2);
            string.splice(2, 1, str1);
            string = string.join('');
        }

    }
}
permutations('aabb'); // ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']
//permutations('abc'); // ['abc','acb','bac','bca','cab','cba']