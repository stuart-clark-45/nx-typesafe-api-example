import { TypesafeApiSeverlessFnc, relativeToCWD } from '@typesafe-api/serverless';
import {
  helloWoldRoute,
  HelloWorldEndpointDef,
} from '../../../../../../libs/api-spec/src';

export const helloWorldFunctionDef: TypesafeApiSeverlessFnc<HelloWorldEndpointDef> =
  {
    route: helloWoldRoute,
    handlerDir: relativeToCWD(__dirname),
    // The following fields are optional.
    handlerFile: 'handler.ts',
    handlerExportName: 'handler',
  };
