/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ItemDetails.css'
import dark from '../assets/upload_items/dark.jpg'
import loading from '../assets/upload_items/loading.gif'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'
import { useSelector } from 'react-redux'

const LostItemDetails = props => {
  const [fetched, setFetched] = useState(false)
  const [item, setItem] = useState([])
  const [open, setOpen] = useState(false)
  const [spinner, setSpinner] = useState(true)
  const [error, setError] = useState('')
  const [reportFound, setReportFoundData] = useState({
    email: '',
    contact: '',
    reference: '',
    message: ''
  })

  const { id } = useParams()

  const navigate = useNavigate()

  const { currentUser } = useSelector(state => state.user)

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

  // API call
  useEffect(() => {
    async function fetchData () {
      try {
        const response = await fetch(`${BASE_URL}/api/lost-items/${id}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        console.log(data)
        setItem(data)
        setFetched(true)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setReportFoundData({
      ...reportFound,
      [name]: value
    })
  }

  const handleClose = () => {
    setOpen(false)
    setReportFoundData({
      contact: '',
      message: ''
    })
  }

  const handleSubmit = async () => {
    setError('')
    if (!reportFound.message || !reportFound.contact) {
      setError('All fields are required!')
      return
    }
    try {
      const response = await fetch(`${BASE_URL}/api/report-found/add/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + currentUser.accessToken
        },
        body: JSON.stringify(reportFound)
      })
      const result = await response.json()
      console.log(result)
      if (response.ok) {
        alert('Item report success')
        const matched = response.data.matched

        if (matched != []) {
          alert(
            'You got lucky! There is a matched item. Click on to proceed to the item'
          )
          navigate(`/lost-items/${matched._id}`)
        }
        //setOpen(false)
      } else {
        console.error('Failed to report item')
      }
      handleClose()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      {fetched ? (
        <div
          className='card-wrapper  dark:text-white'
          style={{ marginBottom: '150px' }}
        >
          <div className='cards'>
            <div className='image'>
              <img src={item.itemImages[0]} alt='item' />
            </div>
            <div className='content'>
              <h2 className={`title`}>{item.name}</h2>

              <div className='detail'>
                <div className='flex items-center pt-4'>
                  <h2 className='text-2xl'>Description: </h2>
                  <p className='pl-2'>{item.description}</p>
                </div>
                <ul>
                  <li
                    style={{
                      paddingBottom: '1rem',
                      paddingTop: '1rem'
                    }}
                  >
                    <i
                      className='fa-solid fa-location-dot'
                      style={{
                        color: 'red',
                        fontSize: '30px',
                        paddingRight: '1rem'
                      }}
                    ></i>{' '}
                    Place Lost: <span>{item.location_lost}</span>
                  </li>
                  <li style={{ paddingBottom: '1rem' }}>
                    <i
                      className='fa-solid fa-calendar-days'
                      style={{
                        color: 'red',
                        fontSize: '30px',
                        paddingRight: '1rem'
                      }}
                    ></i>{' '}
                    Date Lost:{' '}
                    <span>
                      {new Date(item.date_lost).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </li>
                </ul>
              </div>

              <div className='info'>
                <Button
                  className='bt'
                  style={{
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    borderRadius: '10px'
                  }}
                  variant='contained'
                  color='secondary'
                  onClick={() => {
                    setOpen(true)
                  }}
                >
                  {' '}
                  Report Item as Found{' '}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex min-h-screen items-center justify-center'>
          <img src={loading} alt='loading' width='40px' />
        </div>
      )}
      ;
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Your Contact Number and Message</DialogTitle>
        {error && (
          <div className='bg-red-700 text-white rounded-md py-2 px-1 text-center mx-3'>
            {error}
          </div>
        )}
        <DialogContent>
          <TextField
            label='Contact Number'
            name='contact'
            value={reportFound.contact}
            onChange={handleChange}
            required
            fullWidth
            margin='normal'
          />
          <TextField
            label='Write some message to the item owner'
            placeholder='Write some message to the item owner. It could be location to collect item or anything'
            value={reportFound.message}
            name='message'
            onChange={handleChange}
            multiline
            rows={3}
            required
            fullWidth
            margin='normal'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant='contained' color='primary'>
            Report
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LostItemDetails
