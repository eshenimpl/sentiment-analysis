function isURL(inputText) {
  const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return pattern.test(inputText);
}

function isEmpty(inputText) {
  if (inputText.length === 0) {
    return true;
  }
  return false;
}

export { isURL, isEmpty };
