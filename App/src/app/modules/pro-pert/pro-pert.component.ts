import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { ProPertService} from './pro-pert.service';
import { Subscription } from "rxjs";
import { IWalletResponse } from "../../interfaces/Responses/IWalletResponse";
import { single } from './data';

@Component({
  selector: 'app-pro-pert',
  templateUrl: './pro-pert.component.html',
  styleUrls: ['./pro-pert.component.css']
})
export class ProPertComponent implements OnInit {


  actions: IWalletResponse[] = [];
  view: IWalletResponse[] = [];
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

  constructor(private hist : ProPertService) { }

  ngOnInit() : void 
  {
      this.sub = this.hist.getWallet().subscribe({
          next: (actions: { ops: IWalletResponse[]; }) => {
              this.actions = actions.ops;
          },
          error: (err: any) => console.log(err)
      });
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
