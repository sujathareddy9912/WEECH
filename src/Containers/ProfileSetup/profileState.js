const initialState = {
  name: null,
  gender: null,
  dob: null,
  country: null,
  about: null,

  loading: false,

  //error state
  nameError: null,
  genderError: null,
  dobError: null,
  countryError: null,
  aboutError: null,
};

const Actions = {
  NAME: 'name',
  GENDER: 'gender',
  DOB: 'dob',
  COUNTRY: 'country',
  ABOUT: 'about',
  LOADING: 'loading',

  //Error Actions
  NAMEERROR: 'nameError',
  GENDERERROR: 'genderError',
  DOBERROR: 'dobError',
  COUNTRYERROR: 'countryError',
  ABOUTERROR: 'aboutError',
};

function Reducer(state, action) {
  switch (action.type) {
    case 'name':
      return {
        ...state,
        name: action.payload,
      };
    case 'gender':
      return {
        ...state,
        gender: action.payload,
      };
    case 'dob':
      return {
        ...state,
        dob: action.payload,
      };
    case 'country':
      return {
        ...state,
        country: action.payload,
      };
    case 'about':
      return {
        ...state,
        about: action.payload,
      };
    case 'loading':
      return {
        ...state,
        loading: action.payload,
      };
    case 'nameError':
      return {
        ...state,
        nameError: action.payload,
      };
    case 'genderError':
      return {
        ...state,
        genderError: action.payload,
      };
    case 'dobError':
      return {
        ...state,
        dobError: action.payload,
      };
    case 'countryError':
      return {
        ...state,
        countryError: action.payload,
      };
    case 'aboutError':
      return {
        ...state,
        aboutError: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

export {initialState, Actions, Reducer};
