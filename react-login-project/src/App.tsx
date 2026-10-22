import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import Layout from "./Components/Layout";
import PrivateRoute from "./Routes/PrivateRoute";
import Categories from "./Pages/Categories";
import Signup from "./Pages/Signup";
import NewRecordForm from "./Pages/NewRecordForm";

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
          <Route path="/categories/new" element={<NewRecordForm page="categories" />} />
          <Route path="/services/new" element={<NewRecordForm page="services" />} />
          <Route path="/providers/new" element={<NewRecordForm page="providers" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}