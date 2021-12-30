import _isNumber from 'lodash/isNumber';
import _isEmpty from 'lodash/isEmpty';
import _isNaN from 'lodash/isNaN';
import _isBoolean from 'lodash/isBoolean';
export const throwException = err => {
  throw err;
};
export const isBlank = value => _isEmpty(value) && !_isNumber(value) && !_isBoolean(value) || _isNaN(value);
export const Formatter = num => {
  if (Math.abs(num) > 999999) {
    return `${Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1)}M`;
  }

  if (Math.abs(num) > 999) {
    return `${Math.sign(num) * (Math.abs(num) / 1000).toFixed(1)}k`;
  }

  return Math.sign(num) * Math.abs(num);
};
export const MinuteConverter = num => {
  let seconds = (num / 1000).toFixed(0);
  let minutes = Math.floor(seconds / 60);
  let hours = '';

  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hours = hours >= 10 ? hours : `0${hours}`;
    minutes -= hours * 60;
    minutes = minutes >= 10 ? minutes : `0${minutes}`;
  }

  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : `0${seconds}`;

  if (hours !== '') {
    return `${hours} h ${minutes} m ${seconds} s`;
  }

  return `${minutes} m ${seconds} s`;
};
export const SecondConverter = num => {
  const number = num / 1000;
  const disNum = number.toFixed(2);
  return disNum;
};