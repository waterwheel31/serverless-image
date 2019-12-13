import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import * as uuid from 'uuid'
import { decode } from 'jsonwebtoken'

const docClient = new AWS.DynamoDB.DocumentClient()
const pictureTable = process.env.PICTURES_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
    const imageId = uuid.v4() 
    const parsedBody = JSON.parse(event.body)
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]
    const userId = decode(jwtToken).sub
    

    console.log("imageId:", imageId)
    console.log("parsedBody:", parsedBody)

    const newItem = {
      imageId: imageId, 
      userId: userId,
      ...parsedBody
    }

    console.log('parsedBody:', parsedBody)

    await docClient.put({
      TableName: pictureTable,
      Item: newItem
    }).promise()

  
    return {
        statusCode: 201,
        headers : {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify({
            newItem
        }),
    }
}


