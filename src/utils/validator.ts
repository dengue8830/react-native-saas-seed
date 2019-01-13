import * as validator from 'validator';
import moment from 'moment';

export class ValidatorUtil {
  static isCurrency(value: string): boolean {
    if (!value) {
      return false;
    }
    if (value.includes(',')) {
      return false;
    }
    const split = value.split('.');
    if (split.length === 2) {
      // 2 decimales max
      if (split[1].length > 2) {
        return false;
      }
      // 3 enteros max
      if (split[0].length > 3) {
        return false;
      }
    } else {
      // 3 enteros max
      if (value.length > 3) {
        return false;
      }
    }

    if (isNaN(Number(value))) {
      return false;
    }
    return true;
  }

  static isPositiveCurrency(value: string): boolean {
    return this.isCurrency(value) && Number(value) > 0;
  }

  static isInteger(value: string): boolean {
    // console.log('value es', value);
    if (!value) {
      return false;
    }
    if (value.includes(',')) {
      return false;
    }
    if (isNaN(Number(value))) {
      return false;
    }
    if (!this.isIntegerNum(Number(value))) {
      return false;
    }
    return true;
  }

  static isPositiveInteger(value: string): boolean {
    return this.isInteger(value) && Number(value) > 0;
  }

  static isPositiveIntegerOrZero(value: string): boolean {
    return !ValidatorUtil.isEmpty(value)
      && (Number(value) === 0 || (this.isInteger(value) && Number(value) > 0));
  }

  static isIntegerNumStr(num: string): boolean {
    return this.isIntegerNum(Number(num));
  }

  static isIntegerNum(num: number): boolean {
    return num === Math.floor(num);
  }

  static isEmpty(value: string): boolean {
    return validator.isEmpty(validator.trim(value));
  }

  static isEmail(value: string): boolean {
    return validator.isEmail(value);
  }

  static isTime(value: string): boolean {
    return /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(value);
  }

  static isDate(value: string): boolean {
    return moment(value, 'DD/MM/YYYY', true).isValid();
  }

  static exists(value: any): boolean {
    return value === 0 || !!value;
  }
}