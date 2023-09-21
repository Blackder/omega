import { nameOf } from 'src/app/mixins/mixins';
import { toWords } from 'src/app/pipes/app-pipes/words.pipe';
import { Binding } from '../../angular-component.property';

export enum CustomValidationErrorKey {
  bindingFromRequired = 'bindingFromRequired',
  bindingToRequired = 'bindingToRequired',
  bindingToTypeRequired = 'bindingToTypeRequired',
  bindingToTypeOrToValue = 'bindingToTypeOrToValue',
}

export const customValidationErrors: { [key: string]: string } = {};

customValidationErrors[
  CustomValidationErrorKey.bindingFromRequired
] = `"${toWords(nameOf<Binding>('from'))}" is required`;

customValidationErrors[
  CustomValidationErrorKey.bindingToRequired
] = `"${toWords(nameOf<Binding>('to'))}" is required`;

customValidationErrors[
  CustomValidationErrorKey.bindingToTypeRequired
] = `"${toWords(nameOf<Binding>('toType'))}" is required`;

customValidationErrors[
  CustomValidationErrorKey.bindingToTypeOrToValue
] = `If you provide a field to bind to ("${toWords(
  nameOf<Binding>('to')
)}" value), provide also the type of that field ("${toWords(
  nameOf<Binding>('toType')
)}" value). Otherwise, provide a "${toWords(nameOf<Binding>('toValue'))}"`;
