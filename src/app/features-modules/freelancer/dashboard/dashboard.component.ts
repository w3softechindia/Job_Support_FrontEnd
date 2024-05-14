/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
} from 'ng-apexcharts';
import { UserService } from 'src/app/Services/user.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AdminPostProject } from 'src/app/core/models/models';
import { AuthService } from 'src/app/core/services/auth/auth.service';

export type ChartOptions = {
   
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  dataLabels: ApexDataLabels | any;
  grid: ApexGrid | any;
  stroke: ApexStroke | any;
  title: ApexTitleSubtitle | any;
  colors: any;
  markers: any;
  yaxis: any;
};
export type radialChartOptions = {
   
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  labels: string[] | any;
  plotOptions: ApexPlotOptions | any;
  colors: string[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit{
  public routes = routes;
  email!:string;
  projects:AdminPostProject[]=[];
  count!:any;
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public radialchartOptions: Partial<ChartOptions> | any;

  constructor(private userService:UserService,private auth:AuthService) {
    this.chartOptions = {
      series: [
        {
          name: 'profile view',
          data: [100, 150, 200, 250, 200, 250, 200, 200, 200, 200, 300, 350],
        },
      ],
      chart: {
        height: 360,
        type: 'line',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#FF5B37'],
      stroke: {
        curve: 'straight',
        width: [1],
      },
      markers: {
        size: 4,
        colors: ['#FF5B37'],
        strokeColors: '#FF5B37',
        strokeWidth: 1,
        hover: {
          size: 7,
        },
      },
      grid: {
        position: 'front',
        borderColor: '#ddd',
        strokeDashArray: 7,
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    };

    this.radialchartOptions = {
      series: [85, 75, 60, 40],
      chart: {
        toolbar: {
          show: false,
        },
        height: 250,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '50%',
            background: 'transparent',
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: ['#7B46BE', '#FA6CA4', '#FACD3A', '#24C0DC'],
      labels: ['Applied Jobs', 'Messenger', 'Facebook', 'LinkedIn'],
      legend: {
        show: false,
        floating: true,
        fontSize: '16px',
        position: 'bottom',
        offsetX: 160,
        offsetY: 15,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0,
        },
        itemMargin: {
          vertical: 3,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    };
  }
  ngOnInit(): void {
    this.email=this.auth.getEmail();
    this.loadOngoingProjects(this.email);
    this.getCountOfCompletedProjects();
    this.fetchChartData();
  }

  private getCountOfCompletedProjects(){
    this.userService.getCompletedProjectsByFreelancer(this.email).subscribe((data)=>{
      this.count=data;
    })
  }

  private loadOngoingProjects(email:string){
    this.userService.freelancerOnGoingProjects(email).subscribe((data:any)=>{
      this.projects=data;
    },error=>{
      console.log("No Projects Found..!!!",error)
    })
  }

  private fetchChartData(){
    this.userService.getChartData(this.email).subscribe((data)=>{
      console.log(data)
      this.radialchartOptions = {
        series: data.series,
        chart: {
          toolbar: {
            show: false,
          },
          height: 250,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '50%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              },
            },
          },
        },
        colors: ['#7B46BE', '#FFD700', '#28a745', '#24C0DC'],
        labels: ['Proposals', 'Approved Proposals', 'Completed Jobs', 'Ongoing Jobs'],
        legend: {
          show: false,
          floating: true,
          fontSize: '16px',
          position: 'bottom',
          offsetX: 160,
          offsetY: 15,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0,
          },
          itemMargin: {
            vertical: 3,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                show: false,
              },
            },
          },
        ],
      };
    })
  }
}
