import {Injectable} from '@angular/core';
import {AbstractControl, ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class ValidatorsService {

  constructor() {
  }

  required(skipWhiteSpaceValidation?: any): ValidatorFn {
    return (currentControl: AbstractControl): { [key: string]: any } | null => {
      let isValid;
      if (currentControl.value !== null && currentControl.value !== undefined) {
        if (currentControl.value === false || currentControl.value === true) {
          isValid = true;
        } else {
          if (skipWhiteSpaceValidation === true) {
            isValid = String(currentControl.value).length > 0;
          } else {
            isValid = String(currentControl.value).trim().length > 0;
          }
        }

      } else {
        isValid = false;
      }
      if (!isValid) {
        return {
          required: {
            valid: false
          }
        }
      } else {
        return null;
      }
    };
  }

  minLength(minLength: any, skipWhiteSpaceValidation?: any): ValidatorFn {
    return (currentControl: AbstractControl): { [key: string]: any } | null => {
      let isValid;
      if (skipWhiteSpaceValidation === true) {
        isValid = String(currentControl.value).length >= minLength;
      } else {
        isValid = String(currentControl.value).trim().length >= minLength;
      }
      if (!isValid) {
        return {
          minlength: {
            actualLength: skipWhiteSpaceValidation ? String(currentControl.value).length : String(currentControl.value).trim().length,
            requiredLength: minLength,
            valid: false
          }
        };
      } else {
        return null;
      }
    };
  }

  password(): ValidatorFn {
    return (currentControl: AbstractControl): { [key: string]: any } | null => {
      // const passwordRegEx: RegExp = new RegExp('^(?=^.{8,}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s)[0-9a-zA-Z!@#$%^&*()]*$');
      let isValid = false;
      if (currentControl.value.length >= 8 && currentControl.value.length <= 32) {
        isValid = true;
      }
      if (!isValid) {
        return {
          incorrectPasswordPattern: {
            valid: false
          }
        };
      } else {
        return null;
      }
    }
  }
}
