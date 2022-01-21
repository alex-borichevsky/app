import {Injectable} from "@angular/core";
import {User} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private token: string = null

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User>{
    return this.http.post<User>('/api/auth/register', user)
  }

  login(user: User): Observable<{token: string}> {
    //после того как сделали запрос pipe()сделать какоето действие - занести токен в переменную
    return this.http.post<{token: string}>('/api/auth/login', user)
      .pipe(
        //tap позволяет выцепить что-то из стрима
        tap(
          ({token}) =>{
            localStorage.setItem("auth-token", token)
            this.setToken(token)
          }
        )
      )
  }
  setToken(token: string){
    this.token = token
  }
  getToken(): string{
    return this.token
  }
  isAuthenticated(): boolean {
    return !!this.token
  }
  logout() {
    this.setToken(null)
    localStorage.clear()
  }
}
