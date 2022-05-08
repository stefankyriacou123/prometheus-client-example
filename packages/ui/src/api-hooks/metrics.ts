import { useEffect, useState } from "react"

import { url } from '../constants'
import { DefaultMetrics } from '../models'
import { useInterval } from '../utils'

export function useMetrics(refreshRate: number | null = 30000) {
  const [data, setData] = useState('' as DefaultMetrics)
  const [loading, setLoading] = useState(true)

  useInterval(() => { setLoading(true) }, refreshRate)

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${url}/metrics`)
      const data = await response.text()
      setData(data)
    }

    if (loading) getData().then(() => setLoading(false))
  }, [loading])

  return { loading, data }
}

