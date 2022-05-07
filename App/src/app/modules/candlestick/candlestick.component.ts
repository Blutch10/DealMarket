import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexPlotOptions,
  ApexDataLabels,
  ApexStroke
} from "ng-apexcharts";
import { Subscription } from 'rxjs';
import { ICandle } from 'src/app/interfaces/ICandle';
import { IVolume } from 'src/app/interfaces/IVolume';
import { ICandleResponse } from 'src/app/interfaces/Responses/ICandleResponse';
import { CandleStickService } from './candlestick.service';



export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-candlestick',
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.css']
})
export class CandlestickComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild("chart", { static: false }) chart: ChartComponent | any;
  public chartCandleOptions: Partial<ChartOptions> | any;
  public chartBarOptions: Partial<ChartOptions> | any;
  
  seriesData!: ICandle[];
  seriesDataLinear!: IVolume[];
  sub!: Subscription;
  symbol = "BTCUSDT";


  ngOnInit(): void {
    this.sub = this.candle.getCandles(this.symbol).subscribe({
      next: candles => {
        let parsing: [ICandle[], IVolume[]] = this.parseResponse(candles);
        this.seriesData = parsing[0];
        this.seriesDataLinear = parsing[1];
        this.updateSeries();
      },
      error: err => console.log(err)
    });
  }


  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }


  ngOnChanges(changes: SimpleChanges): void {
      // Récupère symbole de la crypto et le met this.symbol
      // this.sub = comme au-dessus

  }

  parseResponse(res: ICandleResponse) : [ICandle[], IVolume[]]
  {
    let c: ICandle[] = [];
    let v: IVolume[] = [];
    for (let element of res.candles)
    {
      let addC: ICandle = {
        x: element.candle.openTime,
        y: [ element.candle.open, element.candle.high, element.candle.low, element.candle.close ]
      }
      c.push(addC);
      
      let addV: IVolume = {
        x: element.candle.openTime,
        y: element.volume
      }
      v.push(addV);
    }
    let result: [ICandle[], IVolume[]] = [c, v];
    return result;
  }

  
  /**
   * Method to call to update the charts, after the modification of data series.
   */
  public updateSeries() {
    this.chartCandleOptions.series = [{
      name: "candle",
      data: this.seriesData
    }];
    this.chartBarOptions.series = [{
      name: "volume",
      data: this.seriesDataLinear
    }]
  }


  constructor(private candle: CandleStickService) {
    this.chartCandleOptions = {
      series: [
        {
          name: "candle",
          data: this.seriesData
        }
      ],
      chart: {
        type: "candlestick",
        group: 'chartgroup',
        background: '#18112C',
        foreColor: '#B8B0BC',
        height: 290,
        id: "candles",
        toolbar: {
          autoSelected: "pan",
          show: true
        },
      },
      title: {
        text: "CandleStick Chart - Category X-axis",
        align: "left"
      },
      tooltip: {
        enabled: true,
        theme : 'dark',
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#00CC00",
            downward: "#CC0022"
          }
        }
      },
      xaxis: {

        type: "datetime",
        crosshairs: {
          show: false,
        }
        
      },
      yaxis: {
        axisBorder: {
          show: true,
          color: '#B8B0BC',
          offsetX: 3,
          offsetY: 1
      },
        tooltip: {
          enabled: false
        },
        title: {
          text: this.symbol,
          rotate: -90,
          offsetX: 0,
          offsetY: 0,
          style: {
              color: undefined,
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-title',
          },
        },
        noData: {
          text: 'Loading...'
        }
      }
    };

    this.chartBarOptions = {
      series: [
        {
          name: "volume",
          data: this.seriesDataLinear
        }
      ],
      chart: {
        group: 'chartgroup',
        background: '#18112C',
        foreColor: '#B8B0BC',
        id: "barchart",
        height: 160,
        type: "bar",
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          columnWidth: "80%",
          colors: {
            ranges: [
              {
                from: -1000,
                to: 0,
                color: "#F15B46"
              },
              {
                from: 1,
                to: 10000,
                color: "#FEB019"
              }
            ]
          }
        }
      },
      stroke: {
        width: 0
      },
      xaxis: {
        type: "datetime",
        axisBorder: {
          offsetX: 13
        }
      },
      yaxis: {
        labels: {
          show: true,
        },
      }
    };
  }
}