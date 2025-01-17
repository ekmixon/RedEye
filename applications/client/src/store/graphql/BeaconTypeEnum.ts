/* This is a mk-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
import { types, prop, tProp, Model, Ref } from 'mobx-keystone';

/**
 * Typescript enum
 */

export enum BeaconType {
	DNS = 'DNS',
	HTTP = 'HTTP',
	HTTPS = 'HTTPS',
	SMB = 'SMB',
}

/**
 * BeaconType
 *
 * The communication type used by the beacon
 */
export const BeaconTypeEnumType = types.enum(BeaconType);
