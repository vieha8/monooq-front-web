export const isTrimmedEmpty = val => !val || val.trim().length === 0;
export const isBelowTrimmedLimit = (val, limit) => val.trim().length <= limit;
