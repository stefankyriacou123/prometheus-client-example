import { useEffect, useState } from 'react'

import { useTime } from '../../api-hooks'

import { formatHoursMinutesSeconds, millisecondsToSeconds, secondsToHoursMinutesSeconds } from './utils'

export function TimeBlock() {
  const { loading, data } = useTime()
  const [localTime, setLocalTime] = useState(Date.now())

  useEffect(() => {
    setTimeout(() => { setLocalTime(Date.now()) }, 1000)
  })

  const serverTimeInSeconds = millisecondsToSeconds(data.epoch)
  const localTimeInSeconds = millisecondsToSeconds(localTime)
  const timeSinceLastUpdate = secondsToHoursMinutesSeconds(localTimeInSeconds - serverTimeInSeconds)

  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="grid-child">
        <div className="flex-column">
          <p className="flex-child data-row">
            server time (in seconds): {serverTimeInSeconds}
          </p>
          <p className="flex-child data-row">
            time since last update: {formatHoursMinutesSeconds(timeSinceLastUpdate)}
          </p>
        </div>
      </div>
    )
  }
}
