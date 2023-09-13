import { AbstractControl, FormGroup } from '@angular/forms';
import 'reflect-metadata';

const requiredKey = Symbol('required');
const conditionalRequiredKey = Symbol('conditionalRequired');
const ignoreKey = Symbol('ignore');
const optionsKey = Symbol('options');
const prototypeControlKey = Symbol('prototypeControl');
const validationKey = Symbol('validation');

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

export function conditionalRequired(
  condition: (parentFormValue: any) => boolean
) {
  return Reflect.metadata(conditionalRequiredKey, condition);
}

export function setAsConditionalRequired(
  target: any,
  condition: (parentFormValue: any) => boolean
) {
  return Reflect.defineMetadata(conditionalRequiredKey, condition, target);
}

export function getConditionalRequiredFunction(
  target: any,
  propertyKey?: string
) {
  return propertyKey
    ? Reflect.getMetadata(conditionalRequiredKey, target, propertyKey)
    : Reflect.getMetadata(conditionalRequiredKey, target);
}

export function ignore() {
  return Reflect.metadata(ignoreKey, true);
}

export function shouldIgnore(target: any, propertyKey: string) {
  return Reflect.getMetadata(ignoreKey, target, propertyKey);
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
  condition: (value: any) => boolean;
  message: string;
}

export function validation(validation: Validation) {
  return Reflect.metadata(validationKey, validation);
}

export function setValidation(target: any, validation: Validation) {
  return Reflect.defineMetadata(validationKey, validation, target);
}

export function getValidation(target: any) {
  return Reflect.getMetadata(validationKey, target);
}
