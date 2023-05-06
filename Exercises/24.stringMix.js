function mix(s1, s2) {
  const objectA = {};
  const objectB = {};
  modString(s1, objectA);
  modString(s2, objectB);
  const length = Object.keys(objectB).length;
  return result(length);

  function modString(str, obj) {
    str = [...str.matchAll(/[a-z]+/g)].join('');
    for (const char of str) {
      obj.hasOwnProperty(char)
        ? obj[char] += char
        : obj[char] = char;
    }
    str = '';
    for (const key in obj) {
      if (obj[key].length < 2) delete obj[key];
    }
    return obj;
  }

  function result(length) {
    for (let i = 0; i < length; i++) {
      const key = Object.keys(objectB);
      if (objectA.hasOwnProperty(key[i])) {
        if (objectA[key[i]].length === objectB[key[i]].length) {
          objectA[key[i]] = '=:' + objectA[key[i]];
        } else if (objectA[key[i]].length > objectB[key[i]].length) {
          objectA[key[i]] = '1:' + objectA[key[i]];
        } else {
          objectA[key[i]] = '2:' + objectB[key[i]];
        }
      } else {
        objectA[key[i]] = '2:' + objectB[key[i]];
      }
    }

    for (const key in objectA) {
      if (!objectA[key].includes(':')) objectA[key] = '1:' + objectA[key];
    }

    return Object.values(objectA).sort((a, b) => {
      if (a.length === b.length) return a > b ? 1 : -1;
      return b.length - a.length;
    }).join('/');
  }
}
mix("Are they here", "yes, they are here");
// "2:eeeee/2:yy/=:hh/=:rr"
mix("looping is fun but dangerous", "less dangerous than coding");
// "1:ooo/1:uuu/2:sss/=:nnn/1:ii/2:aa/2:dd/2:ee/=:gg"
