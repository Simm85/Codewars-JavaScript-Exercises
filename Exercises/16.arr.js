function findUniq(arr) {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        obj.hasOwnProperty(arr[i]) ? obj[arr[i]]++ : obj[arr[i]] = 1;
    }

    let uniq = 0;
    for (let key in obj) {
        if (obj[key] === 1) uniq = Number(key);
    }

    return uniq;
}

findUniq([0, 0, 1]);
findUniq([3, 3, 3, 3, 2]);
findUniq([0, 0, 0.55, 0, 0]);