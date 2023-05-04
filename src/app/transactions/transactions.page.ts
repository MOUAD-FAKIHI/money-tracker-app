import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  moneyTransactions: any;
  user_id!: string;
  constructor(
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
          .filter((e) => e.user_id === this.user_id);
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
      this.user_id = val.id;
    });
  }
  delete_transaction(transactionId: any) {
    this.firebaseService.delete_transaction(transactionId).then((res: any) => {
      console.log(res);
    });
  }
}
