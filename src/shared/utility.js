export const updateObject = (oldObject, updatedProp) => {
  return {
    ...oldObject,
    ...updatedProp,
  };
};

export const checkValidity = (value, rules) => {
  const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const isNumericPattern = /^\d+$/;
  if (rules.required && value.trim() === "") {
    return false;
  }
  if (rules.minLength && value.length < rules.minLength) {
    return false;
  }
  if (rules.maxLength && value.length > rules.maxLength) {
    return false;
  }
  if (rules.isEmail && !emailPattern.test(value)) {
    return false;
  }
  if (rules.isNumeric && !isNumericPattern.test(value)) {
    return false;
  }
  return true;
};
