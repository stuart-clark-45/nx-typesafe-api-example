import { App, Stack, StackProps } from 'aws-cdk-lib';
import {ApiStack} from './api-stack';

export class AppStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    new ApiStack(scope, 'api-stack', props);
  }
}
