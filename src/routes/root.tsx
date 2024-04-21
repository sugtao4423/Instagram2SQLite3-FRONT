import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserList } from '../services/userlist'

export default function Root() {
  const [users, setUsers] = useState<string[]>([])

  useEffect(() => {
    getUserList(setUsers)
  }, [])

  return (
    <div className="user-list-wrapper">
      <div className="user-list">
        <ul>
          {users.map((user) => (
            <li key={user}>
              <Link to={user}>{user}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
