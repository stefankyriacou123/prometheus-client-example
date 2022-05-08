import express, { Express, Request, Response } from 'express'
// @ts-ignore TODO add types for prometheus middleware.
import prometheusMiddleware from 'express-prometheus-middleware'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'

const app: Express = express()
const port = 3001

// TODO Add authentication.

app.use(helmet())
app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(prometheusMiddleware({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
}))

app.get('/time', (request: Request, response: Response) => {
  const time = Date.now()

  response.json({ epoch: time })
})

app.listen(port, () => console.log(`Running on port: ${port}`))

export default app
