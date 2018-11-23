import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

const sitefinityUrl = 'https://devmagazine-uat.sitefinity.site';
const serviceUrl = sitefinityUrl + '/api/default/';
const authenticationUrl = sitefinityUrl + '/Sitefinity/Authenticate/OpenID/connect/token';

@Injectable({
  providedIn: 'root'
})
export class SitefinityService {
  private sitefinity: any;
  private queryInstance: any;
  //defines whether everyone or just authenticated users can access the webservices
  private _hasAuthentication: boolean = false;

  get instance(): any {
    return this.sitefinity;
  }

  get query(): any {
    return this.queryInstance;
  }

  get hasAuthentication(): boolean {
    return this._hasAuthentication;
  }

  constructor(@Inject('Sitefinity') private sf, private http: HttpClient) {}

  createInstance(username?: string, password?: string): Promise<boolean> {
      return new Promise<boolean>((resolve, reject) => {
        if (!this.sitefinity) {
          if (this._hasAuthentication) {
            this.getToken(username, password).then((token) => {
                this.initializeInstance(token);
                resolve(true);
              },
              (error) => {
                console.log(error);
                reject(false);
              });
          } else {
            this.initializeInstance();
            resolve(true);
          }
        } else {
          resolve(true);
        }
      });
  }

  private initializeInstance(token?: string){
    this.sitefinity = new this.sf({serviceUrl});
    this.sitefinity.options = {
      serviceUrl: serviceUrl
    };
    if (token) {
      this.sitefinity.authentication.setToken(token);
    }
    this.queryInstance = new this.sf.Query();
  }

  //Gets authentication token
  private getToken(username: string, password: string): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      const tokenEndPoint = authenticationUrl;
      const dataToPost = {
        username: username,
        password: password,
        grant_type: 'password',
        scope: 'openid',
        client_id: 'iris',
        client_secret: 'secret'
      };

      var body = "";
      Object.keys(dataToPost).forEach(key => {
        if (body.length) {
          body += "&";
        }
        body += key + "=";
        body += encodeURIComponent(dataToPost[key]);
      });

      const headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded', 'x-sf-service-request': 'true' });
      const tokenOnj =
        this.http.post(tokenEndPoint, body, {headers: headers})
          .subscribe(
            (data: any) => {
              resolve(data.token_type + ' ' + data.access_token);
            },
            (error: HttpErrorResponse) => {
              reject(console.log(error.message));
            }
          );
    });

    return promise;
  }
}
