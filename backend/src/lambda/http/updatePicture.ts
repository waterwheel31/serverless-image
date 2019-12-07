import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()
const pictureTable = process.env.PICTURES_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
    const parsedBody = JSON.parse(event.body)
    const itemId = parsedBody.id

    const params =  {
        TableName: pictureTable,
        Key: {
            "id": itemId
        },
        UpdateExpression: "SET description = :description, imageURL = :imageURL",
        ExpressionAttributeValues:{
            ":description": parsedBody.description,
            ":imageURL": parsedBody.imageURL
        }
    }

    try{
        await docClient.update(params).promise()
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


