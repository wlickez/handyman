import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import Layout from "./Components/Layout";
import PrivateRoute from "./Routes/PrivateRoute";
import Categories from "./Pages/Categories/Categories";
import Signup from "./Pages/Signup";
import NewRecordForm from "./Pages/NewRecordForm";
import CategoriesEdit from "./Pages/Categories/CategoriesEdit";

function RootRoute() {
  return localStorage.getItem("token")
    ? <Navigate to="/home" replace />
    : <Login />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRoute />} />
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
          <Route path="/categories/edit/:id" element={<CategoriesEdit/>} />

          <Route path="/services/new" element={<NewRecordForm page="services" />} />
          <Route path="/services/edit/:id" element={<NewRecordForm page="services" />} />

          <Route path="/providers/new" element={<NewRecordForm page="providers" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}