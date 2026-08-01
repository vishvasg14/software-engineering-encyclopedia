// 07 — AWS Lambda (TypeScript with AWS SDK v3)

import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const ddb = new DynamoDBClient({});

export const handler = async (
    event: APIGatewayProxyEvent,
    _context: Context
): Promise<APIGatewayProxyResult> => {
    const userId = event.pathParameters?.id;

    if (!userId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'id required' }),
        };
    }

    try {
        const result = await ddb.send(new GetItemCommand({
            TableName: process.env.TABLE_NAME!,
            Key: { pk: `USER#${userId}`, sk: 'PROFILE' },
        }));

        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'not found' }),
            };
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result.Item),
        };
    } catch (err) {
        console.error('Error:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'internal error' }),
        };
    }
};