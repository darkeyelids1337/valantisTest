import md5 from 'crypto-js/md5'
const PASSWORD = 'Valantis';
const date = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getUTCDate();
    return `${year}${month > 9 ? month : '0'+month}${day > 9 ? day : '0'+day}`;
}

export function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }
  
export const message = md5(`${PASSWORD}_${date()}`).toString()
