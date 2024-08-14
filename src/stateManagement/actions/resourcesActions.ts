export const GET_LIST = 'GET_LIST';
export const GET_SUBCATEGORIES = 'GET_SUBCATEGORIES';
export const GET_CATEGORIES = 'GET_CATEGORIES';

export interface resources {
  list: any;
  subcategories: any;
  categories: any;
}

export function getList(list: resources) {
  return {
    type: GET_LIST,
    payload: list,
  };
}

export function getSubcategories(subcategories: resources) {
  return {
    type: GET_SUBCATEGORIES,
    payload: subcategories,
  };
}

export function getCategories(categories: resources) {
  return {
    type: GET_CATEGORIES,
    payload: categories,
  };
}
