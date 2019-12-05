import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
    const docClient = new AWS.DynamoDB.DocumentClient()
    const pictureTable = process.env.PICTURES_TABLE
    const result = await docClient.scan({
        TableName: pictureTable
    }).promise()

    const pictures = result.Items

    return {
        statusCode: 200,
        headers : {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify({
            items: pictures
        }),
    };
}
