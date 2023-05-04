import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { User } from '../models/user.model';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user = {} as User;
  moneyTransactions: any;
  income: number = 0;
  expense: number = 0;
  constructor(
    private navCtrl: NavController,
    public firebaseService: FirebaseService,
    private storage: Storage
  ) {
    this.firebaseService.get_transactions().subscribe(
      (res) => {
        this.moneyTransactions = res
          .map((e) => {
            const data = e.payload.doc.data() as {
              user_id: string;
              type: string;
              title: string;
              subTitle: string;
              amount: number;
            };
            return {
              id: e.payload.doc.id,
              user_id: data.user_id,
              type: data.type,
              title: data.title,
              subTitle: data.subTitle,
              amount: data.amount,
            };
          })
          .filter((e) => e.user_id === this.user.id);
        this.income = this.moneyTransactions
          .filter((e: any) => e.type === 'income')
          .reduce((sum: any, current: any) => sum + current.amount, 0);
        this.expense = this.moneyTransactions
          .filter((e: any) => e.type === 'expense')
          .reduce((sum: any, current: any) => sum + current.amount, 0);
        console.log(this.moneyTransactions);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  async ngOnInit() {
    await this.storage.create();
    this.storage.get('user').then((val) => {
      this.user = val;
    });
  }
  SignOut() {
    this.storage.remove('user');
    this.navCtrl.navigateRoot('login');
  }
}
