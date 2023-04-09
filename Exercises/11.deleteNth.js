function deleteNth(arr, n) {
    const testArr = Object.assign([], arr);
    while (testArr.length > 0) {
        const testNumber = testArr.shift();
        let counter = 0;
        for (let i = 0; i < arr.length; i++) {
            const currentNumber = arr[i];
            if (testNumber === currentNumber) {
                counter++;
                if (counter > n) arr.splice(i, 1);
            }
        }
    }
    return arr;
}
deleteNth([20, 37, 20, 21], 1);