import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProPertService} from './pro-pert.service';
import { Subscription } from "rxjs";
import { IWallet } from "../../interfaces/IWallet";

@Component({
  selector: 'app-pro-pert',
  templateUrl: './pro-pert.component.html',
  styleUrls: ['./pro-pert.component.css']
})
export class ProPertComponent implements OnInit, OnDestroy {


  wallet: IWallet[] = [];
  view: IWallet[] = [];
  sub!: Subscription;

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private proPert : ProPertService) { }

  ngOnInit() : void 
  {
    this.sub = this.proPert.getWallet().subscribe({
      next: res => {
        this.wallet = this.parseResponse(res.userWallet);
      },
      error: err => console.log(err)
    });
  }


  /**
   * The server provides a Javascript object whereas we need an array of IWallet.
   * This methods does the conversion between the two types.
   * @param res The object sent by the server
   * @returns An array of IWallet.
   */
  parseResponse(res : Object) : IWallet[]
  {
    let result: IWallet[] = [];
    for (const [k, v] of Object.entries(res))
    {
      let entry: IWallet = {
        name: k,
        value: v
      };
      result.push(entry);
    }
    return result;
  }


  ngOnDestroy() : void {
      this.sub.unsubscribe();
  }


  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
