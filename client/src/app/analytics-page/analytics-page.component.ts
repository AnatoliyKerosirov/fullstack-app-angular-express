import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Chart} from 'chart.js'
import {AnalyticsService} from "../shared/services/analytics.service";

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('orders') ordersRef: ElementRef
  @ViewChild('profit') profitRef: ElementRef

  averageGain: number
  pending = true

  aSub: Subscription

  constructor(private service: AnalyticsService) {
  }

  ngAfterViewInit(): void {
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)'
    }

    const orderConfig: any =  {
      label: 'Количество заказов',
      color: 'rgb(155, 15, 100)'
    }

    const profitConfig: any = {
      label: 'Маржа',
      color: 'rgb(100, 155, 55)'
    }

    this.aSub = this.service.fetchAnalytics().subscribe(
      (data: any) => {
        this.averageGain = data.averageGain
        gainConfig.labels = data.chart.map(item => {
          return item.label.split('-').reverse().join('-')
        })
        gainConfig.data = data.chart.map(item => item.gain)
        const gainCtx = this.gainRef.nativeElement.getContext('2d')
        gainCtx.canvas.height = '300px'

        new Chart(gainCtx, createChartConfig(gainConfig))

        orderConfig.data = data.chart.map(item => item.number)
        orderConfig.labels = gainConfig.labels
        const orderCtx = this.ordersRef.nativeElement.getContext('2d')
        orderCtx.canvas.height = '300px'

        new Chart(orderCtx, createChartConfig(orderConfig))

        profitConfig.data = data.chart.map(item => item.gain - item.cost)
        profitConfig.labels = gainConfig.labels
        const profitCtx = this.profitRef.nativeElement.getContext('2d')
        profitCtx.canvas.height = '300px'

        new Chart(profitCtx, createChartConfig(profitConfig))

        console.log(gainConfig.data)
        this.pending = false
      }
    )
  }

  ngOnDestroy(): void {
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

}

function createChartConfig({label, data, labels, color}) {
  console.log(label)
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [{
        label, data,
        borderColor: color,
        steppedLine: false,
        fill: false
      }]
    }
  }
}
