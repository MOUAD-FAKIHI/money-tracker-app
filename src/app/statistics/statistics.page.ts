import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { User } from '../models/user.model';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
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
        this.barChartMethod();
        this.doughnutChartMethod();
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

  @ViewChild('barCanvas') private barCanvas!: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas!: ElementRef;
  barChart: any;
  doughnutChart: any;

  barChartMethod() {
    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Income', 'Expense'],
        datasets: [
          {
            label: '# of Votes, # of Votes',
            data: [this.income, this.expense],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
            ],
            hoverBackgroundColor: ['rgba(255, 99, 132)',
            'rgba(54, 162, 235)',],
            borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              display: true,
            },
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Income', 'Expense'],
        datasets: [
          {
            data: [this.income, this.expense],
            backgroundColor: [
              'rgba(255, 159, 64, 0.5)',
              'rgba(255, 99, 132, 0.5)',
            ],
            hoverBackgroundColor: ['#FFCE56', '#FF6384'],
          },
        ],
      }
    });
  }
}
