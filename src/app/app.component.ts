// app.component.ts

import { Component } from '@angular/core';
import axios from 'axios';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  videoUrl = '';
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    label:false
  };

    public mbarChartLabels:string[] = ['Views', 'Likes', 'Comments', 'Favourite'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(105,159,177,0.2)',
      borderColor: 'rgba(105,159,177,1)',
      pointBackgroundColor: 'rgba(105,159,177,1)',
      pointBorderColor: '#fafafa',
      pointHoverBackgroundColor: '#fafafa',
      pointHoverBorderColor: 'rgba(105,159,177)'
    },
    {
      backgroundColor: 'rgba(77,20,96,0.3)',
      borderColor: 'rgba(77,20,96,1)',
      pointBackgroundColor: 'rgba(77,20,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,20,96,1)'
    }
  ];
    public barChartData:any[] = [
      {data: [0,0,0,0],label: null},
    ];

    // events
    public chartClicked(e:any):void {
      console.log(e);
    }

    public chartHovered(e:any):void {
      console.log(e);
    }

  searchVideo() {
    const videoId = this.extractVideoId(this.videoUrl);
    if (videoId) {
      axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=AIzaSyBKWj9E2G95AZN-6RHSrLI4k39xCjr9FHg`)
        .then(response => {
          const statistics = response.data.items[0]?.statistics; // Optional chaining here
         const data=[
            parseInt(statistics.viewCount),
            parseInt(statistics.likeCount),
            parseInt(statistics.dislikeCount),
            parseInt(statistics.commentCount)
        ];
        let clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].data = data;
      this.barChartData = clone;
          // this.videoStats[0].value= statistics.
          // this.renderChart();
          console.log(response);

        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  // renderChart() {
  //   const ctx = document.getElementById('chart') as HTMLCanvasElement;
  //   new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: ['Views', 'Likes', 'Favourites', 'Comments'],
  //       datasets: [{
  //         data: [
  //           parseInt(this.videoStats.viewCount),
  //           parseInt(this.videoStats.likeCount),
  //           parseInt(this.videoStats.favoriteCount),
  //           parseInt(this.videoStats.commentCount)
  //         ],
  //         backgroundColor: [
  //           'rgba(75, 192, 192, 0.2)',
  //           'rgba(255, 99, 132, 0.2)',
  //           'rgba(255, 205, 86, 0.2)',
  //           'rgba(54, 162, 235, 0.2)'
  //         ],
  //         borderColor: [
  //           'rgba(75, 192, 192, 1)',
  //           'rgba(255, 99, 132, 1)',
  //           'rgba(255, 205, 86, 1)',
  //           'rgba(54, 162, 235, 1)'
  //         ],
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
  // }
  extractVideoId(url: string) {
    const regex = /^(?:(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu.be\/)([a-zA-Z0-9_-]{11}).*/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  //     renderChart() {
  //         const ctx = document.getElementById('chart');
  //         const chart = new Chart(ctx, {
  //             type: 'bar',
  //             data: {
  //                 labels: ['Views', 'Likes', 'Dislikes', 'Comments'],
  //                 datasets: [{
  //                     label: 'YouTube Video Stats',
  //                     data: [
  //                         parseInt(this.videoStats.viewCount),
  //                         parseInt(this.videoStats.likeCount),
  //                         parseInt(this.videoStats.dislikeCount),
  //                         parseInt(this.videoStats.commentCount)
  //                     ],
  //                     backgroundColor: [
  //                         'rgba(75, 192, 192, 0.2)',
  //                         'rgba(255, 99, 132, 0.2)',
  //                         'rgba(255, 205, 86, 0.2)',
  //                         'rgba(54, 162, 235, 0.2)'
  //                     ],
  //                     borderColor: [
  //                         'rgba(75, 192, 192, 1)',
  //                         'rgba(255, 99, 132, 1)',
  //                         'rgba(255, 205, 86, 1)',
  //                         'rgba(54, 162, 235, 1)'
  //                     ],
  //                     borderWidth: 1
  //                 }]
  //             },
  //             options: {
  //                 scales: {
  //                     y: {
  //                         beginAtZero: true
  //                     }
  //                 }
  //             }
  //         });
  //     }
}
