/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ItemDetails.css'
import { Button } from '@mui/material'
import dark from '../assets/upload_items/dark.jpg'
import loading from '../assets/upload_items/loading.gif'
import ClaimItem from '../components/ClaimItem'

const ItemDetails = props => {
  const [fetched, setFetched] = useState(false)
  const [item, setItem] = useState([])
  const [open, setOpen] = useState(false)

  const { id } = useParams()

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
        const response = await fetch(`${BASE_URL}/api/found-items/${id}`, {
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

  // useEffect(() => {
  // 	if (props.theme === "dark") {
  // 		document.body.style.background = `url(${dark}) `;
  // 		document.body.style.backgroundSize = "cover";
  // 	}

  // 	return () => {
  // 		document.body.style.background = null;
  // 	};
  // }, [props.theme]);

  //handle claim

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
                    Place: <span>{item.location_found}</span>
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
                    Date:{' '}
                    <span>
                      {new Date(item.date_found).toLocaleDateString('en-US', {
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
                  Claim Item{' '}
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
      <ClaimItem setOpen={setOpen} open={open} itemId={id} />
    </>
  )
}

export default ItemDetails
