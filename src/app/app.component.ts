import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private navCtrl: NavController, private storage: Storage) {
    this.ngOnInit();
    this.storage.get('user').then((res) => {
      if (!res) {
        this.navCtrl.navigateRoot('login');
      }
    });
  }
  async ngOnInit() {
    await this.storage.create();
  }
}
