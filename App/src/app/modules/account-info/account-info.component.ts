import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IAccountInfo } from "src/app/interfaces/IAccountInfo";
import { AccountInfoService } from "./account-info.service";

@Component({
    selector: 'app-account-info',
    templateUrl: './account-info.component.html',
    styleUrls: ['./account-info.component.css']
})
export class AccountInfo implements OnInit, OnDestroy {

    infos!: IAccountInfo;
    sub!: Subscription;

    constructor(private acc: AccountInfoService) { }


    ngOnInit() : void {
        this.sub = this.acc.getInfos().subscribe({
            next: vals => {
                this.infos = vals.infos;
            },
            error: err => console.log(err)
        });
    } 


    ngOnDestroy() : void {
        this.sub.unsubscribe();
    }
}