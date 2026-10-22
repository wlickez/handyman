import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import Layout from "./Components/Layout";
import PrivateRoute from "./Routes/PrivateRoute";
import Categories from "./Pages/Categories";
import Signup from "./Pages/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/categorias" element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}