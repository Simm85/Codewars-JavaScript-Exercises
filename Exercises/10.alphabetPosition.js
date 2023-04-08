function alphabetPosition(text) {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const pattern = /[A-Z]/;
    const transformed = [];
    text = text.toUpperCase();
    for (const char of text) {
        if (pattern.test(char)) transformed.push(alphabet.indexOf(char) + 1);
    }
    return transformed.join(' ');
}
alphabetPosition("The sunset sets at twelve o' clock.");