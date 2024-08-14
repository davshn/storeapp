import { legacy_createStore as  createStore } from 'redux';
// ...

import rootReducers from './reducers/combineReducers';

export const store = createStore(rootReducers);

// export const store = configureStore({
//   reducer: {

//   }
// })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
