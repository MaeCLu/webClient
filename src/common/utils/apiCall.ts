import HttpMethod from "../types/HttpMethod.type"

// TODO: Add validation

export function buildHeaders(hasPayload: boolean) {
  const headers = new Headers();
  if (hasPayload) {
      headers.set("content-type", "application/json")
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Access-Control-Allow-Credentials", "true");
      headers.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      headers.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  }
  return headers
}

export function buildRequest(method: HttpMethod, hasPayload: boolean, controller?: AbortController) {
  return {
    //cache: "no-cache" as RequestCache,
    method: method,
    headers: buildHeaders(hasPayload)
  } as any // we need to return as any so we can append the body later if desired
}

export class ApiError extends Error {
  // carries the HTTP status code of the response
  httpStatusCode: number;
  // carries other arbitrary properties that might have been sent from the server, like 'code', etc
  [key: string]: any

  constructor(httpStatusCode: number, message?: string, code?: number) {
    super(message)
    this.httpStatusCode = httpStatusCode
    if (code) {
      this["code"] = code
    }
  }
}

// a generic handler for making JSON calls to the server
// this will throw an ApiError if the server returns an error code, optionally including any JSON the server sent back
export async function apiCall<T>(url: string, method: HttpMethod, payload?: any, controller?: AbortController): Promise<T> {
  // To abort currently active requests simply use controller.abort()
  if (!url) {
    throw new ApiError(400, "URL not supplied.")
  }
  const req = buildRequest(method, payload ? true : false, controller)
  if (payload) req.body = JSON.stringify(payload)
  try {
    const res = await fetch(url, req)
    if (res.ok) {
        const json = await res.json()
        return json as T
    } else {
      // errors can carry JSON response payloads, pick those up
      if (res.headers.get("content-type")?.includes("application/json")) {
        const json = await res.json()
        if ("message" in json) {
          const apiError = new ApiError(res.status, json.message)
          Object.assign(apiError, json) // add any other properties the server sent us into the error object
          throw apiError
        } else {
          const apiError = new ApiError(res.status) // DON'T put a message here, so that callers can detect this and insert their own context-specific messages
          Object.assign(apiError, json) // add any other properties the server sent us into the error object
          throw apiError
        }
      }
      // no content, all we have is the HTTP status code
      throw new ApiError(res.status) // DON'T put a message here, so that callers can detect this and insert their own context-specific messages
    }
  } catch (err: any) {
    if (err.hasOwnProperty("httpStatusCode")) {
      throw err // rethrow ApiError
    } else if (err.name === "AbortError") {
      throw err // rethrow AbortError - this is a user cancellation
    }
    throw new ApiError(400, "General error. " + err.message)
  }
}

export const getServerUrl = () => {
  if (typeof window !== 'undefined') {
    // To simplify development, hard code the server URI in a dev environment.
    if (process.env.NODE_ENV === "development") {
      return `https://${window.location.hostname}:8600`;
    }

    return window.location.origin;
  }

  // Fall back to a suitable default.
  return 'https://localhost:8600';
};

export const fetchDataWrapper = async (url: RequestInfo | URL, req?: RequestInit) => {
  const response = await fetch(url, req)
  
  if (!response.ok)
    throw response
  return response
}
