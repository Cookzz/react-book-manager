import React, {
  useState,
  useEffect,

  ChangeEvent
} from 'react'
import { Button } from '@mui/material'
import { useParams, useNavigate } from "react-router-dom";
import { TextField } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUserList } from '../../reducers/userSlice';

import { getLabel, filterObj, isObject } from '../../utils/FormatUtils';

import './BookDetails.css'
import { 
  addBook, 
  updateBook, 
  selectBookList 
} from '../../reducers/bookSlice';

const BookDetails = (props:any): JSX.Element => {
  const [bookData, setData]: any = useState({
    title: '',
    subtitle: '',
    genre: '',
    author: '',
    published_year: '',
    publisher: '',
    owner: undefined
  })

  const params = useParams()
  const userList = useAppSelector(selectUserList)
  const bookList = useAppSelector(selectBookList)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    const { type, id } = params

    if (type === 'update' && id !== null){
      const selectedBook = bookList.find((book: any) => (book.id == Number(id)))

      const filteredBook = filterObj(selectedBook, ['id'])

      if (filteredBook){
        let newBookData: any = {}

        for (const [key, value] of Object.entries(filteredBook) as [any, any]){
          if (key == "owner"){
            newBookData[key] = value.id
          } else {
            newBookData[key] = isObject(value) ? value?.value : value
          }
        }

        setData(newBookData)
      }
    }
  }, [])

  const componentByKey: any = {
    "published_year": (key: string) => (
      <input type="number" id={key} name={key} 
        className='numInput'
        value={bookData[key]}
        onChange={(ev) => { 
          onInputChange(ev, key)
        }} 
      />
    ),
    "owner": (key: string) => (
      <select name={key} id={key} className="selectInput" value={bookData[key]} onChange={(ev) => { 
        onInputChange(ev, key)
      }}>
        <option value={0}> -- select a user -- </option>
        {userList.map((user)=>(
          <option value={user.id}>{user.name}</option>
        ))}
      </select>
    ),
    "default": (key: string) => (
      <input type="text" id={key} name={key} 
        className='textInput'
        value={bookData[key]}
        onChange={(ev) => { 
          onInputChange(ev, key)
        }} 
      />
    )
  }

  const getComponentByKey = (key: string) => {
    const keyComponent = (componentByKey?.[key] || componentByKey["default"])

    return keyComponent(key)
  }

  const onInputChange = (event: ChangeEvent<any> , name: string) => {
    const value = event.target.value;

    if (name === "published_year" && value.length > 4){
      return
    }

    const newData = Object.assign({}, bookData, {
      [name]: value
    })

    setData(newData)
  }

  const onSubmit = () => {
    const { type } = params
    if (type === 'create'){
      dispatch(addBook(bookData))
    } else {
      const { id } = params

      dispatch(updateBook(bookData, id))
    }
    
    navigate(-1)
  }

  const title = (params?.type === 'create' ? 'Create Book' : 'Update Book')
  const label = (params?.type === 'create' ? 'Submit' : 'Update')

  return (
    <>
      <div className="container">
        <h2>{title}</h2>
        <hr />
        <div className="formContainer">
          {Object.keys(bookData).map((key: string, i)=>{
            const component = getComponentByKey(key)

            return (
              <div key={`book_container_${i}`} className="inputContainer">
                <label htmlFor={key} className="inputTitle">{`${getLabel(key)}:`}</label>
                {component}
              </div>
            )
          })}
          <Button 
            size='large' 
            variant="contained"
            onClick={onSubmit}
          >
            {label}
          </Button>
        </div>
      </div>
    </>
  );
}

export default BookDetails;