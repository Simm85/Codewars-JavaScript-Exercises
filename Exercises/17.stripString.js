function solution(input, markers) {
    input = input.split('\n');
    let result = [];
    for (let string of input) {
        const index1 = string.indexOf(markers[0]);
        const index2 = string.indexOf(markers[1]);
        if (index1 > -1 || index2 > -1) {
            let exactIndex = 0;
            index1 > -1 ? exactIndex = index1 : exactIndex = index2;
            string = string.substring(0, exactIndex - 1);
        }
        result.push(string);
    }
    return result.join('\n');
}
solution("apples, plums % and bananas\npears\noranges !applesauce", ["%", "!"]);
solution("Q @b\nu\ne -e f g", ["@", "-"], "Q\nu\ne");