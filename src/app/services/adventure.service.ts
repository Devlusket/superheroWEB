import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Adventure } from "../models/adventure.model";

@Injectable({
  providedIn: "root"
})
export class AdventureService {

  private apiUrl = "http://localhost:8080/api/traveladventures";

  constructor(private http: HttpClient) {}

  findAll(): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(this.apiUrl);
  }
  }