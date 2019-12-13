const apiID = process.env.SERVERLESS_CAPSTONE_APIID
//export const apiEndpoint = `https://${apiID}.execute-api.us-east-1.amazonaws.com/dev/`
export const apiEndpoint = `https://dqjlllb2dl.execute-api.us-east-1.amazonaws.com/dev/`

export const authConfig = {
    domain: 'dev-j8tf1xv0.auth0.com',
    clientId: '9iHdK0cIXsbFURLcYyDNrL1pOOQMI2Lu',
    callbackUrl: 'http://localhost:3000/callback'
}
