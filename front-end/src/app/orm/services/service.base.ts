import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import 'rxjs/add/operator/map';

/*
**** BASE REST API SERVICE ****
The service provide crud operation 
*/

export class BaseService<T> {
    constructor(
        protected httpClient: HttpClient,
        protected url: string,
        protected endpoint: string) {
    }

    // Create new T object
    public create(item: T): Observable<T> {
        return this.httpClient.post<T>(`${this.url}${this.endpoint}`, item);
    }

    // Update   T object
    public update(item: T): Observable<T> {
        return this.httpClient.put<T>(`${this.url}${this.endpoint}/${(item as any)._id}`, item);
    }

    // Retrieve one T element by id
    public read(id: string): Observable<T> {
        return this.httpClient
            .get(`${this.url}${this.endpoint}/${id}`).pipe(
                map((data: any) => data as T)
            );
    }

    // Get list of T elements 
    public list(): Observable<T[]> {
        return this.httpClient.get(`${this.url}${this.endpoint}`).pipe(
            map((data: any) => {
                return data as T[];
            })
        )
    }

    // Delete one T element
    public delete(id: string): Observable<any> {
        return this.httpClient.delete(`${this.url}${this.endpoint}/${id}`);
    }

}
