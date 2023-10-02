/**
 * Omega API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface BindingDto { 
    type: BindingDto.TypeEnum;
    from?: object;
    to?: object;
    toType?: string;
    toValue?: object;
}
export namespace BindingDto {
    export type TypeEnum = 'innerText' | 'property' | 'twoWay' | 'event';
    export const TypeEnum = {
        InnerText: 'innerText' as TypeEnum,
        Property: 'property' as TypeEnum,
        TwoWay: 'twoWay' as TypeEnum,
        Event: 'event' as TypeEnum
    };
}


