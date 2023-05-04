import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import firebase from 'firebase/compat/app';
import { User } from '../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user = {} as User;

  constructor(private navCtrl: NavController, private storage: Storage) {
    this.storage.get('user').then((res) => {
      if (res) {
        this.navCtrl.navigateRoot('home');
      }
    });
  }

  SignUp() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then(
        (userCredential: firebase.auth.UserCredential) => {
          // Update the user profile
          userCredential.user?.updateProfile({
              displayName: this.user.name,
            })
            .then(
               () => {
                // Update successful.
                this.navCtrl.navigateRoot('/login')
              },
              function (error: any) {
                console.log(error);
              }
            );
        },
        function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            console.error(error);
          }
          // [END_EXCLUDE]
        }
      );
  }

  async ngOnInit() {
    await this.storage.create();
  }
}
