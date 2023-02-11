import {InjectionToken} from '@angular/core';

export const defaultErrors = {
  required: () => `This field is required to be filled`,
  minlength: ({requiredLength}: any) => `At least ${requiredLength} characters must be entered `,
  maxlength: ({requiredLength}: any) => `Maximum of ${requiredLength} characters must be entered `,
  incorrectPasswordPattern: () => `The password is not secure. The password must be at least 5 and at most 32 characters.`,
  inValidMax: ({max}: any) => `The maximum value for this field is ${max}. `,
  inValidMin: ({min}: any) => `The minimum value for this field is ${min}.`,
  onlyNumbers: () => `You are only allowed to write numbers!`,
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
