function isItANum(str) {
    const excludePattern = /\D+/g;
    str = str.split(excludePattern).join('');
    const isValid = str.charAt(0) === '0' && str.length === 11;
    return isValid ? str : 'Not a phone number';
  }
  isItANum('0 19,::238 b{}74 1 5,4');