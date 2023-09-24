import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './../screens/login.js';
import Create from './../screens/create-post.js';
import Posts from './../screens/read-post.js';
import Edit from './../screens/edit-or-delete-post.js';

//rotas
function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} >Login</Route>
            <Route path='/posts' element={<Posts />}>Posts</Route>
            <Route path='/create' element={<Create />}>Create</Route>
            <Route path='/edit' element={<Edit />}>Edit</Route>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
