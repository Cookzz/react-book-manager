import React, {
  useState,
  useEffect,

  ChangeEvent
} from 'react'
import { Button } from '@mui/material'
import { useParams, useNavigate } from "react-router-dom";
import { TextField } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUserList, addUser } from '../../reducers/userSlice';

import { getLabel, isObject, filterObj } from '../../utils/FormatUtils';

import './UserDetails.css'

const UserDetails = (props:any): JSX.Element => {
  const [userData, setData]: any = useState({
    username: "",
    name: "",
    password: "",
    phone: "",
    email: ""
  })

  const params = useParams()
  const userList = useAppSelector(selectUserList)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    const { type, id } = params

    if (type === 'update' && id !== null){
      const selectedUser = userList.find((book) => (book.id === Number(id)))

      const filteredUser = filterObj(selectedUser, ['id'])

      if (selectedUser){
        let newUserData: any = {}

        for (const [key, value] of Object.entries(filteredUser) as [any, any]){
          newUserData[key] = isObject(value) ? value?.value : value
        }

        setData(newUserData)
      }
    }
  }, [])

  const componentByKey: any = {
    "published_year": (key: string) => (
      <input type="number" id={key} name={key} 
        className='numInput'
        value={userData[key]}
        onChange={(ev) => { 
          onInputChange(ev, key)
        }} 
      />
    ),
    "default": (key: string) => (
      <input type="text" id={key} name={key} 
        className='textInput'
        value={userData[key]}
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

    const newData = Object.assign({}, userData, {
      [name]: value
    })

    setData(newData)
  }

  const onSubmit = () => {
    dispatch(addUser(userData))
    navigate(-1)
  }

  const { type } = params
  const title = (type === 'create' ? 'Create Book' : 'Update Book')

  return (
    <>
      <div className="container">
        <h2>{title}</h2>
        <hr />
        <div className="formContainer">
          {Object.keys(userData).map((key: string)=>{
            const component = getComponentByKey(key)

            return (
              <div className="inputContainer">
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
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default UserDetails;