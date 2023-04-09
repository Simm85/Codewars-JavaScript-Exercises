function findOdd(A) {
    for (const int of A) {
        let counter = 0;
        for (const compareInt of A) {
            if (int === compareInt) counter++;
        }
        if (counter % 2 !== 0) return int;
    }
}