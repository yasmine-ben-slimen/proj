import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Annonce } from './Annonce';

let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  private baseUrl = 'http://localhost:8080/api/v1/annonces';
  constructor(private http: HttpClient) { }

  createAnnonce(annonce: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, annonce);
  }
  findByNomEcoleAndType(nom_ecole:string , type:string): Observable<Annonce[]>{
    const searchUrl = `${this.baseUrl}/search/findByNomEcoleAndType?nom_ecole=${nom_ecole} & type=${type}`;
   return this.getAnnonceList(searchUrl);


  }
  
  getAnnoncesByNomEcoleAndType(nom_ecole:string , type:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/nom_ecole/${nom_ecole} & type/${type}`);
  }
  getData(annonce : Annonce)  
  {  
    let url = this.baseUrl + "/annonces/{prix}";  
    return  this.http.post(url , annonce);  
  }  

  
  getAnnonce(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  

  updateAnnonce(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteAnnonce(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  
    getAnnonceList(nom :string): Observable<Annonce[]> {
      const searchUrl = `${this.baseUrl}/search/name?nom=${nom}`;
      return this.http.get<getResponse>(searchUrl).pipe(
      map(response => response._embedded.annonces)
      );
      
      
    }
  
   
    
  }
  
  interface getResponse{
    _embedded : {
      annonces : Annonce[];
    }
      
  }
  