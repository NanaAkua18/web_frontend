import books from '../assets/upload_items/books_final.jpg'
import devices from '../assets/upload_items/electronic_devices.avif'
import cards from '../assets/upload_items/cards.jpg'
import others from '../assets/upload_items/bottle.jpg'

const categories = {
  cards: {
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
  books: {
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
  electronic_devices: {
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
  others: {
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
}

export default categories
