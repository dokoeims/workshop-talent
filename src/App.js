import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'

import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Table from './components/Table'

import { fetchData, fetchOrderBookData } from './api'
import { API } from './constants'
import { getBooksOptions } from './helpers'
import { styles } from './styles'


function App() {
  const [availableBooks, setAvailableBooks] = useState([])
  const [booksOptions, setBooksOptions] = useState([])
  const [selectedBook, setSelectedBook] = useState('')
  const [orderBook, setOrderBook] = useState({})

  useEffect(() => {
    async function fetchBooksData(){
      const data = await fetchData(`${API.ROOT}${API.ENDPOINTS.AVAILABLE_BOOKS}`)

      if(!isEmpty(data)){
        setAvailableBooks(data.payload)
        setBooksOptions(getBooksOptions(data))
      }
    }
    
    fetchBooksData()
    
  }, [])

  useEffect(() => {
    console.log('availableBooks', availableBooks)
  }, [availableBooks])
  

  useEffect(() => {
    if(booksOptions.length > 0)
      setSelectedBook(booksOptions[0].value)
  }, [booksOptions])
  
  useEffect(() => {
    async function fetchOrderBook(){
      const data = await fetchOrderBookData(`${API.ROOT}${API.ENDPOINTS.ORDER_BOOK}`, selectedBook)
      console.log('Book: ', data)
      if(!isEmpty(data))
        setOrderBook(data.payload)
    }

    if(selectedBook)
      fetchOrderBook()
  
  }, [selectedBook])
  

  return (
    <Box sx={styles.container}>
      <FormControl>
        <InputLabel id="book">Book</InputLabel>
        <Select
          labelId="book"
          id="book-select"
          value={selectedBook}
          label="Books"
          onChange={event => setSelectedBook(event.target.value)}
          sx={styles.select}
        >
          {
            booksOptions.map(book => <MenuItem key={book.value} value={book.value}>{book.label}</MenuItem>)
          }
        </Select>
      </FormControl>

      { !isEmpty(orderBook) && <Table data={orderBook} /> }
      
    </Box>
  )
}

export default App
