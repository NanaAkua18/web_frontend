/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import image from '../assets/upload_items/bg.jpg'
import dark from '../assets/upload_items/dark.jpg'
import books from '../assets/upload_items/books_final.jpg'
import devices from '../assets/upload_items/electronic_devices.avif'
import cards from '../assets/upload_items/cards.jpg'
import others from '../assets/upload_items/bottle.jpg'

const ItemCategory = () => {
  const navigate = useNavigate()

  const categories = [
    {
      name: 'Cards',
      url: 'cards',
      image: cards,
      subcategories: [
        { name: 'Student ID Card', url: 'student_card' },
        { name: 'ATM Card', url: 'atm_card' },
        { name: "Driver's License", url: 'drivers_license' },
        { name: 'E Zwich Card', url: 'e_zwich' },
        { name: 'Any Other Card', url: 'other_card' }
      ]
    },
    {
      name: 'Books',
      url: 'book',
      image: books,
      subcategories: [
        { name: 'Notebook', url: 'notebook' },
        { name: 'Book', url: 'book' },
        { name: 'Novel', url: 'novel' },
        { name: 'Any Other Book', url: 'other_books' }
      ]
    },
    {
      name: 'Electronic Devices',
      url: 'electronic_devices',
      image: devices,
      subcategories: [
        { name: 'Mobile Phone', url: 'phone' },
        { name: 'Laptop', url: 'laptop' },
        { name: 'Smart Watch', url: 'smart_watch' },
        { name: 'Charger', url: 'charger' },
        { name: 'Any Other Device', url: 'other_electronic_device' }
      ]
    },
    {
      name: 'Others',
      url: 'others',
      image: others,
      subcategories: [
        { name: 'Bottle', url: 'bottle' },
        { name: 'Money', url: 'money' },
        { name: 'Key', url: 'key' },
        { name: 'Any other Item', url: 'other' }
      ]
    }
  ]

  const handleSubcategorySelect = subcategory => {
    navigate(`/items/${subcategory}`)
  }

  const theme = localStorage.getItem('theme')

  // useEffect(() => {
  // 	if (theme !== "dark") {
  // 		document.body.style.background = `url(${image}) `;
  // 		document.body.style.backgroundSize = "cover";
  // 	} else {
  // 		document.body.style.background = `url(${dark}) `;
  // 		document.body.style.backgroundSize = "cover";
  // 	}

  // 	return () => {
  // 		document.body.style.background = null;
  // 	};
  // }, [theme]);

  useEffect(() => {
    document.body.style.background = theme === 'dark' ? '#17153B' : '#eeeeee'

    return () => {
      document.body.style.background = null
    }
  }, [theme])

  return (
    <>
      <div className='min-h-screen' style={{ marginBottom: '150px' }}>
        <h1 className='text-center pt-5 text-3xl font-bold dark:text-gray-100'>
          Select A Category
        </h1>
        <div className='flex flex-wrap justify-center'>
          {categories.map(category => (
            <div
              key={category.name}
              className='relative m-4 w-64 h-64 bg-cover bg-center flex flex-col items-center justify-center group'
              style={{
                backgroundImage: `url(${category.image})`
              }}
            >
              <div className='absolute inset-0 bg-black opacity-50'></div>
              <div className='relative z-10 text-2xl text-white font-bold'>
                {category.name}
              </div>
              <div className='relative z-10 hidden group-hover:block'>
                <div className='flex flex-col space-y-2'>
                  {category.subcategories.map(subcategory => (
                    <Button
                      key={subcategory.name}
                      variant='contained'
                      color='secondary'
                      style={{
                        textTransform: 'none',
                        fontFamily: "'Poppins', sans-serif",
                        borderRadius: '10px'
                      }}
                      onClick={() => handleSubcategorySelect(subcategory.url)}
                    >
                      {subcategory.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ItemCategory
