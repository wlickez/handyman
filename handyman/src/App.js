import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Login2 from './Pages/Login2';
import PrivateRoute from './Routes/PrivateRoute';
import Services from './Pages/Services';
import Layout from './components/Layout.Component';

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path='/' element={<Login2></Login2>}></Route>

        <Route path='/home' element={
          <PrivateRoute>
            <Layout></Layout>
            <Home></Home>
          </PrivateRoute>
        }>
          <Route path='/servicios' element={
            <PrivateRoute>
              <Layout></Layout>
              <Services></Services>
            </PrivateRoute>
          }></Route>
          <Route path='/taskers'
            element={
              <PrivateRoute>
                <Layout></Layout>
                <Home></Home>
              </PrivateRoute>
            }>
          </Route>
        </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
