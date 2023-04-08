function duplicateCount(text) {
    let charsCount = 0;
    text = text.toLowerCase();
    for (const char of text) {
        const testText = text.substring(text.indexOf(char) + 1);
        if (testText.indexOf(char) > -1) {
            charsCount++;
            text = text.replaceAll(char, '');
        }
    }
    return charsCount;
}
duplicateCount("aabBcde");
duplicateCount("Indivisibility");
duplicateCount("Indivisibilities");