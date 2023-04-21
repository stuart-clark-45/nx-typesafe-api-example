import type { AWS } from '@serverless/typescript';
import { slsCreateFunction } from '@typesafe-api/serverless';

import { helloWorldFunctionDef } from '@nx-typesafe-api-example/lambda-functions';

const serverlessConfiguration: AWS = {
  service: 'nx-typesafe-api-serverless',
  frameworkVersion: '3',
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  functions: { helloWorld: slsCreateFunction(helloWorldFunctionDef) },
  package: { individually: true },
  custom: {
    webpack: {
      webpackConfig: 'webpack.config.js',
      includeModules: {
        packagePath: '../../package.json',
      },
      packager: 'npm',
      packExternalModulesMaxBuffer: 204800,
    },
  },
};

module.exports = serverlessConfiguration;
