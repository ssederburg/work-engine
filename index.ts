import * as config from 'config'

import { Utilities } from './common/utilities'
import { RouteServer } from './common/server'
import { Router } from './routes/router'
import { ErrorHandler } from './common/errorHandler'

if (!Utilities.preconditionCheck()) {
    console.error('One or more preconditions for startup were not met. Check log for details. Process terminated')
    process.exit(1)
}

const rs = new RouteServer()
console.log('Starting Server')
const server = rs.init()

const errorHandler = new ErrorHandler(server)
const router = new Router(server, errorHandler)
router.init(config.apiPrefix)

rs.start()
