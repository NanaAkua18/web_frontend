import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
/* eslint-disable react/prop-types */
import { Button } from '@mui/material'
import loadingGIF from '../assets/upload_items/loading.gif'

const LostItemReports = () => {
  const { itemId } = useParams()
  const [itemReports, setItemReports] = useState([])
  const [loading, setLoading] = useState(true)

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
    const fetchItemReports = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/report-found/lost-report/${itemId}`
        )
        setItemReports(response.data)
        setLoading(false)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching itemReports:', error)
        setLoading(false)
      }
    }

    fetchItemReports()
  }, [itemId, fetch])

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
        Reports for Item
      </h1>
      {itemReports.length === 0 ? (
        <p className='text-center text-xs dark:text-white'>Sorry, No reports yet for item</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6'>
          {itemReports.map(report => (
            <div
              key={report._id}
              className='dark:text-white dark:bg-custom-bg-200 p-4 rounded-lg shadow mb-4'
            >
              <div className=''>
                <p className='text-lg'>{report.item.name}</p>
                <p className='text-sm my-1'>
                  <span className='font-semibold'>Reporter:</span>{' '}
                  {report.owner.name}
                </p>
                <p className='text-sm my-1'>
                  <span className='font-semibold'>Reporter Contact:</span>{' '}
                  {report.reporterContact}
                </p>
                <p className='my-2'>
                  <span className='font-base font-semibold'>Message:</span>{' '}
                  {report.message}
                </p>
                {/* {report.isApproved ? (
								<p className="text-green-600">
									Claim Approved Already
								</p>
							) : ( */}
                <Button
                  className='w-full'
                  variant='contained'
                  color='secondary'
                  href={`tel:${report.reporterContact}`}
                  style={{
                    marginTop: '10px',
                    borderRadius: '20px'
                  }}
                >
                  Call reporter
                </Button>
                {/* )} */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LostItemReports
