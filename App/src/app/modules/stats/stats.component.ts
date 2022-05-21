import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IWallet } from "src/app/interfaces/IWallet";
import { AccountInfoService } from "../account-info/account-info.service";
import { ProPertService } from "../pro-pert/pro-pert.service";
import { PerformanceService } from "./stats.service";

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
    
    balance!: number;
    wallet! : Object;
    wallet_value!: number;
    performance!: number;
    performance_percentage!: number;
    performance_status: string = "POSITIVE";
    subAccount! : Subscription;
    subWAlletValue! : Subscription;

    
    constructor(private infos: AccountInfoService, private walVal: PerformanceService) {}
    
    
    ngOnInit(): void {
       this.subAccount = this.infos.getInfos().subscribe({
           next : (res) => {
            this.balance = res.infos.balance_;
            this.wallet = res.infos.wallet_;
            this.subWAlletValue = this.walVal.getWalletValue(this.wallet).subscribe({
              next: res => {
                  this.wallet_value = res.price;
                  this.performance = (this.balance + this.wallet_value) - 2500;
                  this.performance_status = (this.performance < 0) ? "NEGATIVE" : "POSITIVE";
                  this.performance_percentage = (this.performance / 2500) * 100;
              },
              error: err => console.log(err)
          });
           },
           error: err => console.log(err)
       });
    }
}