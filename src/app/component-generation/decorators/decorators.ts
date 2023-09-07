import { AbstractControl, FormGroup } from '@angular/forms';
import 'reflect-metadata';

const requiredKey = Symbol('required');
const typeKey = Symbol('type');
const ignoreKey = Symbol('ignore');
const optionsKey = Symbol('options');
const prototypeControlKey = Symbol('prototypeControl');

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
