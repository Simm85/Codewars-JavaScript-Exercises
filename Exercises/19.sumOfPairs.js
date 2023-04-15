function sumPairs(arr, sum) {
    let numSet = new Set(); // Create a set to store seen numbers
    for (let num of arr) {
        let complement = sum - num; // Calculate the complement required for the sum
        if (numSet.has(complement)) {
            // If the complement is already in the set, we found a pair
            return [complement, num];
        }
        numSet.add(num); // Add the current number to the set
    }
    return undefined; // If no pair is found, return undefined

}
sumPairs([1, 4, 8, 7, 3, 15], 8);
sumPairs([10, 5, 2, 3, 7, 5], 10);

/**
 function sumPairs(ints, s) {
    const intPairs = [];
    let len = ints.length;
    for (let i = 0; i < len; i++) {
        const num1 = ints[i];
        for (let j = i + 1; j < len; j++) {
            const num2 = ints[j];
            if (num1 + num2 === s) {
                if (intPairs.length === 2) {
                    if (intPairs[1] > j) intPairs.splice(0);
                }
                intPairs.push(i, j);
                break;
            }
        }
    }

    return intPairs.length === 0
        ? undefined
        : new Array(ints[intPairs[0]], ints[intPairs[1]]);
}





function sumPairs(ints, s) {
    const intPairs = [];
    let i = 0;
    let j = 1;
    let len = ints.length;
    let counter = ints.length;
    while (counter > 1) {
        if (ints[i] + ints[j] === s) {
            if (intPairs.length === 2) {
                if (intPairs[1] > j) intPairs.splice(0);
            }
            intPairs.push(i, j);
        }

        j++;
        if (j >= len) {
            i++;
            j = i + 1;
            counter--;
        }
    }

    return intPairs.length === 0
        ? undefined
        : new Array(ints[intPairs[0]], ints[intPairs[1]]);
}
 

*/