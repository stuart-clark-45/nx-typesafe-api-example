import React, { useState } from 'react';
import { ErrorHandlers, handleError } from '@typesafe-api/core';
import {
  HelloWorldEndpointDef,
  RootApiClient,
} from '@nx-typesafe-api-example/api-spec';
import {
  Box,
  Button,
  CardHeader,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';

enum Backend {
  EXPRESS = 'express',
  SERVERLESS = 'serverless',
  CDK_LAMBDA = 'cdk-lambda',
}

const baseUrls: Record<Backend, string> = {
  [Backend.EXPRESS]: 'http://localhost:7809',
  [Backend.SERVERLESS]: 'http://localhost:7810/dev',
  [Backend.CDK_LAMBDA]: 'http://localhost:3000',
};

export function App() {
  const [name, setName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [responseText, setResponseText] = useState('');
  const [backend, setBackend] = useState(Backend.EXPRESS);

  // Init the API client
  const baseUrl = baseUrls[backend];
  const helloApi = new RootApiClient(baseUrl, apiKey).helloApi();

  // Set up error handlers in case the API call fails
  // (the compiler will tell you if you are missing any error codes)
  const callHelloWorldError: ErrorHandlers<HelloWorldEndpointDef> = {
    500: (err) => {
      alert('Something went wrong please check console logs');
      console.error(err);
    },
    403: () => alert('Your API key is not valid.'),
    400: (err) => {
      const response = err.response;
      if (!response) {
        throw err;
      }
      setResponseText(response.data.body.msg);
    },
  };

  // Define onClick function that calls the endpoint and handles any errors
  const onClick = async () => {
    try {
      const response = await helloApi.helloWorld(name);
      const { msg } = response.data;
      setResponseText(msg);
    } catch (err) {
      handleError(err as any, callHelloWorldError);
    }
  };

  const nameLabel = 'Enter your name';
  const apiKeyLabel = 'Enter your API key (it\'s "my-api-key")';
  const margin = 5;
  return (
    <Container style={{ width: '50%' }}>
      <CardHeader
        title="frontend using typesafe-api"
        variant="contained"
        style={{ textAlign: 'center' }}
      />
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Backend</FormLabel>
        <RadioGroup
          onChange={(e) => setBackend(e.target.value as Backend)}
          value={backend}
        >
          <FormControlLabel
            control={<Radio />}
            label="Express"
            value={Backend.EXPRESS}
          />
          <FormControlLabel
            control={<Radio />}
            label="Serverless"
            value={Backend.SERVERLESS}
          />
          <FormControlLabel
            control={<Radio />}
            label="CDK Lambda"
            value={Backend.CDK_LAMBDA}
          />
        </RadioGroup>
      </FormControl>
      <form noValidate autoComplete="off centre">
        <TextField
          label={nameLabel}
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label={apiKeyLabel}
          fullWidth
          onChange={(e) => setApiKey(e.target.value)}
        />
      </form>
      <Typography align="center">
        <Box m={margin}>
          <Button variant="contained" color="primary" onClick={onClick}>
            Say hi
          </Button>
        </Box>
        <Box m={margin}>{responseText}</Box>
      </Typography>
    </Container>
  );
}

export default App;
