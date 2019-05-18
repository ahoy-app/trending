import express from 'express'
import verifyUser from './middlewares/verifyHTTPRequest'
import * as MetricsController from './controllers/metrics'

let routes = express.Router()

routes.post('/metrics', MetricsController.getMetrics)

export default routes
