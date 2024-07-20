
import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import Register from './pages/Register'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Account from './pages/Account'
import FormPage from './pages/FormPage'
import Places from './pages/Places'
import Booking from './pages/Booking'
 
axios.defaults.baseURL='http://localhost:4000'
axios.defaults.withCredentials=true
function App() {

  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<IndexPage />}/>
      <Route path='/login'  element={<LoginPage/>}/>
      <Route path='/register'  element={<Register/>}/>
      <Route path='/account' element={<Account/>}/>
      <Route path='/account/bookings' element={<Booking/>}/>
      <Route path="/account/places"  element={<Places/>}/>
      <Route path="/account/places/new"  element={<FormPage/>}/>

      
      </Route>
     
    </Routes>
    </UserContextProvider>
    
  )
}

export default App
