function nbYear(p0, percent, aug, p) {
    let yearCount = 0;
    percent /= 100;
    while (p0 < p) {
        yearCount++;
        p0 += parseInt(p0 * percent) + aug;
    }
    return yearCount;

}
nbYear(1500, 5, 100, 5000);
nbYear(1500000, 2.5, 10000, 2000000);
nbYear(1500000, 0.25, 1000, 2000000);