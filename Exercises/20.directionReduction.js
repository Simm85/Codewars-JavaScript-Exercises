function dirReduc(arr) {
    const oppositeDirs = ['NORTHSOUTH', 'SOUTHNORTH', 'WESTEAST', 'EASTWEST'];
    let i = 0;
    let length = arr.length;
    while (length > 0) {
        const dirsConcat = arr[i] + arr[i + 1];
        if (oppositeDirs.indexOf(dirsConcat) > -1) {
            arr.splice(i, 2);
            i = 0;
            length = arr.length;
            continue;
        }
        i++;
        length--;
    }
    return arr;
}
dirReduc(["NORTH", "EAST", "NORTH", "EAST", "WEST", "WEST", "EAST", "EAST", "WEST", "SOUTH"]);
//  [ 'NORTH', 'EAST' ]
dirReduc(["EAST", "EAST", "WEST", "NORTH", "WEST", "EAST", "EAST", "SOUTH", "NORTH", "WEST"]);
// [ 'EAST', 'NORTH' ]
dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]) // [west]
dirReduc(["NORTH", "WEST", "SOUTH", "EAST"]) // ["NORTH", "WEST", "SOUTH", "EAST"]
dirReduc(["NORTH", "SOUTH", "EAST", "WEST", "EAST", "WEST"]); // []