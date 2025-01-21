
function createFetchFn(url, params) {
  params = JSON.stringify(params);
  return "fetch(" + '"' + url + '"' + ", " + params + ")";
}

function generateCurlCommand(request) {
  const { method, url, headers, cookies } = request;
  
  let curlCommand = `curl -X ${method} "${url}"`;

  // Add headers
  headers.forEach(header => {
      curlCommand += ` \\\n  -H '${header.name}: ${header.value}'`;
  });

  // Add cookies
  if (cookies.length > 0) {
      const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
      curlCommand += ` \\\n  -H 'Cookie: ${cookieString}'`;
  }

  return curlCommand;
}

function inspectedWindowEval(scriptContent) {
  chrome.devtools.inspectedWindow.eval(scriptContent);
}

/**
   * generate request params
   * @param {{[key:string]: [value: any]}} request 
   * @returns 
   */
function generateRequestParams(request) {
  const params = {
    headers: {},
    referrer: "",
    referrerPolicy: "origin",
    body: null,
    method: "",
    mode: "cors",
    credentials: "",
    url: request.url
  }

  request.headers.forEach((header) => {
    params.headers[header.name] = header.value;
  })
  
  if (request.url.includes("?")) {
    params["referrer"] = request.url.split("?")[0];
  } else {
    params["referrer"] = request.url;
  }

  if (request.method === "POST") {
    params["body"] = request.postData.text;
  }

  params["method"] = request.method;

  if (request.url.includes("https://")) {
    params["credentials"] = "include";
  } else {
    delete params["credentials"];
  }

  return params;
}

/**
   * eval fetch in inspectedWindow
   * @param {string} url - request url
   * @param {string} params - request params
   */
function evalFetch(url, params) {
  const scriptContent = createFetchFn(url, params);
  inspectedWindowEval(scriptContent);
}

/**
 * Generate fetch using request body
 * @param {*} request 
 */
function requestBodyToFetch(request) {
  const { url } = request;
  const params = generateRequestParams(request);
  evalFetch(url, params);
}

export {
  evalFetch,
  requestBodyToFetch,
  generateCurlCommand,
  generateRequestParams
}