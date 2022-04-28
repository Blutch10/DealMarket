import { Component, ViewChild } from '@angular/core';
import * as moment from "moment";
import { seriesData, seriesDataLinear } from "./ohlc";

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
export class CandlestickComponent {
  @ViewChild("chart") chart: ChartComponent | any;
  public chartCandleOptions: Partial<ChartOptions> | any;
  public chartBarOptions: Partial<ChartOptions> | any;
  
  constructor() {
    this.chartCandleOptions = {
      series: [
        {
          name: "candle",
          data: seriesData
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
          text: "BTC/USDT",
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
        }
      }
    };

    this.chartBarOptions = {
      series: [
        {
          name: "volume",
          data: seriesDataLinear
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