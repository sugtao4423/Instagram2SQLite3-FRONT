import axios from 'axios'
import { Path } from './path'

export interface Post {
  typename: 'GraphImage' | 'GraphVideo' | 'GraphSidecar'
  text: string
  shortcode: string
  medias: string[]
  timestamp: number
}

interface PostResponse extends Omit<Post, 'medias'> {
  medias: string
}

export const getPosts = async (
  username: string,
  page = 1,
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  try {
    const res = await axios.get<PostResponse[]>(Path.GET_JSON_URL, {
      params: {
        username,
        p: page,
      },
    })
    const posts = res.data.map(
      (d): Post => ({
        ...d,
        medias: d.medias.split(','),
      })
    )
    setPosts((prevPosts) => [...prevPosts, ...posts])
    setHasMore(posts.length > 0)
  } catch (e) {
    console.error(e)
  }
}
