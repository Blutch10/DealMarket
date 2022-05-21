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
import { RefreshService } from '../buy-sell/candlestick&pro-pert.service';



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
export class CandlestickComponent implements OnInit, OnDestroy {

//#######################
//#       Attributes    #
//#######################

  @ViewChild("chart", { static: false }) chart: ChartComponent | any;
  public chartCandleOptions: Partial<ChartOptions> | any;
  public chartBarOptions: Partial<ChartOptions> | any;
  
  
  seriesData: ICandle[] = []; // The data for the candlestick chart
  seriesDataLinear: IVolume[] = []; // The data for the volume chart
  sub!: Subscription; // The subscription to the Observable over the server's response (for candles)
  subPrice! : Subscription; // The subscription to the Observable over the server's response (for price)
  symbol = "BTCUSDT"; // The symbol of the current coin
  price = 0; // Instant price of the symbol
  UI_priceStatus = "";  // Price color indicator
  myControl: FormControl = new FormControl();

  // The list of all coins (quicker to put it here than getting it from the server)
  coins = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'NEOUSDT', 'LTCUSDT', 'QTUMUSDT', 'ADAUSDT', 'XRPUSDT', 'EOSUSDT', 'TUSDUSDT', 'IOTAUSDT', 'XLMUSDT', 'ONTUSDT',
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
  'NBTUSDT', 'GMTUSDT', 'KDAUSDT', 'APEUSDT', 'BSWUSDT', 'BIFIUSDT', 'MULTIUSDT', 'STEEMUSDT'].sort();

  private _filter: string = ""; // The substring to filter the coins
  filteredCoins = this.coins.filter((word) => word !== this.symbol); // List of filtered coins
  




//#######################
//#       Methods       #
//#######################

  /**
   * Getter on the private attribute _filter.
   */
  get filter() : string {
    return this._filter;
  }

  /**
   * Setter on the private attribute _filter. Called each time
   * its value is updated.
   */
  set filter(value: string) {
    this._filter = value;
    this.filteredCoins = this.performFilter();
  }


  /**
   * Performs the filter action and updates the filtered list of coins.
   * @return A list of coin symbols which contain the substring.
   */
  performFilter() : string[] {
    if (this.filter === "")
      return this.coins.filter((word) => word !== this.symbol);
    return this.coins.filter((word) => word.toLowerCase().includes(this.filter.toLowerCase()) && word !== this.symbol); 
  }


  /**
   * Parses the server's response to extract the data from it and put it
   * in the appropriate format for the chart.
   * @param res The server's response
   * @returns An array of arrays. First element is the data serie for the candles, second element is the data
   * serie for the volumes.
   */
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
  public updateSeries() : void {
    this.chartCandleOptions.series = [{
      name: "candle",
      data: this.seriesData
    }];
    this.chartBarOptions.series = [{
      name: "volume",
      data: this.seriesDataLinear
    }]
  }


  /**
   * Update the chart options to change the the y-axis title accordingly to the visualized coin.
   */
  public updateOptions() : void {
    this.chartCandleOptions.yaxis = {
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
        text: this.symbol.slice(0, -4),
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
  }


  /**
   * Method called when the value in the dropdown menu is changed. Updates the chart accordingly.
   */
  changeCoin() : void {
    console.log("symbol : ", this.symbol);
    this.sub = this.candle.getCandles(this.symbol).subscribe({
      next: candles => {
        let parsing: [ICandle[], IVolume[]] = this.parseResponse(candles);
        this.seriesData = parsing[0];
        this.seriesDataLinear = parsing[1];
        this.filter = "";
        this.updateSeries();
        this.updateOptions();
      },
      error: err => console.log(err)
    });
  }


  /**
   * Method to use when clicking on one of the options in the datalist tag. Updates the coin symbol.
   * @param value The coin symbol.
   */
  optionFunc(value: string) : void {
    this.symbol = value;
    this.changeCoin();
  }

  
  /**
   * Sends a notification to all Observers (for now only pro-pert component) for them to refresh their content.
   */
  refreshPieChart() : void {
    this.refresh.sendUpdate();
  }

//#######################
//#   Lifecycle Hooks   #
//#######################

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

    this.subPrice = this.candle.getPrice(this.symbol).subscribe({
      next: val => {
        this.price = val.price;
        if (this.price >= this.seriesData[-1].y[3]) {       // If instant price is higher than last Close_candle 
          this.UI_priceStatus = 'Green';                    // we set color UI_price to green
        }
        else if (this.price < this.seriesData[-1].y[3]) {   // If instant price is higher than last Close_candle
          this.UI_priceStatus = 'Red';                      // we set color UI_price to red
        }
      },
      error: err => console.log(err)
    });
  }


  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }


  constructor(private candle: CandleStickService, private refresh: RefreshService) {
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
          text: this.symbol.slice(0, -4),
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