import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    age: number;
    salary: number;
    email: string;
    department: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl  = 'http://localhost:8080/users';

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl);
    }

    addUser(user: User): Observable<User> {
        return this.http.post<User>(this.baseUrl, user);
    }

    updateUser(id: number, user: User): Observable<User> {
        return this.http.put<User>(`${this.baseUrl}/${id}`, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`)
    }

}