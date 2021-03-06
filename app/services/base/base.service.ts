import { Injectable } from 'angular2/core';

import {Http, Response, Headers, URLSearchParams} from 'angular2/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/Rx';
import {UserState} from "../../models/states/user.state";

@Injectable()
export class BaseService {

    protected GATEWAY:string;

    protected static GATEWAY_BUSES:string = "http://127.0.0.1/web/index.php/buses";
    protected static GATEWAY_USER_LOGIN:string = "http://127.0.0.1/web/index.php/site/login";

    constructor (protected http: Http) {}

    public setAuthParams(params:{[key:string] : string}){

        params["uid"] = UserState.activeUser.user_id;
        params["pub_token"] = UserState.activeUser.pub_token;

        return params;
    }

    public getHeaders():Headers{
        let headers = new Headers();

        headers.set('Content-Type', 'application/x-www-form-urlencoded');
        headers.set('Accept','text/xml');

        return headers;
    }

    protected post(url:string, params:{ [key: string] : string; }, tokenized:Boolean = true){

        if( tokenized == true){
            params = this.setAuthParams( params)
        }

        let bodyArray:Array<string> = [];

        for (var key in params) {
            var value = params[key];

            bodyArray.push(key + '=' + encodeURIComponent(value))
        }

        let body:string = bodyArray.join("&");
        let headers = this.getHeaders();

        return this.http
            .post(
                url,
                body,
                {
                    headers
                }
            )
    }

    protected get(url:string, params:{ [key: string] : string; }, tokenized:Boolean = true ){

        if( tokenized == true){
            params = this.setAuthParams( params)
        }
        //
        let get_params: URLSearchParams = new URLSearchParams();

        for (var key in params) {
            var value = params[key];

            get_params.set(key, encodeURIComponent(value));
        }

        // let bodyArray:Array<string> = [];
        //
        // for (var key in params) {
        //     var value = params[key];
        //
        //     bodyArray.push(key + '=' + encodeURIComponent(value))
        // }
        //
        // let body:string = bodyArray.join("&");

        return this.http
            .get(
                url,
                {
                    search: get_params
                }
            )
    }

    protected extractData(res: Response) {
    }

    protected handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        console.error(errMsg); // log to console instead

        // this.router.navigate(['Dashboard']);

        return Observable.throw(errMsg);
    }

}
