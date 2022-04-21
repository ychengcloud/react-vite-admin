export const Object2GetParams = (param: any) => {
  return JSON.stringify(param)
    .replace(/:/g, '=')
    .replace(/,/g, '&')
    .replace(/{/g, '?')
    .replace(/}/g, '')
    .replace(/"/g, '');
};
