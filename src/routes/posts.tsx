import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Post as PostComponent } from '../components/Post'
import { Post, getPosts } from '../services/postlist'

export default function Posts() {
  const params = useParams()
  const userName = params.userName!

  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const loadingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((p) => p + 1)
        }
      },
      { threshold: 1.0 }
    )

    let observerRefValue: HTMLDivElement | null = null
    if (loadingRef.current) {
      observer.observe(loadingRef.current)
      observerRefValue = loadingRef.current
    }
    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue)
      }
    }
  }, [hasMore, loadingRef])

  useEffect(() => {
    if (page > 0) {
      getPosts(userName, page, setPosts, setHasMore)
    }
  }, [userName, page])

  return (
    <div className="container">
      <div className="row">
        {posts.map((p) => (
          <PostComponent
            key={p.timestamp}
            className="col-12 col-md-6 col-lg-4"
            post={p}
            username={userName}
          />
        ))}
      </div>
      <div ref={loadingRef}>{hasMore && <div>Loading...</div>}</div>
    </div>
  )
}
