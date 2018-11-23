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

  get instance(): any {
    return this.sitefinity;
  }

  get query(): any {
    return this.queryInstance;
  }

  constructor(@Inject('Sitefinity') private sf, private http: HttpClient) {}

  createInstance(username: string, password: string): Promise<boolean> {

      // this.sitefinity = new Promise((resolve, reject) => {
      //   this.getToken().then((data) => {
      //       const sfInstance = new this.sf({serviceUrl});
      //       sfInstance.options = {
      //         serviceUrl: serviceUrl
      //       };
      //       sfInstance.authentication.setToken(data);
      //       this.queryInstance = new this.sf.Query();
      //       resolve(sfInstance);
      //     },
      //     (error) => {
      //       reject(console.log(error));
      //     } );
      // });
      return new Promise<boolean>((resolve, reject) => {
        if (!this.sitefinity) {
        this.getToken(username, password).then((data) => {
            this.sitefinity = new this.sf({serviceUrl});
            this.sitefinity.options = {
              serviceUrl: serviceUrl
            };
            this.sitefinity.authentication.setToken(data);
            this.queryInstance = new this.sf.Query();
            resolve(true);
          },
          (error) => {
            console.log(error);
            reject(false);
          } );
        } else {
          return true;
        }
      });
  }

  getToken(username: string, password: string) {
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
              console.log(error.message);
            }
          );
    });

    return promise;
  }
}
