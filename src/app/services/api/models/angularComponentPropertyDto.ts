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
import { AngularBuildingBlockPropertyDto } from './angularBuildingBlockPropertyDto';
import { OutputDto } from './outputDto';
import { InputDto } from './inputDto';


export interface AngularComponentPropertyDto { 
    componentName?: string;
    _export?: boolean;
    inputs?: Array<InputDto>;
    outputs?: Array<OutputDto>;
    children?: Array<AngularBuildingBlockPropertyDto>;
}

