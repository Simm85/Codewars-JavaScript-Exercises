function justify(text, width) {
    const words = text.split(' ');
    const lineWords = [];
    const len = words.length;
    let justifiedText = '';
    for (let i = 0; i < len; i++) {
        lineWords.push(words[i]);
        let textLine = lineWords.join(' ');
        if (textLine.length > width) {
            const index = textLine.length - words[i].length;
            textLine = textLine.substring(0, index).trimEnd();
            i--;
            let intervals = [...textLine.matchAll(/\s+/g)];
            if (intervals.length > 0) {
                let j = 0;
                while (textLine.length < width) {
                    textLine = textLine.split('');
                    textLine.splice(intervals[j].index, 0, ' ');
                    textLine = textLine.join('');
                    intervals = [...textLine.matchAll(/\s+/g)];
                    j++;
                    if (j === intervals.length) j = 0;
                }
            }
            justifiedText += textLine + '\n';
            textLine = '';
            lineWords.splice(0);
        }
        if (i === len - 1) justifiedText += textLine;
    }
    return justifiedText.trimEnd();
}
//justify('123 45 6', 7);
justify('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis dolor mauris, at elementum ligula tempor eget. In quis rhoncus nunc, at aliquet orci. Fusce at dolor sit amet felis suscipit tristique. Nam a imperdiet tellus. Nulla eu vestibulum urna. Vivamus tincidunt suscipit enim, nec ultrices nisi volutpat ac. Maecenas sit amet lacinia arcu, non dictum justo. Donec sed quam vel risus faucibus euismod. Suspendisse rhoncus rhoncus felis at fermentum. Donec lorem magna, ultricies a nunc sit amet, blandit fringilla nunc. In vestibulum velit ac felis rhoncus pellentesque. Mauris at tellus enim. Aliquam eleifend tempus dapibus. Pellentesque commodo, nisi sit amet hendrerit fringilla, ante odio porta lacus, ut elementum justo nulla et dolor.', 15);


