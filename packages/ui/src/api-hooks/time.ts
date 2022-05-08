import { useEffect, useState } from 'react'

import { Time } from '../models'
import { url } from '../constants'
import { useInterval } from '../utils'

export function useTime(refreshRate: number | null = 30000) {
  const [data, setData] = useState({} as Time)
  const [loading, setLoading] = useState(true)

  useInterval(() => { setLoading(true) }, refreshRate)

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${url}/time`)
      setData(await response.json())
    }

    if (loading) getData().then(() => setLoading(false))
  }, [loading])

  return { loading, data }
}
