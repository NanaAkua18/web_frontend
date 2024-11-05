/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './ItemGallery.css'
import { Button } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import loading from '../assets/upload_items/loading.gif'
import dark from '../assets/upload_items/dark.jpg'
import ClaimItem from '../components/ClaimItem'

const ItemGallery = props => {
  const [spinner, setSpinner] = useState(true)
  const [Items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [currentItemId, setCurrentItemId] = useState(false)

  const { category } = useParams()

  const BASE_URL = import.meta.env.VITE_BASE_URL

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

  useEffect(() => {
    async function fetchData () {
      try {
        const response = await fetch(
          `${BASE_URL}/api/found-items/category/${category}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        const res = await response.json()
        setItems(res)
        console.log(res)
      } catch (error) {
        console.log(error.message)
      } finally {
        setSpinner(false) // Hide the spinner after data is fetched
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (props.theme === 'dark') {
      document.body.style.background = `url(${dark}) `
      document.body.style.backgroundSize = 'cover'
    }

    return () => {
      document.body.style.background = null
    }
  }, [props.theme])

  return (
    <div className='min-h-screen'>
      <h1
        className='text-center text-3xl'
        style={{
          color: `${props.theme === 'dark' ? '#f5f5f5' : '#333'}`
        }}
      >
        Items Gallery - {cats[category]}
      </h1>
      {spinner ? (
        <div className='flex items-center justify-center mt-20'>
          <img src={loading} alt='loading' width='40px' />
        </div>
      ) : Items.length === 0 ? (
        <div className='text-center mt-4 dark:text-white'>No items found in this category </div>
      ) : null}
      <div
        className='d-flex flex-wrap justify-content-center my-3'
        style={{ paddingBottom: '150px' }}
      >
        {Items.length > 0 ? (
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-6'>
            {Items.map(item => (
              <div className='card-container' key={item._id}>
                <div className='relative w-64 bg-white rounded-lg shadow-lg overflow-hidden'>
                  <img
                    src={item.itemImages[0]}
                    alt='item'
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 flex flex-col justify-between sm:p-3'>
                    <div className='date-container text-center text-white text-sm p-2 bg-opacity-75 rounded-lg'>
                      {new Date(item.date_found).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className='button-container flex justify-between'>
                      <Button
                        className='custom-button'
                        size='small'
                        variant='contained'
                        component={Link}
                        to={`/items/${item.subcategory}/${item._id}`}
                      >
                        <p className='sm:hidden'>Details</p>
                        <p className='hidden sm:block'>See Details</p>
                      </Button>
                      <Button
                        className='custom-button ml-2'
                        size='small'
                        variant='contained'
                        onClick={() => {
                          setCurrentItemId(item._id)
                          setOpen(true)
                        }}
                      >
                        <p className='sm:hidden'>Claim</p>
                        <p className='hidden sm:block'>Claim Item</p>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <ClaimItem open={open} setOpen={setOpen} itemId={currentItemId} />
    </div>
  )
}

export default ItemGallery
