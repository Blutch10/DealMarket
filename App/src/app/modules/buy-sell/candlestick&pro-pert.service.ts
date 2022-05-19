import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";


// Solution trouvée ici : https://stackoverflow.com/questions/63888794/how-to-refresh-a-component-from-another-in-angular

@Injectable({
    providedIn: 'root'
})
export class RefreshService {

    notif = 0;
    refreshNotif : Subject<number> = new Subject<number>();

    
    sendUpdate() {
        this.notif += 1;
        this.refreshNotif.next(this.notif);
    }


    getUpdate(): Observable<any> {
        return this.refreshNotif.asObservable();
    }
}