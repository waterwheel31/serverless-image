import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import { decode } from 'jsonwebtoken'

const docClient = new AWS.DynamoDB.DocumentClient()
const pictureTable = process.env.PICTURES_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
    const parsedBody = JSON.parse(event.body)
    const imageId = parsedBody.imageId
    
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]
    const userId = decode(jwtToken).sub

    const params =  {
        TableName: pictureTable,
        Key: {
            "imageId": imageId,
            "userId": userId
        }
    }

    try{
        await docClient.delete(params).promise()
    } catch (e) {
        return {
            statusCode: 400,
            headers : {'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify(e),
        }
    }

  
    return {
        statusCode: 201,
        headers : {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(params),
    }
}


