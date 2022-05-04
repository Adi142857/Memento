// import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (posts = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return posts;
    // case LIKE:
    //   return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case 'CREATE':
      return posts;
    // case UPDATE:
    //   return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    // case DELETE:
    //   return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};