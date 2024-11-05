/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material'
import './MissingItems.css'
import no_image from '../assets/missing_items/no-image.png'
import loading from '../assets/missing_items/loading.gif'
import dark from '../assets/about-bg.gif'
import { useSelector } from 'react-redux'

const MissingItems = props => {
  const [fetched, setFetched] = useState(false)
  const [lostItems, setItems] = useState([])
  const [spinner, setSpinner] = useState(true)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [currentItemId, setCurrentItemId] = useState(null)
  const [reportFound, setReportFoundData] = useState({
    email: '',
    contact: '',
    reference: '',
    message: ''
  })
  // API call

  const cats = {
    student_card: 'Student ID Card',
    atm_card: 'ATM Card',
    drivers_license: "Driver's License",
    e_zwich: 'E Zwich Card',
    other_card: 'Any Other Card',
    notebook: 'Notebook',
    book: 'Book',
    novel: 'Novel',
    other_books: 'Any Other Book',
    phone: 'Mobile Phone',
    laptop: 'Laptop',
    smart_watch: 'Smart Watch',
    charger: 'Charger',
    other_electronic_device: 'Any Other Device',
    bottle: 'Bottle',
    money: 'Money',
    key: 'Key',
    other: 'Other Items'
  }

  const BASE_URL = import.meta.env.VITE_BASE_URL
  const { currentUser } = useSelector(state => state.user)
  const theme = localStorage.getItem('theme')

  useEffect(() => {
    async function fetchData () {
      try {
        const response = await fetch(`${BASE_URL}/api/lost-items/`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json()
        setItems(json)
        console.log(json)
        setFetched(true)
      } catch (error) {
        console.log(error.message)
      } finally {
        setSpinner(false) // Hide the spinner after data is fetched
      }
    }
    fetchData()
  }, [])

  // useEffect(() => {
  // 	if (theme === "dark") {
  // 		document.body.style.backgroundImage = `url(${dark})`;
  // 		document.body.style.backgroundSize = "contain";
  // 	} else {
  // 		document.body.style.backgroundImage =
  // 			"linear-gradient(to right top, rgb(101 173 191), rgb(237 242 243))";
  // 	}
  // 	return () => {
  // 		document.body.style.backgroundImage = null;
  // 	};
  // }, [theme]);

  useEffect(() => {
    document.body.style.background = theme === 'dark' ? '#17153B' : '#f5f5f5'

    return () => {
      document.body.style.background = null
    }
  }, [theme])

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
      const response = await fetch(
        `${BASE_URL}/api/report-found/add/${currentItemId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + currentUser.accessToken
          },
          body: JSON.stringify(reportFound)
        }
      )
      const result = await response.json()
      console.log(result)
      if (response.ok) {
        alert('Item report success')
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
      <div className='min-h-screen'>
        <h1 className='text-center text-3xl dark:text-gray-100'>
          Help Us Find
        </h1>

        {spinner && (
          <div className='flex items-center justify-center mt-20 mb-96'>
            <img src={loading} alt='loading' width='40px' />
          </div>
        )}
        {fetched && (
          <div className='cards-container'>
            {lostItems.map(item => (
              <div
                key={item._id}
                className='card text-gray-800 dark:bg-custom-bg-200 dark:text-gray-100'
                // style={{
                // 	backgroundColor: `${
                // 		theme === "dark"
                // 			? "#3b3874"
                // 			: "whitesmoke"
                // 	}`,
                // 	color: `${
                // 		theme === "dark" ? "#f5f5f5" : "#333"
                // 	}`,
                // }}
              >
                <CardMedia
                className='max-h-46'
                  component='img'
                  height='150px'
                  image={item.itemImages[0]}
                  alt={item.name}
                />

                <CardContent>
                  <p className='text-xl font-semibold'>
                    {cats[item.subcategory]}
                  </p>
                  <p className='text-md'>{item.description}</p>

                  <Button
                    className='w-full'
                    variant='contained'
                    color='primary'
                    size='small'
                    style={{
                      marginTop: '10px',
                      borderRadius: '20px'
                    }}
                    href={`tel:${item.contact}`}
                  >
                    Call {item.contact}
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentItemId(item._id)
                      setOpen(true)
                    }}
                    className='w-full'
                    size='small'
                    style={{
                      marginTop: '10px',
                      borderRadius: '20px'
                    }}
                    variant='contained'
                    color='secondary'
                  >
                    {' '}
                    REPORT AS FOUND{' '}
                  </Button>
                </CardContent>
              </div>
            ))}
          </div>
        )}
        {!spinner && (
          <div className='text-center my-5 pt-5'>
            <h4>No items to display ...</h4>
          </div>
        )}
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
      </div>
    </>
  )
}

export default MissingItems
