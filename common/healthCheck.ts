import { Utilities } from './utilities'

export class HealthCheck {

    public static getHealthCheck() {
        
        //             Get Environment Variable List (  Obfuscate                ,  Remove         )
        const result = Utilities.environmentVariables([],[])
        result.MESSAGE = 'No Rest for Old Men'
        return result;

    }

}
