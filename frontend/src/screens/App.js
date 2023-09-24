import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Create from './../screens/create-post.js';
import Edit from './../screens/edit-post.js';
import Login from './../screens/login.js';
import Posts from './../screens/read-post.js';

import { GoogleOAuthProvider } from '@react-oauth/google';
import Constants from '../utils/Constants.js';

//rotas
function App() {

  return (
    <GoogleOAuthProvider clientId={Constants.GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} >Login</Route>
          <Route path='/posts' element={<Posts />}>Posts</Route>
          <Route path='/create' element={<Create />}>Create</Route>
          <Route path='/edit/:id' element={<Edit />}>Edit</Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
