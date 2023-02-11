import {Injectable} from '@angular/core';

@Injectable({
    providedIn: "root"
})

export class TokenService {
    private _ACCESS_TOKEN = 'access_token';

    constructor() {
    }

    hasAccessToken(): boolean {
        const hasAccessToken = this.getAccessToken();
        return Boolean(hasAccessToken);
    }

    getAccessToken(): string {
        return localStorage.getItem(this._ACCESS_TOKEN);
    }

    setAccessToken(token: string): void {
        localStorage.setItem(this._ACCESS_TOKEN, JSON.stringify(token))
    }

    removeAllToken(): void {
        localStorage.removeItem(this._ACCESS_TOKEN);
    }
}
