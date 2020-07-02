import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from "../shared/services/analytics.service";
import {MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  dataOverview = {}

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
    this.analyticsService.fetchOverview().subscribe(
      data => {
        this.dataOverview = data
        console.log(data)
      },
      error => {
        MaterialService.toast(error.error.message)
      },
      () => {
        console.log('Complete overview analytics')
      }
    )
  }

}
