function mix(s1, s2) {
  const obj_1 = {};
  const obj_2 = {};
  let strArray = [];
  modString(s1, obj_1);
  modString(s2, obj_2);
  const length = Object.keys(obj_2).length;
  let prefix = '';
  for (let i = 0; i < length; i++) {
    const currentKey = Object.keys(obj_2);
    if (obj_1.hasOwnProperty(currentKey[i])) {
      if (obj_1[currentKey[i]].length === obj_2[currentKey[i]].length) {
        prefix = '=:';
        obj_1[currentKey[i]] = prefix + obj_1[currentKey[i]];
      } else if (obj_1[currentKey[i]].length > obj_2[currentKey[i]].length) {
        prefix = '1:';
        obj_1[currentKey[i]] = prefix + obj_1[currentKey[i]];
      } else {
        prefix = '2:';
        obj_1[currentKey[i]] = prefix + obj_2[currentKey[i]];
      }
    } else {
      prefix = '2:';
      obj_1[currentKey[i]] = prefix + obj_2[currentKey[i]];
    }
  }

  for (const key in obj_1) {
    if (!obj_1[key].includes(':')) obj_1[key] = '1:' + obj_1[key];
  }

  strArray = Object.values(obj_1);

  strArray.sort((a, b) => {
    if (a.length === b.length) {
      return a > b ? 1 : -1;
    } else {
      return b.length - a.length;
    }
  });

  console.log(strArray.join('/'));

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
}
//mix("Are they here", "yes, they are here");
// "2:eeeee/2:yy/=:hh/=:rr"
mix("looping is fun but dangerous", "less dangerous than coding");
// "1:ooo/1:uuu/2:sss/=:nnn/1:ii/2:aa/2:dd/2:ee/=:gg"
