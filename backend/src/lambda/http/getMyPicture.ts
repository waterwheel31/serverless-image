import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import { decode } from 'jsonwebtoken'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
    const docClient = new AWS.DynamoDB.DocumentClient()
    const pictureTable = process.env.PICTURES_TABLE
    
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]
    const userId = decode(jwtToken).sub
        
    
    const result = await docClient.query({
            TableName: pictureTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
            ':userId': userId
            },
        }).promise()
   
    const pictures = result.Items

    return {
        statusCode: 200,
        headers : {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify({
            userID: userId,
            items: pictures
        }),
    }
}
