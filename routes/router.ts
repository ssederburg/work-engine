import * as config from 'config'
import * as restify from 'restify'
import * as fs from 'fs'
import * as path from 'path'

import { HealthCheckRoute } from './healthCheckRoute'
import { ErrorHandler } from '../common/errorHandler'

export class Router {

    public constructor (private server, private errorHandler: ErrorHandler) {}

    public init(baseUri: string) {

        // Health Check
        // api/health
        const healthCheckRoute = new HealthCheckRoute(this.server, this.errorHandler)
        healthCheckRoute.init(baseUri + 'health')

        /*
            Place all handler routes above this section
            This section is responsible for serving static content AFTER all other routes are handled
            Lastly, there is a handler to gracefully handle 'Resource Not Found' 404 status
        */
        // Check if should serve static
        if (config.serveStaticPath) {
            const sharePath = config.serveStaticPath //e.g. ./public/
            const checkPath = sharePath.startsWith('./') ? path.join(process.cwd(), sharePath) : sharePath
            if (!fs.existsSync(checkPath)) {
                console.error(`Invalid serveStaticPath in config file, directory does not exist: ${checkPath}`)
            } else {
                console.log(`Serving Static content from ${sharePath}`)
                this.server.get('/*', restify.plugins.serveStatic({
                    directory: sharePath,
                    default: './index.html'
                }))
            }
        }

        // Handle 404
        this.server.on('NotFound', (req, res, next) => {
            res.send(404, this.errorHandler.errorMessage(`Unable to locate resource: ${req.url}`))
        })
    }

}