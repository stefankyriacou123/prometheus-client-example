import { useMetrics } from '../../api-hooks'

function CommentView({ children }: { children: string }) {
  return <div style={{ color: "grey" }}>{children}</div>
}

function NumberView({ children }: { children: string }) {
  return <span style={{ color: 'blue' }}>{children}</span>
}

function EntryView({ children }: { children: string }) {
  const [key, value] = children.split(' ')

  return <div>{key} <NumberView>{value}</NumberView></div>
}

export function MetricsBlock() {
  const { loading, data } = useMetrics()

  if (loading) {
    return <div className="grid-child">Loading...</div>
  } else {
    return <div className="grid-child scrollable data-block">{
      data.split('\n').map((row, index) => {
        if (row.startsWith('#')) return <CommentView key={index}>{row}</CommentView>
        else return <EntryView key={index}>{row}</EntryView>
      })
    }</div>
  }
}
