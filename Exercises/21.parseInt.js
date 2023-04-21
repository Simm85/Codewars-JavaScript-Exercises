function parseInt(string) {
    const ref = {
        zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5,
        six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11,
        twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
        seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30,
        forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90,
        hundred: 100, thousand: 1000, million: 1000000,
    }

    string = string.split(' ').filter(str => str !== 'and');
    string.forEach((str, i) => {
        if (str.includes('-')) {
            str = str.split('-');
            string.splice(i, 1, ref[str[0]] + ref[str[1]]);
        } else {
            string.splice(i, 1, ref[str]);
        }
    });

    let result = 0;
    for (let i = 0; i < string.length; i++) {
        if (string.length === 1) return result = string[i];
        if (string.length === 2) return result = string[0] * string[1];

        switch (string[i]) {
            case 100:
                result += math(string, i);
                break;

            case 1000:
                if (result === 0) result = string[0];
                result *= string[i];
                if (i + 1 === string.length - 1) result += string[i + 1];
                break;
        }
    }

    function math(arr, i) {
        const a = arr[i - 1];
        const b = arr[i];
        let c = arr[i + 1];
        if (c === undefined || c === 1000) c = 0;
        return a * b + c;
    }
    return result;
}
parseInt('two hundred thousand three'); // 200003
parseInt('seven hundred thousand'); // 700000
parseInt('twenty-six thousand three hundred fifty-nine'); // 1359 => 26359;
parseInt('four thousand two hundred sixty-six') // 1266 => 4266
parseInt('one thousand three hundred thirty-seven'); // 1337
parseInt('one thousand three hundred fifty-two');
parseInt('eleven');
parseInt('two thousand');
parseInt('twenty-one');
parseInt('fifty-eight');
parseInt('two hundred forty-six'); // 246
parseInt('seven hundred eighty-three thousand nine hundred and nineteen'); // 783919