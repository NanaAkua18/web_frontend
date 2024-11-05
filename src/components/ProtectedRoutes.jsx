/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useSelector(state => state.user)

  return currentUser ? (
    children || <Outlet />
  ) : (
    <Navigate to='/signin' state='Please login to access this page' />
  )
}

export default ProtectedRoute
