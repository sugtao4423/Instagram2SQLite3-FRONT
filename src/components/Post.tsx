import { Path } from '../services/path'
import { Post as PostType } from '../services/postlist'
import { GraphImage, GraphSidecar, GraphVideo } from './Graphs'

interface PostProps {
  className?: string
  post: PostType
  username: string
}

export const Post = ({ className, post, username }: PostProps) => {
  const paths = post.medias.map((m) => Path.media(username, m))

  return (
    <div className={`post ${className ?? ''}`}>
      {post.typename === 'GraphImage' && <GraphImage src={paths[0]} />}
      {post.typename === 'GraphVideo' && <GraphVideo src={paths[0]} />}
      {post.typename === 'GraphSidecar' && <GraphSidecar medias={paths} />}

      <div>
        <p className="post__text">{post.text}</p>
      </div>
    </div>
  )
}
