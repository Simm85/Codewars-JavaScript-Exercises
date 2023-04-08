function decodeMorse(morseCode) {
    const wordsSeparator = /\s{3}/g;
    const charsSeparator = /\s{1}/g;
    const codedWords = morseCode.split(wordsSeparator).filter(el => el !== '');
    let message = '';
    for (const word of codedWords) {
        const chars = word
            .split(charsSeparator)
            .filter(char => char !== '')
            .forEach(char => message += MORSE_CODE[char]);
        message += ' ';
    }
    return message.trimEnd();
}