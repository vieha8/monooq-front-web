const REGEXP = /^[0-9]+$/;
const FLOAT_REGEXP = /^([1-9]\d*|0)(\.\d)?$/;

export const isNumber = val => !Number.isNaN(val) && String(val).match(REGEXP);
export const isFloat = val => !Number.isNaN(val) && String(val).match(FLOAT_REGEXP);
