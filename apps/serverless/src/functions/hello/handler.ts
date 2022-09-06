import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import { formatJSONResponse } from '../../utils/api-gateway';
import { addMiddleware } from '../../utils/middleware';

// TODO
type Body = unknown;

const hello: Handler<APIGatewayProxyEvent<Body>, APIGatewayProxyResult> = async (event) => {
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = addMiddleware(hello);
