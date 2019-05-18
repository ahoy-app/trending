import express from 'express'
import verifyUser from './middlewares/verifyHTTPRequest'
import * as MetricsController from './controllers/metrics'

let routes = express.Router()

routes.get('/metrics', verifyUser, MetricsController.getMetrics)

export default routes
