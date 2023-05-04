import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import firebase from 'firebase/compat/app';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {} as User;
  constructor(private navCtrl: NavController, private storage: Storage) {
    this.storage.get('user').then((res) => {
      if (res) {
        this.navCtrl.navigateRoot('home');
      }
    });
  }

  SignIn() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.user.email, this.user.password)
      .then((userCredential: firebase.auth.UserCredential) => {
        const user = userCredential.user;
        if (user) {
          console.log('User ID:', user.uid);
          this.storage.set('user', {
            id: user.uid,
            name: user.displayName,
            email: user.email
          });
          this.navCtrl.navigateRoot('home');
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  async ngOnInit() {
    await this.storage.create();
  }
}
