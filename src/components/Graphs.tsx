interface SrcProps {
  src: string
}

interface GraphSidecarProps {
  medias: string[]
}

export const GraphImage = (props: SrcProps) => {
  return (
    <div>
      <a href={props.src} target="_blank" rel="noopener noreferrer">
        <img src={props.src} />
      </a>
    </div>
  )
}

export const GraphVideo = (props: SrcProps) => {
  return (
    <div>
      <video src={props.src} controls />
    </div>
  )
}

export const GraphSidecar = (props: GraphSidecarProps) => {
  const isVideo = (mediaUrl: string) => mediaUrl.endsWith('.mp4')

  return (
    <div className="graph-sidecar">
      {props.medias.map((m) => (
        <div key={m}>
          {isVideo(m) ? <GraphVideo src={m} /> : <GraphImage src={m} />}
        </div>
      ))}
    </div>
  )
}
