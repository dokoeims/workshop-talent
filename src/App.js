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
    if(booksOptions.length > 0)
      setSelectedBook(booksOptions[0].value)
  }, [booksOptions])
  
  useEffect(() => {
    let interval

    async function fetchOrderBook(){
      const data = await fetchOrderBookData(`${API.ROOT}${API.ENDPOINTS.ORDER_BOOK}`, selectedBook)
      
      if(!isEmpty(data))
        setOrderBook(data.payload)
    }

    if(selectedBook){
      fetchOrderBook()
      interval = setInterval(fetchOrderBook, 2000)
    }

    return () => {
      clearInterval(interval)
      setOrderBook({})
    }
  
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

      <Table data={orderBook} />
      
    </Box>
  )
}

export default App
