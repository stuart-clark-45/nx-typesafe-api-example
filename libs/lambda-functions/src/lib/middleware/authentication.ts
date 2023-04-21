import {
  AbstractExampleApiEndpoint,
  throwHttpError,
} from '../../../../api-spec/src';
import { TypesafeApiEvent } from '@typesafe-api/serverless/src/middleware';
import { MiddlewareObj } from '@middy/core';

export const authentication: MiddlewareObj<
  TypesafeApiEvent<AbstractExampleApiEndpoint>
> = {
  before: async (request) => {
    // Use {@code req.get(..)} to get headers in a typesafe way
    // Naive implementation of authentication
    // DONT TRY THIS AT HOME
    if (request.event.typesafeApi.headers.authorization !== 'my-api-key') {
      throwHttpError<AbstractExampleApiEndpoint>(403, 'Unauthorized');
    }
  },
};
