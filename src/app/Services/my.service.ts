import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from './Organization';
@Injectable()
export class AppService {
  constructor(private http: HttpClient) { }
  getBaseUrl() {
    return 'https://localhost:44371/api/';
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
 



  getOrgList(dataTablesParameters): Observable<Organization> {
   
    return this.http.post<Organization>('/api/GetOrgList', dataTablesParameters  )
    //  return this.http.post<Organization>(this.getBaseUrl+'GetOrgList',dataTablesParameters, {}
    //   )
  }


  // Get single student data by ID
  GetUserListById(id): Observable<any> { 
    return this.http
      .get<any>('/api/GetUserList/' + '/' + id)
  }

  GetUserRoleById(id): Observable<any> { 
    return this.http
      .get<any>('/api/GetRoleList/' + '/' + id)
  }





  //// Create a new item
  //createItem(item): Observable<Student> {
  //  return this.http
  //    .post<Student>(this.base_path, JSON.stringify(item), this.httpOptions)
  //    .pipe(
  //      retry(2),
  //      catchError(this.handleError)
  //    )
  //}

  //// Get single student data by ID
  //getItem(id): Observable<Student> {
  //  return this.http
  //    .get<Student>(this.base_path + '/' + id)
  //    .pipe(
  //      retry(2),
  //      catchError(this.handleError)
  //    )
  //}

  //// Get students data
  //getList(): Observable<Student> {
  //  return this.http
  //    .get<Student>(this.base_path)
  //    .pipe(
  //      retry(2),
  //      catchError(this.handleError)
  //    )
  //}

  //// Update item by id
  //updateItem(id, item): Observable<Student> {
  //  return this.http
  //    .put<Student>(this.base_path + '/' + id, JSON.stringify(item), this.httpOptions)
  //    .pipe(
  //      retry(2),
  //      catchError(this.handleError)
  //    )
  //}

  //// Delete item by id
  //deleteItem(id) {
  //  return this.http
  //    .delete<Student>(this.base_path + '/' + id, this.httpOptions)
  //    .pipe(
  //      retry(2),
  //      catchError(this.handleError)
  //    )
  //}





  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
  //  return throwError(errorMessage);


  }
}  
