import axios from 'axios'
import React from 'react'
import { Path } from './path'

interface UserList {
  users: string[]
}

export const getUserList = async (
  setUsers: React.Dispatch<React.SetStateAction<string[]>>
): Promise<void> => {
  try {
    const res = await axios.get<UserList>(Path.GET_JSON_URL)
    setUsers(res.data.users)
  } catch (e) {
    console.error(e)
  }
}
