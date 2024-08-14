import {
  GET_CATEGORIES,
  GET_LIST,
  GET_SUBCATEGORIES,
  resources,
} from '../actions/resourcesActions';

const initialState: resources = {
  list: [],
  subcategories: [],
  categories: [],
};

function resourcesReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {...state, categories: action.payload};
    case GET_LIST:
      return {...state, list: action.payload};
    case GET_SUBCATEGORIES:
      return {...state, subcategories: action.payload};
    default:
      return state;
  }
}

export default resourcesReducer;
