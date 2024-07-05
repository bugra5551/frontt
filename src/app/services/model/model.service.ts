import { Model } from "../../models/read/model.model";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class ModelService {

    private apiUrl = 'https://localhost:44338';

    constructor(private httpClient: HttpClient) { }

    getModelsByBrandId(brandId: number): Observable<Model[]> {
        return this.httpClient.get<Model[]>(`${this.apiUrl}/Model/GetByModelsByBrandId/${brandId}`);
    }

    getModels(): Observable<Model[]> {
        return this.httpClient.get<Model[]>(`${this.apiUrl}/Model/GetAll`);
    }

    addModel(model: Model): Observable<Model> {
        return this.httpClient.post<Model>(`${this.apiUrl}/Model/Add`, model);
    }

    updateModel(model: Model): Observable<void> {
        return this.httpClient.put<void>(`${this.apiUrl}/Model/Update`, model);
    }
}