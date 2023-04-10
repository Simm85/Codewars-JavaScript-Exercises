function solution(roman) {
    const reference = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }

    const integers = [];

    for (const char of roman) {
        for (const key in reference) {
            if (key === char) {
                integers.push(reference[key]);
                break;
            }
        }
    }

    let year = 0;

    for (let i = 0; i < integers.length; i++) {
        if (integers[i] - integers[i + 1] < 0) {
            year += integers[i + 1] - integers[i];
            integers.splice(i, 2);
            i--;
        } else {
            year += integers[i];
        }
    }
    return year;
}

solution('MMVIII'); // for roman number CIX: expected 111 to equal 109
solution('MMXCV');// for roman number MMXCV: expected 2090 to equal 2095