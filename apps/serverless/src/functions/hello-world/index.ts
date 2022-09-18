import {relativeToCWD, slsCreateFunction} from '@typesafe-api/serverless';
import { helloWoldRoute } from '@nx-typesafe-api-example/api-spec';
import { AWS } from '@serverless/typescript';

const slsFuncConfig: AWS['functions'][string] = slsCreateFunction({
  route: helloWoldRoute,
  handlerDir: relativeToCWD(__dirname),
  // The following fields are optional.
  handlerFile: "handler.ts",
  handlerExportName: "handler"
});

export default slsFuncConfig;
