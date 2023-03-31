import {
  relativeToCWD,
  TypesafeApiSeverlessFnc,
} from '@typesafe-api/serverless';
import {helloWoldRoute, HelloWorldEndpointDef} from '@nx-typesafe-api-example/api-spec';

const functionDef: TypesafeApiSeverlessFnc<HelloWorldEndpointDef> = {
  route: helloWoldRoute,
  handlerDir: relativeToCWD(__dirname),
  // The following fields are optional.
  handlerFile: 'handler.ts',
  handlerExportName: 'handler',
};

export default functionDef;
