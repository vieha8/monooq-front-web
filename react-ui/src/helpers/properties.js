// targetFunction(必須)：対象propertyをfunctionとして設定する。
// fallbackValue(任意)：エラー時に返却する任意の値。未設定の場合はundefinedを返却する。
export const getSafeValue = (targetFunction, fallbackValue) => {
  try {
    const value = targetFunction();
    return value === null || value === undefined ? fallbackValue : value;
  } catch (e) {
    return fallbackValue;
  }
};

export default getSafeValue;
