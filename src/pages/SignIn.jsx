import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/features/user/userSlice'
import { Button } from '@mui/material'

const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    reference: '',
    password: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const BASE_URL = import.meta.env.VITE_BASE_URL
  const theme = localStorage.getItem('theme')

  useEffect(() => {
    if (theme !== 'dark') {
      document.body.style.background = theme === 'dark' ? '#17153B' : '#f5f5f5'
    } else {
      document.body.style.background = '#17153B'
    }
    // document.body.style.backgroundSize = 'cover';
    return () => {
      document.body.style.background = null
    }
  }, [theme])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${BASE_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const result = await response.json()

      if (response.status === 200) {
        dispatch(loginUser(result.user))
        setLoading(false)
        navigate('/')
      }
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong!')
      }
      alert('Sign in successful!')
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='flex items-center justify-center h-screen w-full px-5 sm:px-0'>
        <div className='flex dark:bg-custom-bg-200 dark:text-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-5xl w-full'>
          <div
            className='hidden md:block lg:w-1/2 bg-cover bg-purple-950'
            style={{
              backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`
            }}
          ></div>
          <div className='w-full p-8 lg:w-1/2'>
            <p className='text-xl text-gray-600 dark:text-white text-center'>
              Welcome back!
            </p>
            <form onSubmit={handleSubmit}>
              {error && <p className='mt-4 text-red-500 text-sm'>{error}</p>}
              <div className='mt-4'>
                <label className='block text-gray-700 dark:text-white text-sm font-bold mb-2'>
                  Reference Number
                </label>
                <input
                  className='text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-purple-950'
                  type='text'
                  placeholder='Enter a reference number'
                  name='reference'
                  id='reference'
                  value={formData.reference}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mt-4 flex flex-col justify-between'>
                <div className='flex justify-between'>
                  <label className='block text-gray-700 dark:text-white text-sm font-bold mb-2'>
                    Password
                  </label>
                </div>
                <input
                  className='text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-purple-950'
                  type='password'
                  placeholder='Enter your password'
                  name='password'
                  id='password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mt-8'>
                <Button
                  className='sign-out-button w-full' // Use the same class name as the "Sign Out" button
                  variant='contained'
                  color='secondary'
                  type='submit'
                  disabled={loading}
                  style={{
                    textTransform: 'none',
                    borderRadius: '20px',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1.1rem'
                  }}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </div>
            </form>
            <div className='mt-4 flex items-center w-full text-center'>
              <Link
                to='/signup'
                className='text-xs text-gray-500 dark:text-white capitalize text-center w-full'
              >
                Don&apos;t have an account yet?
                <span className='text-blue-700 text-base'> Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn