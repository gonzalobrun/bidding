import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NotificationsService } from './notifications.service';
import { WebStorageService } from '../commons/webStorage.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent {
  
    public user: User;
    public modalRef: BsModalRef;
    public unreadNotifications: any = false;
    public notificationsArr: any = [];
    private timer: any;

    constructor(
        public webStorageService: WebStorageService,
        private modalService: BsModalService,
        private notificationsService: NotificationsService
    ) {}

    ngOnInit(){
        this.user = new User(this.webStorageService.retrieve('currentUser'));
        this.checkNotifications(this.user._id);
        this.timerNotifications()
        this.setNotifications();
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    private setNotifications(){
        this.notificationsArr = this.user.notifications;
    }

    private checkNotifications(userId: any){
        this.notificationsService.checkNotifications(userId).subscribe(
            (res) => {
                this.user.notifications = res.notifications.reverse();
                this.setNotifications();
            },
            (err) => console.log(err),
            () => {
                this.checkUnread();
            }
        )
    }

    private timerNotifications(){
        this.timer = Observable.interval(10000);
        this.timer.subscribe(x =>{
          this.checkNotifications(this.user._id);
        });
    }

    private checkUnread(){
        this.unreadNotifications = false;
        this.notificationsArr.forEach((e: any) => {
            if (e.read === false) {
                this.unreadNotifications = true;
            }
        });
    }

    ngOnDestroy(){
        this.timer.unsubscribe;
    }

    public setAsRead(notif: any){
        console.log(notif);
        this.notificationsArr.find((e: any) => {
            if (e._id === notif) {
                e.read = true;
            }
        });
        let readerSetterObj = {userId: this.user._id, notificationId : notif};
        this.notificationsService.setAsRead(readerSetterObj).subscribe(
            (res) => console.log(res),
            (err) => console.log(err),
            () => console.log('hey')
        )
    }
}