import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
const DEFAULT_HTTP_OPTIONS = {
    withCredentials: true,
    headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
    }),
};

type TypeConstructor<T> = (value: any) => T;
@Injectable({
    providedIn: 'root',
})
export class HttpService {
    public static API_ROOT_URL = '';
    constructor(private http: HttpClient) {
    }
    public get(url: string, headers?: any): Promise<any> {

        return this.http.get(url.indexOf('http') === 0 ? url : HttpService.API_ROOT_URL + url, {...DEFAULT_HTTP_OPTIONS, ...headers})
            .toPromise()
            .catch(this.handleError);
    }
    public put(url: string, body = {}): Promise<any> {
        return this.http.put(url.indexOf('http') === 0 ? url : HttpService.API_ROOT_URL + url, body, {...DEFAULT_HTTP_OPTIONS})
            .toPromise()
            .catch(this.handleError);
    }
    public post(url: string, body = {}, headers?: any): Promise<any> {
        return this.http.post(url.indexOf('http') === 0 ? url : HttpService.API_ROOT_URL + url, body, {...DEFAULT_HTTP_OPTIONS, ...headers})
            .toPromise()
            .catch(this.handleError);
    }
    public delete(url: string): Promise<any> {
        return this.http.delete(url.indexOf('http') === 0 ? url : HttpService.API_ROOT_URL + url, DEFAULT_HTTP_OPTIONS)
            .toPromise()
            .catch(this.handleError);
    }

    public handleError(error: any) {
      console.error(error._body ? error._body : error.status ? `${error.status} - ${error.statusText}` : 'Server error');
    }

    protected mapType<T>(res: HttpResponse<T>, ctor: TypeConstructor<T>): any {
      const val: any = res.status === 204 ? null : res.body;
      if (val === null) {
        return null;
      }

      if (val === '[]') {
        return [];
      }
      if (Array.isArray(val)) {
        return val.map(x => ctor(x));
      }
      return ctor(val);
    }
}
