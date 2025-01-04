import { ReactContext } from './context/ReactContext'
import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router'

import DashboardLayout from './pages/DashboardLayout';

import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ProfilePage from './pages/auth/ProfilePage';

import CitiesPage from './pages/admin/CitiesPage';
import ExperiencesPage from './pages/admin/ExperiencesPage';

import Home from "./pages/Home";
import CitiesInfo from "./pages/CitiesInfo";
import Experience from "./pages/Experience";
import GetmoreExpPage from "./pages/GetmoreExpPage";
import GetmoreCityPage from "./pages/GetmoreCityPage";
import Allcities from "./pages/Allcities";
import Allexperience from "./pages/Allexperience";
import NotFound from "./pages/NotFound";


function AuthRoutes() {
  const ctx = useContext(ReactContext);
  return (
    ctx.user
    ? <Outlet />
    : <Navigate to="/login" />
  );
}

function UnAuthRoutes() {
  const ctx = useContext(ReactContext);
  return (
    !ctx.user
    ? <Outlet />
    : <Navigate to="/" />
  );
}

function AdminPages() {
  const ctx = useContext(ReactContext);
  return (
    ctx.user.yonetici
    ? <Outlet />
    : <Navigate to="/" />
  );
}

function UserPages() {
  const ctx = useContext(ReactContext);
  return (
    !ctx.user.yonetici
    ? <Outlet />
    : <Navigate to="/" />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/All-cities' element={<Allcities />} />
        <Route path="/" element={<Home />} />
        <Route path="/cities/:cityid" element={<CitiesInfo />} />
        <Route path="/cities/getmore/:feature/:cityid" element={<GetmoreCityPage />} />

        <Route path="/All-experiences" element={<Allexperience />} />
        <Route path="/experience/:experienceName" element={<Experience />} />
        <Route path="/experience/getmore/:experienceName" element={<GetmoreExpPage />} />
        <Route path="/404" element={<NotFound />} />

        <Route element={<AuthRoutes />}>
          <Route path='/' element={<DashboardLayout />} >
            <Route path='profile' element={<ProfilePage />} />
            <Route path='admin' element={<AdminPages />} >
              <Route path='cities' element={<CitiesPage />} />
              <Route path='experiences' element={<ExperiencesPage />} />
            </Route>
            <Route path='' element={<UserPages />} >
              {/* <Route path='sinavlar' element={<SinavlarPage />} />
              <Route path='yeniSinav' element={<YeniSinavPage />} />
              <Route path='sinav/:kategori' element={<SinavPage />} /> */}
            </Route>
          </Route>
        </Route>

        <Route element={<UnAuthRoutes />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
