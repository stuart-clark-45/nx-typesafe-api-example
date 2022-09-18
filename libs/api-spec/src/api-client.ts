import {AbstractApiClient, createRouteRequest} from '@typesafe-api/core';
import {helloWoldRoute, HelloWorldEndpointDef} from './routes';
import {DefaultReqOpts} from './api';

// Create custom class that we will use as the super class for all our client classes
// that support {@link DefaultReqOpts}
class CustomApiClient extends AbstractApiClient<DefaultReqOpts> {}

// Create a client for our endpoint
class HelloApiClient extends CustomApiClient {

  // Use createRouteRequest(..) to create a method to execute your request
  private _helloWorld = createRouteRequest<HelloWorldEndpointDef>(this, helloWoldRoute);

  // Abstract away the details of the request, devs writing calling code shouldn't need
  // to think about them
  public helloWorld = (yourName: string) => this._helloWorld({query: {yourName}});
}

// Depending how many endpoints you have you may want to start nesting your API clients like this
export class RootApiClient extends CustomApiClient {

  // You can also add a custom constructor to abstract away the details of your
  // default request options
  constructor(baseUrl: string, private apiKey: string) {
    super({
      baseUrl,
    });
  }

  public async getDefaultReqOptions(): Promise<DefaultReqOpts> {
    return {
      headers: {
        authorization: this.apiKey
      }
    };
  }

// Here we add the {@link HelloApiClient} as a child of {@link RootApiClient}
  public helloApi = (): HelloApiClient => new HelloApiClient(this.getChildParams());
}
