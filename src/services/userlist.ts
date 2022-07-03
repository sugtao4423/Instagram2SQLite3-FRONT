import axios from 'axios'
import { getJsonUrl } from './paths'

interface UserList {
  users: string[]
}

export const getUserList = async (): Promise<UserList | null> => {
  try {
    return (await axios.get<UserList>(getJsonUrl)).data
  } catch (e) {
    console.error(e)
    return null
  }
}
