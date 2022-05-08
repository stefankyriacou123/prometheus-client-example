import { HoursMinutesSeconds } from './types'

// Floor the values for performance, as rounding can be a lot slower.
export const millisecondsToSeconds = (milliseconds: number): number => Math.floor(milliseconds / 1000)

export const secondsToHoursMinutesSeconds = (initialTimeInSeconds: number): HoursMinutesSeconds => {
  // Floor the values for performance, as rounding can be a lot slower.
  const hours = Math.floor(initialTimeInSeconds / 3600)
  const minutes = Math.floor(initialTimeInSeconds % 3600 / 60)
  const seconds = Math.floor(initialTimeInSeconds % 3600 % 3600)

  return {
    hours,
    // We only want the remainder if passed 60.
    minutes: minutes > 60 ? minutes % 60 : minutes,
    seconds: seconds > 60 ? seconds % 60 : seconds,
  }
}

export const formatHoursMinutesSeconds = ({ hours, minutes, seconds }: HoursMinutesSeconds): string => {
  let formattedTime = ''

  formattedTime += hours < 10 ? `0${hours}` : hours.toString()
  formattedTime += ':' + (minutes < 10 ? `0${minutes}` : minutes.toString())
  formattedTime += ':' + (seconds < 10 ? `0${seconds}` : seconds.toString())

  return formattedTime
}
