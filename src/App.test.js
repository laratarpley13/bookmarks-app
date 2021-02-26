import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom';
=======
import { BrowserRouter } from 'react-router-dom'
>>>>>>> context-startingpoint
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
