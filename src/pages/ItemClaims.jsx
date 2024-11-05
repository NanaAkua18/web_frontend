import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'
import loadingGIF from '../assets/upload_items/loading.gif'

const ItemClaims = () => {
  const { itemId } = useParams()
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(true)
  const [contact, setContact] = useState('')
  const [open, setOpen] = useState(false)
  const [claimId, setClaimId] = useState(null)
  const [fetch, setFetch] = useState(false)

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

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/claim/${itemId}`)
        setClaims(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching claims:', error)
        setLoading(false)
      }
    }

    fetchClaims()
  }, [itemId, fetch])

  const approveClaim = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/claim/approve/${claimId}`, {
        contact
      })
      console.log(res)
      if (res.status === 200) {
        alert('Claim Approved. Thank you!')
        handleClose()
        setFetch(true)
      }
    } catch (error) {
      console.error('Error approving claim:', error)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setContact('')
  }

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <img src={loadingGIF} alt='loading' width='40px' />
      </div>
    )
  }

  return (
    <div className='container mx-auto p-4 min-h-screen'>
      <h1 className='text-2xl font-bold mb-4 dark:text-white'>
        Claims for Item
      </h1>
      {claims.length === 0 ? (
        <p className='text-center text-xs dark:text-white'>
          No Claims yet for item
        </p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6'>
          {claims.map(claim => (
            <div
              key={claim._id}
              className='dark:text-white dark:bg-custom-bg-200 p-4 rounded-lg shadow mb-4'
            >
              <p className='text-lg'>{claim.claimantEmail}</p>
              <p className='text-sm my-1'>
                <span className='font-semibold'>Contact:</span>{' '}
                {claim.claimantContact}
              </p>
              <p className='my-2'>
                <span className='font-base font-semibold'>Claim Key:</span>{' '}
                {claim.key}
              </p>
              {claim.isApproved ? (
                <p className='text-green-600'>Claim Approved Already</p>
              ) : (
                <Button
                  className='w-full'
                  variant='contained'
                  color='secondary'
                  onClick={() => {
                    setOpen(true)
                    setClaimId(claim._id)
                  }}
                  style={{
                    marginTop: '10px',
                    borderRadius: '20px'
                  }}
                >
                  Approve Claim
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Enter Your Contact Details for the item owner to contact you
        </DialogTitle>
        <DialogContent>
          <TextField
            label='Contact Number'
            name='contact'
            value={contact}
            onChange={e => {
              setContact(e.target.value)
            }}
            required
            fullWidth
            margin='normal'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={approveClaim} variant='contained' color='primary'>
            Send Contact
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ItemClaims
