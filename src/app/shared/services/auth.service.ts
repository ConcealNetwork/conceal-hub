import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';

export interface Data {
  message: string;
}

@Injectable({
	providedIn: 'root'
})

export class AuthService {
	constructor(
		private http: HttpClient,
		public jwtHelper: JwtHelperService
	) {}

	api = environment.walletAPI;
	isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
	token: any;

	login(email: string, password: string, twofa: string) {
		const body = { email,	password,	rememberme: false, code: twofa }
		return this.http.post(this.api + '/auth', JSON.stringify(body));
	};

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

	loggedIn() {
		return this.jwtHelper.isTokenExpired();
	};

	getExpireDate() {
		return this.jwtHelper.getTokenExpirationDate();
	}

	setToken(token: any) {
		localStorage.setItem('access_token', token);
		this.isLoginSubject.next(true);
	}

	getToken() :any {
		return localStorage.getItem('access_token');
	}

	hasToken() : boolean {
		return !!localStorage.getItem('access_token');
	}

	logout() {
		localStorage.removeItem('access_token');
		this.isLoginSubject.next(false);
	}

  decodeToken() {
		this.jwtHelper.decodeToken(this.getToken());
	}

	getQRCode() {
		return this.http.post(`${this.api}/two-factor-authentication`, null);
	};

	enable2FA(code: string, enable: boolean) {
		const body = { code, enable };
		return this.http.put(`${this.api}/two-factor-authentication`, JSON.stringify(body));
	};

	disable2FA(code: string) {
		return this.http.delete(`${this.api}/two-factor-authentication?code=${code}`);
	};

	resetPassword(email: string) {
		const body = { email };
		return this.http.put(`${this.api}/auth`, JSON.stringify(body));
	};

	changePassword(email: string) {
		const body = { email };
		return this.http.patch(`${this.api}/user`, JSON.stringify(body));
  };

	signUpUser(username:string, email:string, password:string) {
		const body = { name: username, email, password };
		return this.http.post(`${this.api}/user`, JSON.stringify(body));
	}

}