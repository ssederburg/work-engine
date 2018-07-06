import * as config from 'config'

import { HealthCheck } from '../common/healthCheck'
import { ErrorHandler } from '../common/errorHandler'

export class HealthCheckRoute {
    
    public constructor (private server: any, private errorHandler: ErrorHandler) {}

    public init (path: string) {

        this.server.get(path, (req, res, next) => {

            try {
                res.contentType = 'application/json'
                res.header('Content-Type', 'application/json')
            
                const result = HealthCheck.getHealthCheck()
                res.send(200, result)
            
                return next();        
            }
            catch (err) {
                console.error(err)
                res.send(500, this.errorHandler.errorMessage('HealthCheckRoute:Error'))
                return next()
            }

        })

    }

}