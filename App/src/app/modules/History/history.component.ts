import { Component, OnChanges, OnInit } from "@angular/core";
import { HistService } from "./history.service";
import { ITransaction } from "../../interfaces/ITransaction"
import { Subscription } from "rxjs";



@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

    actions: ITransaction[] = [];
    sub!: Subscription;

    constructor(private hist : HistService) { }

    
    ngOnInit() : void 
    {
        this.sub = this.hist.getHistory().subscribe({
            next: actions => {
                this.actions = actions.ops;
            },
            error: err => console.log(err)
        });
    }

    
    ngOnDestroy() : void {
        this.sub.unsubscribe();
    }
}