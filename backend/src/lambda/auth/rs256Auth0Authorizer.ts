
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify } from 'jsonwebtoken'
import * as AWS from 'aws-sdk'

//const cert = process.env.AUTH_0_CERTIFIATE


const certdata = ``

const secretManager = new AWS.SecretsManager()
const secretId = process.env.AUTH_0_SECRET_ID
const secretField = process.env.AUTH_0_SECRET_FIELD

let cachedSecret: string
let cert: string


export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  console.log('cert:',cert)
  console.log('event:', event)
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    console.log('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    console.log('User not authorized', e.message)

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader: string) {
  console.log('veryfying the token')
  console.log('authHeader:',authHeader)
  if (!authHeader)
    throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  const certObject: any = await getSecret()
  cert = certObject[secretField].replace(" ", "\n")
  cert = certdata

  console.log('token:',token)
  console.log('cert:',cert)

  const result = verify(token, cert, { algorithms: ['RS256'] }) 
  console.log('result:', result)

  return result 
}


async function getSecret(){
  //if (cachedSecret) return cachedSecret

  const data = await secretManager.getSecretValue({SecretId: secretId}).promise()
  cachedSecret = data.SecretString
  console.log('cachedSecret:', cachedSecret)
  return JSON.parse(cachedSecret)
}