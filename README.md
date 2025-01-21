# README

## Overview

This package provides several utilities for handling HTTP requests in JavaScript. It includes functions to create a `fetch` function call string, generate `curl` commands, evaluate script content in the inspected window, and generate & execute `fetch` requests based on request bodies.

## Installation

Since this is a set of JavaScript utility functions, there's no traditional installation process. You can directly integrate these functions into your project or import them as modules. If you're using a bundler like Webpack, ensure it's configured to support ESM (ECMAScript Modules).

## Functions

### createFetchFn(url, params)

Generates a string that represents a `fetch` function call with the given URL and parameters. This function stringifies the parameters object before incorporating it into the fetch call string.

```javascript
function createFetchFn(url, params) {
  params = JSON.stringify(params);
  return "fetch(" + '"' + url + '"' + ", " + params + ")";
}
```

### generateCurlCommand(request)

Constructs a `curl` command string from a given request object, which contains properties such as method, URL, headers, and cookies.

```javascript
function generateCurlCommand(request) {
  // Implementation details...
}
```

### inspectedWindowEval(scriptContent)

Evaluates a script in the context of the inspected window. This function is typically used within browser developer tools extensions.

```javascript
function inspectedWindowEval(scriptContent) {
  chrome.devtools.inspectedWindow.eval(scriptContent);
}
```

### generateRequestParams(request)

Generates an object containing request parameters suitable for use with the Fetch API, based on the provided request object.

```javascript
function generateRequestParams(request) {
  // Implementation details...
}
```

### evalFetch(url, params)

Creates a `fetch` function call string using `createFetchFn` and evaluates it in the inspected window.

```javascript
function evalFetch(url, params) {
  const scriptContent = createFetchFn(url, params);
  inspectedWindowEval(scriptContent);
}
```

### requestBodyToFetch(request)

Converts a request body into a `fetch` call by generating the necessary parameters and then executing the fetch request in the inspected window.

```javascript
function requestBodyToFetch(request) {
  const { url } = request;
  const params = generateRequestParams(request);
  evalFetch(url, params);
}
```

## Usage

To use these functions, you would typically call them with appropriate arguments. For example:

```javascript
import { evalFetch, generateCurlCommand, generateRequestParams, requestBodyToFetch } from './path-to-your-module';

// Generate a curl command from a request object
const curlCommand = generateCurlCommand({
  method: 'GET',
  url: 'https://api.example.com/data',
  headers: [{ name: 'Authorization', value: 'Bearer token' }],
  cookies: []
});

console.log(curlCommand);

// Convert a request body into a fetch call
requestBodyToFetch({
  url: 'https://api.example.com/data',
  method: 'POST',
  headers: [{ name: 'Content-Type', value: 'application/json' }],
  postData: { text: JSON.stringify({ key: 'value' }) }
});
```

Please replace `'./path-to-your-module'` with the actual path to where your module is located.

## Contributing

Contributions are welcome! Please open an issue first to discuss what you would like to change.

## License

Distributed under the MIT License. See `LICENSE` for more information.