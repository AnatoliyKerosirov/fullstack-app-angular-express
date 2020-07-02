import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AnalyticsService {
  constructor(private http: HttpClient) {}

  fetchOverview() {
    return this.http.get('/api/analytics/overview')
  }

  fetchAnalytics() {
    return this.http.get('/api/analytics/analytics')
  }
}
