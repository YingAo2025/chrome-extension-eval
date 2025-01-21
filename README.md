# Chrome Extension Request Handling Library

## Overview

This library is designed to provide a set of utilities for developers building Chrome extensions, aimed at simplifying the construction and sending of network requests. It offers functionality from crafting Fetch API calls to generating equivalent cURL commands, along with the ability to execute JavaScript code in the inspected window.

## Features

- **createFetchFn**: Constructs a `fetch` function call string that can be used to make HTTP requests.
- **generateCurlCommand**: Generates an equivalent cURL command string based on the given request object.
- **inspectedWindowEval**: Executes provided JavaScript code within the context of the inspected window in Chrome DevTools.
- **generateRequestParams**: Generates a parameter object needed for a `fetch` API call based on the provided request information.
- **evalFetch**: Executes a `fetch` request in the inspected window using the provided URL and parameters.

## Installation

To use this library in your Chrome extension, include it as part of your extension's source code or package it accordingly.

## Usage

### Creating a Fetch Function Call

```javascript
const url = 'https://api.example.com/data';
const params = { method: 'GET' };
const fetchCall = createFetchFn(url, params);
```

### Generating a cURL Command

```javascript
const request = {
  method: 'POST',
  url: 'https://api.example.com/submit',
  headers: [{ name: 'Content-Type', value: 'application/json' }],
  cookies: [{ name: 'session', value: '12345abcde' }]
};
const curlCommand = generateCurlCommand(request);
console.log(curlCommand);
```

### Executing Code in the Inspected Window

```javascript
const scriptContent = 'console.log("Hello from the inspected window!");';
inspectedWindowEval(scriptContent);
```

### Generating Fetch Parameters

```javascript
const request = {
  url: 'https://api.example.com/resource',
  headers: [{ name: 'Authorization', value: 'Bearer token' }],
  method: 'POST',
  postData: { text: JSON.stringify({ key: 'value' }) }
};
const fetchParams = generateRequestParams(request);
```

### Evaluating Fetch in the Inspected Window

```javascript
const url = 'https://api.example.com/';
const params = generateRequestParams(request);
evalFetch(url, params);
```

### Converting Request Body to Fetch

```javascript
const request = {
  url: 'https://api.example.com/',
  // ... other properties ...
};
requestBodyToFetch(request);
```

## Documentation

For more detailed documentation, including all available options and advanced usage, please refer to the inline comments within the source code files.

## Contributing

Contributions are welcome! Please fork the repository and make your changes as a pull request. Make sure to write tests for any new features and ensure that existing tests pass.

## License

This library is released under the [MIT License](LICENSE). See the LICENSE file for details.

---

**Note:** The functions described above assume you have a basic understanding of Chrome extensions and how they interact with web pages via the DevTools API. Always ensure you're following best practices for security and user privacy when handling data and executing scripts in the context of a user's browser session.