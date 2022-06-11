import React, {
  useEffect,
  useState,
  useMemo
} from 'react';

import CustomTable from '../components/CustomTable';

import { createRowData, createColumnData } from '../utils/FormatUtils';

import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { selectUserList } from '../reducers/userSlice';

import './BookManager.css'

const UserManager = (props:any): JSX.Element => {
  const dispatch = useAppDispatch()
  const userList = useAppSelector(selectUserList)
  const filterList = ['id', 'password']

  const rows = useMemo(() => createRowData(userList, filterList), [userList, filterList])
  
  const columns = useMemo(() => createColumnData(userList, filterList), [userList, filterList])

  return (
    <>
      <main className="container">
        <h2>Welcome to the User Manager!</h2>
        <CustomTable 
          title={'Users'}
          rows={rows} 
          columns={columns}
          data={userList}
        />
      </main>
    </>
  );
}

export default UserManager;