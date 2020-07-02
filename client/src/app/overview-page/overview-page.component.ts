import {Component, OnInit} from '@angular/core';

import {AnalyticsService} from "../shared/services/analytics.service";
import {MaterialService} from "../shared/classes/material.service";
import {Observable} from "rxjs";
import {OverviewPage} from "../shared/interfaces";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  dataOverview$: Observable<OverviewPage>
  day: Date

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
    this.day = new Date()
    this.dataOverview$ = this.analyticsService.fetchOverview()
  }

}
