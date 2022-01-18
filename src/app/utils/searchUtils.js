/*eslint-disable*/
export const parseSearchInput = (e, key) => {
  if (!e.target.value) {
    return null;
  }
  let text = e.target.value?.trim()
  return text.length ? `${key}=${text.replaceAll(' ', '%20')}` : '';
};
