import { Button } from '@mui/material'
import axios from 'axios'
import { Link } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './ItemGallery.css'
import FoundItemCard from '../components/FoundItemCard'
import ClaimItemCard from '../components/ClaimItemCard'
import LostItemCard from '../components/LostItemCard'
import ReportedItemCard from '../components/ReportedItemCard'
import loadingGIF from '../assets/upload_items/loading.gif'

function Profile () {
  const [claimedItems, setClaimedItems] = useState([])
  const [lostItems, setLostItems] = useState([])
  const [foundItems, setFoundItems] = useState([])
  const [reportedItems, setReportedItems] = useState([])
  const [loading, setLoading] = useState(true)

  const BASE_URL = import.meta.env.VITE_BASE_URL
  const { currentUser } = useSelector(state => state.user)
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
    const fetchData = async () => {
      setLoading(false)
      try {
        const [claimedRes, lostRes, foundRes, reportedRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/claim/profile/${currentUser?._id}`),
          axios.get(`${BASE_URL}/api/lost-items/profile/${currentUser?._id}`),
          axios.get(`${BASE_URL}/api/found-items/profile/${currentUser?._id}`),
          axios.get(`${BASE_URL}/api/report-found/profile/${currentUser?._id}`)
        ])

        console.log('Reported: ', reportedRes.data)

        setClaimedItems(claimedRes.data)
        setLostItems(lostRes.data)
        setFoundItems(foundRes.data)
        setReportedItems(reportedRes.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <img src={loadingGIF} alt='loading' width='40px' />
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
      <nav
        className='relative z-0 flex overflow-hidden'
        aria-label='Tabs'
        role='tablist'
      >
        <button
          type='button'
          className='hs-tab-active:border-b-blue-600  hs-tab-active:text-blue-900 dark:hs-tab-active:text-white relative dark:hs-tab-active:border-b-blue-600 min-w-0 flex-1 border-b-2 hs-tab-active:border-b-4 py-4 px-4 dark:text-white text-sm md:text-xl font-medium text-center overflow-hidden focus:z-10 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none rounded-none active'
          id='bar-with-underline-item-1'
          data-hs-tab='#bar-with-underline-1'
          aria-controls='bar-with-underline-1'
          role='tab'
        >
          Lost
        </button>
        <button
          type='button'
          className='hs-tab-active:border-b-blue-600 hs-tab-active:text-blue-900 relative dark:hs-tab-active:border-b-blue-600 min-w-0 flex-1 border-b-2 hs-tab-active:border-b-4 py-4 px-4 dark:hs-tab-active:text-white dark:text-white  font-medium text-center text-sm md:text-xl overflow-hidden hover:border-b-4 focus:z-10 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none rounded-none'
          id='bar-with-underline-item-2'
          data-hs-tab='#bar-with-underline-2'
          aria-controls='bar-with-underline-2'
          role='tab'
        >
          Found
        </button>
        <button
          type='button'
          className='hs-tab-active:border-b-blue-600 dark:hs-tab-active:text-white hs-tab-active:text-blue-900 relative dark:hs-tab-active:border-b-blue-600 min-w-0 flex-1  border-b-2 hs-tab-active:border-b-4 py-4 px-4 dark:text-white font-medium text-center text-sm md:text-xl overflow-hidden hover:border-b-4 focus:z-10 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none rounded-none'
          id='bar-with-underline-item-3'
          data-hs-tab='#bar-with-underline-3'
          aria-controls='bar-with-underline-3'
          role='tab'
        >
          Claimed
        </button>
        <button
          type='button'
          className='hs-tab-active:border-b-blue-600 dark:hs-tab-active:text-white hs-tab-active:text-blue-900 relative dark:hs-tab-active:border-b-blue-600 min-w-0 flex-1  border-b-2 hs-tab-active:border-b-4 py-4 px-4 dark:text-white font-medium text-center text-sm md:text-xl overflow-hidden hover:border-b-4 focus:z-10 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none rounded-none'
          id='bar-with-underline-item-4'
          data-hs-tab='#bar-with-underline-4'
          aria-controls='bar-with-underline-4'
          role='tab'
        >
          Reported
        </button>
      </nav>

      <div className='mt-3 min-h-screen mb-20 dark:text-white'>
        <div
          id='bar-with-underline-1'
          role='tabpanel'
          aria-labelledby='bar-with-underline-item-1'
        >
          <div
            id='lost-items'
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-5 justify-items-center justify-center'
          >
            {lostItems.length > 0 ? (
              lostItems.map(item => (
                <div key={item._id} className=''>
                  <LostItemCard lostItem={item} />
                </div>
              ))
            ) : (
              <div>You have not reported any lost items yet </div>
            )}
          </div>
        </div>
        <div
          id='bar-with-underline-2'
          className='hidden'
          role='tabpanel'
          aria-labelledby='bar-with-underline-item-2'
        >
          <div
            id='found-items'
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6 justify-items-center justify-center'
          >
            {foundItems.length > 0 ? (
              foundItems.map(item => (
                <div key={item._id}>
                  <FoundItemCard foundItem={item} />
                </div>
              ))
            ) : (
              <div> You have not posted found items</div>
            )}
          </div>
        </div>
        <div
          id='bar-with-underline-3'
          className='hidden'
          role='tabpanel'
          aria-labelledby='bar-with-underline-item-3'
        >
          {/* <h2 className='text-2xl font-semibold px-4'>Your Claimed Items </h2>
          <p className='text-xs italic px-4 pb-3'>Items you claimed as yours</p> */}

          <div
            id='claimed-items'
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6 justify-items-center justify-center'
          >
            {claimedItems.length > 0 ? (
              claimedItems.map(claim => (
                <ClaimItemCard key={claim._id} claim={claim} />
              ))
            ) : (
              <div> You have not claimed any found items </div>
            )}
          </div>
        </div>
        <div
          id='bar-with-underline-4'
          className='hidden'
          role='tabpanel'
          aria-labelledby='bar-with-underline-item-4'
        >
          {/* <h2 className='text-2xl font-semibold px-4'>Your Reported Items </h2>
          <p className='text-xs italic px-4 pb-3'>
            Items you reported as found
          </p> */}

          <div id='reported-items'>
            {reportedItems.length > 0 ? (
              reportedItems.map(report => (
                <div
                  key={report._id}
                  className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6 justify-items-center justify-center'
                >
                  <ReportedItemCard item={report} />
                  {/* <h2 className="text-xl">{report.item.name}</h2>
								<p>{report.item.description}</p> */}
                  {/* Render other report details */}
                </div>
              ))
            ) : (
              <div className='ml-3'>
                {' '}
                You not reported any lost item as found yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
