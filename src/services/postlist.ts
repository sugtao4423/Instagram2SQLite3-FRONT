import axios from 'axios'
import { getJsonUrl } from './paths'

export interface Post {
  typename: string
  text: string
  shortcode: string
  medias: string[]
  timestamp: number
}

interface PostResponse {
  typename: string
  text: string
  shortcode: string
  medias: string
  timestamp: number
}

const postResponse2Post = (postResponse: PostResponse): Post => ({
  ...postResponse,
  medias: postResponse.medias.split(','),
})

export const getPostList = async (
  username: string,
  page = 1
): Promise<Post[] | null> => {
  try {
    return (
      await axios.get<PostResponse[]>(getJsonUrl, {
        params: {
          username,
          p: page,
        },
      })
    ).data.map(postResponse2Post)
  } catch (e) {
    console.error(e)
    return null
  }
}
