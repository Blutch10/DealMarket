import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';


import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

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

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  seriesData!: ICandle[];
  seriesDataLinear!: IVolume[];
  sub!: Subscription;
  symbol = "BTCUSDT";

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filter(val))
    );
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

    
  myControl: FormControl = new FormControl();

  options = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'NEOUSDT', 'LTCUSDT', 'QTUMUSDT', 'ADAUSDT', 'XRPUSDT', 'EOSUSDT', 'TUSDUSDT', 'IOTAUSDT', 'XLMUSDT', 'ONTUSDT',
  'TRXUSDT', 'ETCUSDT', 'ICXUSDT', 'NULSUSDT', 'VETUSDT', 'USDCUSDT', 'LINKUSDT', 'WAVESUSDT', 'ONGUSDT', 'HOTUSDT', 'ZILUSDT', 'ZRXUSDT', 'FETUSDT', 'BATUSDT',
  'XMRUSDT', 'ZECUSDT', 'IOSTUSDT', 'CELRUSDT', 'DASHUSDT', 'OMGUSDT', 'THETAUSDT', 'ENJUSDT', 'MITHUSDT', 'MATICUSDT', 'ATOMUSDT', 'TFUELUSDT', 'ONEUSDT',
  'FTMUSDT', 'ALGOUSDT', 'GTOUSDT', 'DOGEUSDT', 'DUSKUSDT', 'ANKRUSDT', 'WINUSDT', 'COSUSDT', 'COCOSUSDT', 'MTLUSDT', 'TOMOUSDT', 'PERLUSDT', 'DENTUSDT', 'MFTUSDT',
  'KEYUSDT', 'DOCKUSDT', 'WANUSDT', 'FUNUSDT', 'CVCUSDT', 'CHZUSDT', 'BANDUSDT', 'BUSDUSDT', 'BEAMUSDT', 'XTZUSDT', 'RENUSDT', 'RVNUSDT', 'HBARUSDT', 'NKNUSDT',
  'STXUSDT', 'KAVAUSDT', 'ARPAUSDT', 'IOTXUSDT', 'RLCUSDT', 'CTXCUSDT', 'BCHUSDT', 'TROYUSDT', 'VITEUSDT', 'FTTUSDT','OGNUSDT', 'DREPUSDT', 'TCTUSDT', 'WRXUSDT',
  'BTSUSDT', 'LSKUSDT', 'BNTUSDT', 'LTOUSDT', 'AIONUSDT', 'MBLUSDT', 'COTIUSDT', 'STPTUSDT', 'WTCUSDT', 'DATAUSDT', 'SOLUSDT', 'CTSIUSDT', 'HIVEUSDT', 'CHRUSDT',
  'BTCUPUSDT', 'BTCDOWNUSDT', 'ARDRUSDT', 'MDTUSDT', 'STMXUSDT', 'KNCUSDT', 'REPUSDT', 'LRCUSDT', 'PNTUSDT', 'COMPUSDT', 'SCUSDT', 'ZENUSDT', 'SNXUSDT', 'ETHUPUSDT',
  'ETHDOWNUSDT', 'ADAUPUSDT', 'ADADOWNUSDT', 'LINKUPUSDT', 'LINKDOWNUSDT', 'VTHOUSDT', 'DGBUSDT', 'GBPUSDT', 'SXPUSDT', 'MKRUSDT', 'DCRUSDT', 'STORJUSDT', 'BNBUPUSDT',
  'BNBDOWNUSDT', 'MANAUSDT', 'AUDUSDT', 'YFIUSDT', 'BALUSDT', 'BLZUSDT', 'IRISUSDT', 'KMDUSDT', 'JSTUSDT', 'SRMUSDT', 'ANTUSDT', 'CRVUSDT', 'SANDUSDT', 'OCEANUSDT',
  'NMRUSDT', 'DOTUSDT', 'LUNAUSDT', 'RSRUSDT', 'PAXGUSDT', 'WNXMUSDT', 'TRBUSDT', 'SUSHIUSDT', 'YFIIUSDT', 'KSMUSDT', 'EGLDUSDT', 'DIAUSDT', 'RUNEUSDT', 'FIOUSDT',
  'UMAUSDT', 'TRXUPUSDT', 'TRXDOWNUSDT', 'XRPUPUSDT', 'XRPDOWNUSDT', 'DOTUPUSDT', 'DOTDOWNUSDT', 'BELUSDT', 'WINGUSDT', 'UNIUSDT', 'NBSUSDT', 'OXTUSDT', 'SUNUSDT',
  'AVAXUSDT', 'HNTUSDT', 'FLMUSDT', 'ORNUSDT', 'UTKUSDT', 'XVSUSDT', 'ALPHAUSDT', 'AAVEUSDT', 'NEARUSDT', 'FILUSDT', 'INJUSDT', 'AUDIOUSDT', 'CTKUSDT', 'AKROUSDT',
  'AXSUSDT', 'HARDUSDT', 'DNTUSDT', 'STRAXUSDT','UNFIUSDT', 'ROSEUSDT', 'AVAUSDT', 'XEMUSDT', 'SKLUSDT', 'GRTUSDT', 'JUVUSDT', 'PSGUSDT', '1INCHUSDT', 'REEFUSDT',
  'OGUSDT', 'ATMUSDT', 'ASRUSDT', 'CELOUSDT', 'RIFUSDT', 'BTCSTUSDT', 'TRUUSDT', 'CKBUSDT', 'TWTUSDT', 'FIROUSDT', 'LITUSDT', 'SFPUSDT', 'DODOUSDT', 'CAKEUSDT',
  'ACMUSDT', 'BADGERUSDT', 'FISUSDT', 'OMUSDT', 'PONDUSDT', 'DEGOUSDT', 'ALICEUSDT', 'LINAUSDT', 'PERPUSDT', 'RAMPUSDT', 'SUPERUSDT', 'CFXUSDT', 'EPSUSDT', 'AUTOUSDT',
  'TKOUSDT', 'PUNDIXUSDT', 'TLMUSDT', 'BTGUSDT', 'MIRUSDT', 'BARUSDT', 'FORTHUSDT', 'BAKEUSDT', 'BURGERUSDT', 'SLPUSDT', 'SHIBUSDT', 'ICPUSDT', 'ARUSDT', 'POLSUSDT',
  'MDXUSDT', 'MASKUSDT', 'LPTUSDT', 'XVGUSDT', 'ATAUSDT', 'GTCUSDT', 'TORNUSDT', 'ERNUSDT', 'KLAYUSDT', 'PHAUSDT', 'BONDUSDT', 'MLNUSDT','DEXEUSDT', 'C98USDT',
  'CLVUSDT', 'QNTUSDT', 'FLOWUSDT', 'TVKUSDT', 'MINAUSDT', 'RAYUSDT', 'FARMUSDT', 'ALPACAUSDT', 'QUICKUSDT', 'MBOXUSDT', 'FORUSDT', 'REQUSDT', 'GHSTUSDT', 'WAXPUSDT',
  'TRIBEUSDT', 'GNOUSDT', 'XECUSDT', 'ELFUSDT', 'DYDXUSDT', 'POLYUSDT', 'IDEXUSDT', 'VIDTUSDT', 'USDPUSDT', 'GALAUSDT', 'ILVUSDT', 'YGGUSDT', 'SYSUSDT', 'DFUSDT',
  'FIDAUSDT', 'FRONTUSDT', 'CVPUSDT', 'AGLDUSDT', 'RADUSDT', 'BETAUSDT', 'RAREUSDT', 'LAZIOUSDT', 'CHESSUSDT', 'ADXUSDT', 'AUCTIONUSDT', 'DARUSDT', 'BNXUSDT',
  'MOVRUSDT', 'CITYUSDT', 'ENSUSDT', 'KP3RUSDT', 'QIUSDT', 'PORTOUSDT', 'POWRUSDT', 'VGXUSDT', 'JASMYUSDT', 'AMPUSDT', 'PLAUSDT', 'PYRUSDT', 'RNDRUSDT', 'ALCXUSDT',
  'SANTOSUSDT', 'MCUSDT', 'BICOUSDT', 'FLUXUSDT', 'FXSUSDT', 'VOXELUSDT', 'HIGHUSDT', 'CVXUSDT', 'PEOPLEUSDT', 'OOKIUSDT', 'SPELLUSDT', 'USTUSDT', 'JOEUSDT',
  'ACHUSDT', 'IMXUSDT', 'GLMRUSDT', 'LOKAUSDT', 'SCRTUSDT', 'API3USDT', 'BTTCUSDT', 'ACAUSDT', 'ANCUSDT', 'XNOUSDT', 'WOOUSDT', 'ALPINEUSDT', 'TUSDT', 'ASTRUSDT',
  'NBTUSDT', 'GMTUSDT', 'KDAUSDT', 'APEUSDT', 'BSWUSDT', 'BIFIUSDT', 'MULTIUSDT', 'STEEMUSDT'];

  filteredOptions: Observable<string[]> | undefined;


  
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