import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {AnalyticsService} from "../shared/services/analytics.service";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {Observable} from "rxjs";
import {OverviewPage} from "../shared/interfaces";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tapTargetDiv') tapTargetRef: ElementRef
  tapTarget: MaterialInstance
  dataOverview$: Observable<OverviewPage>
  day: Date

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
    this.day = new Date()
    this.dataOverview$ = this.analyticsService.fetchOverview()
  }

  ngOnDestroy(): void {
    this.tapTarget.destroy()
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)
  }

  openInfo(){
    this.tapTarget.open()
  }

}
