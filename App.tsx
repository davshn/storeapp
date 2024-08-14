import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/stateManagement/store';
import Nav from './src/navigation/stack';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Nav />
    </Provider>
  );
}

export default App;
