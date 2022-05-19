import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { BuySellService } from "./buy-sell.service";
import { RefreshService } from "./candlestick&pro-pert.service";

@Component({
    selector: 'app-buy-sell',
    templateUrl: './buy-sell.component.html',
    styleUrls: ['./buy-sell.component.css']
})
export class BuySell {

    quantityBuy: number = 0;
    quantitySell: number = 0;
    sub!: Subscription;
    UI_Message: string = "";
    UI_Message_state = "NEUTRAL";

    // Parameters passed in the custom tag
    @Input()
    symbol: string = "BTCUSDT";

    
    constructor(private bs: BuySellService, private refresh: RefreshService) {}

    /**
     * Requests the server to buy the specified amount of the symbol.
     */
    buyCoin() : void {
        this.sub = this.bs.buyCoin(this.symbol, this.quantityBuy).subscribe({
            next: res => {
                if (res.status === 200) {
                    this.UI_Message = res.message;
                    this.UI_Message_state = "SUCCESS";
                    this.refresh.sendUpdate();
                    setTimeout(() => { this.UI_Message = ""; this.UI_Message_state = "NEUTRAL" }, 1500);
                }
            },
            error: err => {
                this.UI_Message = "Error : operation aborted";
                this.UI_Message_state = "ERROR";
                setTimeout(() => { this.UI_Message = ""; this.UI_Message_state = "NEUTRAL" }, 1500);
            }
        });
    }


    /**
     * Requests the server to sell the specified amount of the symbol.
     */
    sellCoin() : void {
        this.sub = this.bs.sellCoin(this.symbol, this.quantitySell).subscribe({
            next: res => {
                if (res.status === 200) {
                    this.UI_Message = res.message;
                    this.UI_Message_state = "SUCCESS";
                    this.refresh.sendUpdate();
                    setTimeout(() => { this.UI_Message = ""; this.UI_Message_state = "NEUTRAL" }, 1500);
                }
            },
            error: err => {
                this.UI_Message = "Error : operation aborted";
                this.UI_Message_state = "ERROR";
                setTimeout(() => { this.UI_Message = ""; this.UI_Message_state = "NEUTRAL" }, 1500);
            }
        });
    }

}