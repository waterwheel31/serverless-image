

import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import * as uuid from 'uuid'

const docClient = new AWS.DynamoDB.DocumentClient()
const pictureTable = process.env.PICTURES_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
    const itemId = uuid.v4() 
    const parsedBody = JSON.parse(event.body)

    console.log("itemId:", itemId)
    console.log("parsedBody:", parsedBody)

    const newItem = {
      id: itemId, 
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


