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