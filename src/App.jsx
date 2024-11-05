import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import About from './pages/About'
import Home from './pages/Home'
import Footer from './components/Footer'
import Feedback from './pages/Feedback'
import Faq from './pages/Faq'
import UploadFoundItem from './pages/UploadFoundItem'
import UploadLostItem from './pages/UploadLostItem'
import MissingItems from './pages/MissingItems'
import ItemCategory from './pages/ItemCategory'
import ItemGallery from './pages/ItemGallery'
import ItemDetails from './pages/ItemDetails'
import Header from './components/NavBar/NavBar'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import ItemClaims from './pages/ItemClaims'
import LostItemReports from './pages/lostItemReports'
import SideNavbar from './components/SideNavbar'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoutes'
import LostItemDetails from './pages/LostItemDetails'
//import Header from "./components/Header";

function App () {
  const [theme, setTheme] = useState(localStorage.getItem('theme'))
  const toggleTheme = theme => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className='m-0 p-0'>
      <BrowserRouter>
        <SideNavbar toggleTheme={toggleTheme} theme={theme} />
        <Routes className='ml-20'>
          <Route path='/' element={<Home theme={theme} />} />
          <Route path='/home' element={<Home theme={theme} />} />
          <Route path='/signup' element={<SignUp theme={theme} />} />
          <Route path='/signin' element={<SignIn theme={theme} />} />
          <Route path='/about' element={<About theme={theme} />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/profile/:id' element={<Profile theme={theme} />} />
            <Route path='/feedback' element={<Feedback theme={theme} />} />
            <Route path='/faq' element={<Faq theme={theme} />} />
            <Route
              path='/upload-found-item'
              element={<UploadFoundItem theme={theme} />}
            />
            <Route
              path='/upload-lost-item'
              element={<UploadLostItem theme={theme} />}
            />
            <Route
              path='/claims/:itemId'
              element={<ItemClaims theme={theme} />}
            />
            <Route
              path='/lost-reports/:itemId'
              element={<LostItemReports theme={theme} />}
            />

            <Route
              path='/missing-items'
              element={<MissingItems theme={theme} />}
            />
            <Route path='/items' element={<ItemCategory theme={theme} />} />
            <Route
              path='/items/:category'
              element={<ItemGallery theme={theme} />}
            />
            <Route
              path='/lost-items/:id'
              element={<LostItemDetails theme={theme} />}
            />
            <Route
              path='/items/:category/:id'
              element={<ItemDetails theme={theme} />}
            />

            <Route path='/nav' element={<SideNavbar theme={theme} />} />
          </Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
