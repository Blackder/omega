import { AbstractControl, FormGroup } from '@angular/forms';
import 'reflect-metadata';
import { NonEmptyArray } from 'src/app/mixins/mixins';

const requiredKey = Symbol('required');
const conditionalRequiredKey = Symbol('conditionalRequired');
const hiddenKey = Symbol('hidden');
const hiddenFromDisplayOnlyKey = Symbol('hiddenFromDisplayOnly');
const ignoreKey = Symbol('ignore');
const optionsKey = Symbol('options');
const prototypeControlKey = Symbol('prototypeControl');
const validationKey = Symbol('validation');
const labelKey = Symbol('label');

export function required() {
  return Reflect.metadata(requiredKey, true);
}

export function setRequired(target: any) {
  return Reflect.defineMetadata(requiredKey, true, target);
}

export function isRequired(target: any, propertyKey?: string) {
  return propertyKey
    ? Reflect.getMetadata(requiredKey, target, propertyKey)
    : Reflect.getMetadata(requiredKey, target);
}

export function ignore() {
  return Reflect.metadata(ignoreKey, true);
}

export function shouldIgnore(target: any, propertyKey: string) {
  return Reflect.getMetadata(ignoreKey, target, propertyKey);
}

export function hidden() {
  return Reflect.metadata(hiddenKey, true);
}

export function hide(target: any) {
  return Reflect.defineMetadata(hiddenKey, true, target);
}

export function isHidden(target: any, propertyKey?: string) {
  return propertyKey
    ? Reflect.getMetadata(hiddenKey, target, propertyKey)
    : Reflect.getMetadata(hiddenKey, target);
}

/*
Only hide the value of the control  in display mode (inside the component)
 */
export function hiddenFromDisplayOnly() {
  return Reflect.metadata(hiddenFromDisplayOnlyKey, true);
}

export function hideFromDisplayOnly(target: any) {
  return Reflect.defineMetadata(hiddenFromDisplayOnlyKey, true, target);
}

export function isHiddenFromDisplayOnly(target: any, propertyKey?: string) {
  return propertyKey
    ? Reflect.getMetadata(hiddenFromDisplayOnlyKey, target, propertyKey)
    : Reflect.getMetadata(hiddenFromDisplayOnlyKey, target);
}

export function options(options: any[]) {
  return Reflect.metadata(optionsKey, options);
}

export function setOptions(target: any, options: any[]) {
  return Reflect.defineMetadata(optionsKey, options, target);
}

export function getOptions(target: any, propertyKey?: string) {
  return propertyKey
    ? Reflect.getMetadata(optionsKey, target, propertyKey)
    : Reflect.getMetadata(optionsKey, target);
}

export function setPrototypeControl(target: any, control: AbstractControl) {
  return Reflect.defineMetadata(prototypeControlKey, control, target);
}

export function getPrototypeControl(target: any, propertyKey?: string) {
  return propertyKey
    ? Reflect.getMetadata(prototypeControlKey, target, propertyKey)
    : Reflect.getMetadata(prototypeControlKey, target);
}

export interface Validation {
  key: string;
  condition: (value: any) => boolean;
  forFields: NonEmptyArray<string>;
}

export function validation(validation: Validation) {
  return function validationDecorator(target: any) {
    const existingValidation = Reflect.getMetadata(validationKey, target) ?? [];
    return Reflect.defineMetadata(
      validationKey,
      [...existingValidation, validation],
      target
    );
  };
}

export function setValidations(target: any, validation: Validation[]) {
  return Reflect.defineMetadata(validationKey, validation, target);
}

export function getValidations(target: any): Validation[] {
  return Reflect.getMetadata(validationKey, target);
}

export function label(label: string) {
  return Reflect.metadata(labelKey, label);
}

export function setLabel(target: any, label: string) {
  return Reflect.defineMetadata(labelKey, label, target);
}

export function getLabel(target: any, propertyKey?: string) {
  return propertyKey
    ? Reflect.getMetadata(labelKey, target, propertyKey)
    : Reflect.getMetadata(labelKey, target);
}
