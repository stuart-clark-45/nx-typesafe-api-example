import { ReqOptions, ResOptions, Route } from '@typesafe-api/core';
import { ApiErrorType, DefaultErrorCodes, ExampleApiEndpoint } from '../api';

// Define the all parameters that are required to make the request
export interface HelloWorldReq extends ReqOptions {
  query: {
    yourName: string;
  };
}

// Define the response type we wil receive for the request
export interface HelloWorldResp extends ResOptions {
  body: {
    msg: string;
    date: Date;
  };
  headers: {
    example: string;
  };
}

// Define any error that may be thrown by the endpoint, the default is just `500`
export type HelloWorldErrors = ApiErrorType<DefaultErrorCodes | 400>;

// Create the endpoint definition this type encapsulates the full endpoint spec
export type HelloWorldEndpointDef = ExampleApiEndpoint<
  HelloWorldReq,
  HelloWorldResp,
  HelloWorldErrors
>;

// Define the route at which the endpoint belongs
export const helloWoldRoute: Route<HelloWorldEndpointDef> = {
  method: 'get',
  path: '/hello-world',
};
