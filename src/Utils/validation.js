export const validateStatus = {
  required: 'required',
  validateRegEx: 'validateRegEx',
  minLengt: 'minLength',
};

export const validateMobileNo = mobileNo => {
  const numRegExCode = /^[1-9][0-9]{7,12}$/;
  mobileNo = mobileNo.trim();
  if (mobileNo == '' || mobileNo == undefined || mobileNo == null)
    return {status: false, error: validateStatus.required};
  else if (!numRegExCode.test(mobileNo))
    return {status: false, error: validateStatus.validateRegEx};
  else return {status: true, error: ''};
};

export const validateMail = mail => {
  const mailRegExCode = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  mail = mail.trim();
  if (mail == '' || mail == undefined || mail == null)
    return {status: false, error: validateStatus.required};
  else if (!mailRegExCode.test(mail))
    return {status: false, error: validateStatus.validateRegEx};
  else return {status: true, error: ''};
};

export const requirePassword = password => {
  if (password == '' || password == undefined || password == null)
    return {status: false, error: validateStatus.required};
  else return {status: true, error: ''};
};

export const validatePassword = password => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (password == '' || password == undefined || password == null)
    return {status: false, error: validateStatus.required};
  else if (!passwordRegex.test(password))
    return {status: false, error: validateStatus.validateRegEx};
  else return {status: true, error: ''};
};

export const validateConfpassword = (password, confPassword) => {
  if (confPassword == '' || confPassword == undefined || confPassword == null)
    return {status: false, error: validateStatus.required};
  else if (password !== confPassword)
    return {status: false, error: validateStatus.validateRegEx};
  else return {status: true, error: ''};
};

export const validateName = name => {
  const nameRegex = /^[a-zA-Z ]{1,30}$/;
  name = name ? name.trim() : null;
  if (name == '' || name == undefined || name == null)
    return {status: false, error: validateStatus.required};
  else if (!nameRegex.test(name))
    return {status: false, error: validateStatus.validateRegEx};
  else return {status: true, error: ''};
};

export const isEmpty = (value, errMsg) => {
  if (value) {
    return {status: true, error: null};
  } else {
    return {status: false, error: errMsg};
  }
};

export const validateUserName = (value, errMsg1, errMsg2) => {
  const regex = /^[^\d]+$/;
  name = value ? value.trim() : null;
  if (name && regex.test(name)) {
    return {status: true, error: null};
  }
  return value
    ? {status: false, error: errMsg1}
    : {status: false, error: errMsg2};
};
