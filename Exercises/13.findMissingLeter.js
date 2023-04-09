function findMissingLetter(array) {
    const string = array.join('');
    for (let i = 0; i < string.length; i++) {
        const numA = string.charCodeAt(i);
        for (let j = i + 1; j < string.length; j++) {
            const numB = string.charCodeAt(j);
            if (numB - numA > 1) return String.fromCharCode(numA + 1);
            break;
        }
    }
}
findMissingLetter(['a', 'b', 'c', 'd', 'f']);