/**
 * Loading 顯示文字
 * @param { String } type
 * @returns { String }
 */

const loaderHeading = (type: string): string => {
  switch (type) {
    case 'encode':
      return 'Encoding...';
    case 'decode':
      return 'Decoding...';
    default:
      return 'Loading...';
  }
};

export default loaderHeading;
