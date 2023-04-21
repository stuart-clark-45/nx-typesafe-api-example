import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Cors, CorsOptions, RestApi } from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs/lib/function';
import {
  AnyPrincipal,
  PolicyDocument,
  PolicyStatement,
} from 'aws-cdk-lib/aws-iam';
import path from 'node:path';
import { CdkLambdaFunctionBuilder } from '@typesafe-api/serverless/src/cdk';
import { TypesafeApiSeverlessFnc } from '@typesafe-api/serverless';
import { AbstractEndpointDef } from '@typesafe-api/core';
import {helloWorldFunctionDef} from '../../../../libs/lambda-functions/src';

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, private props: StackProps) {
    super(scope, id, props);

    const policy = new PolicyDocument({
      statements: [
        new PolicyStatement({
          actions: ['execute-api:Invoke'],
          principals: [new AnyPrincipal()],
          resources: ['execute-api:/*/*/*'],
        }),
      ],
    });

    const defaultCorsPreflightOptions: CorsOptions = {
      allowHeaders: Cors.DEFAULT_HEADERS,
      allowMethods: Cors.ALL_METHODS,
      allowOrigins: Cors.ALL_ORIGINS,
    };

    const api = new RestApi(this, 'MyApi', {
      policy,
      defaultCorsPreflightOptions,
    });

    const getNodeJsFunctionProps = (
      functionDef: TypesafeApiSeverlessFnc<AbstractEndpointDef>,
      functionName: string
    ): NodejsFunctionProps => {
      const { handlerDir, handlerFile } = functionDef;
      const projectRoot = path.join(__dirname + '../../../../../');
      const tsconfig = path.join(__dirname, '../../', 'tsconfig.json');
      return {
        functionName,
        handler: 'handler',
        runtime: lambda.Runtime.NODEJS_18_X,
        projectRoot,
        depsLockFilePath: path.join(projectRoot, 'package-lock.json'),
        bundling: {
          workingDirectory: projectRoot,
          minify: true,
          sourceMap: true,
          tsconfig: tsconfig,
        },
        environment: {
          NODE_OPTIONS: '--enable-source-maps',
        },
        timeout: Duration.seconds(30),
        entry: `${handlerDir}/${handlerFile}`,
      };
    };

    new CdkLambdaFunctionBuilder({
      stack: this,
      api,
      getNodeJsFunctionProps,
    }).addNodeJsFunction(helloWorldFunctionDef);
  }
}
