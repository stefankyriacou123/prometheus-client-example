import { useEffect, useRef } from 'react'

export function useInterval(callback: () => void, timeout: number | null) {
  const savedCallback = useRef(callback)

  useEffect(() => { savedCallback.current = callback })

  useEffect(() => {
    const tick = () => { savedCallback.current() }

    if (timeout) {
      const interval = setInterval(tick, timeout)
      return () => clearInterval(interval)
    }
  }, [timeout])
}
