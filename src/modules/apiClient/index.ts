import { isDevelopment } from './../env';

export interface IHttpResponse<T> extends Response {
  parsedBody?: T;
}

export const http = <T>(request: RequestInfo): Promise<IHttpResponse<T>> => {
  return new Promise((resolve, reject) => {
    let response: IHttpResponse<T>;
    fetch(request)
      .then((res) => {
        response = res;
        return res.json();
      })
      .then((body) => {
        if (response.ok) {
          response.parsedBody = body;
          resolve(response);
        } else {
          const error = new Error(body.message);
          reject(error);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const get = async <T>(
  path: string,
  args: RequestInit = { method: 'get' },
): Promise<IHttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};

const headers = new Headers();
headers.append('Content-Type', 'application/json');

export const post = async <T>(
  path: string,
  body: any,
  args: RequestInit = { method: 'post', headers, body: JSON.stringify(body) },
): Promise<IHttpResponse<T>> => {
  isDevelopment && console.log('path', path);
  isDevelopment && console.log('body', body);
  return await http<T>(new Request(path, args));
};
