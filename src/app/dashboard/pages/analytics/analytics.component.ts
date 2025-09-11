import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { DashbordServiceService } from '../../../services/dashbord/dashbord-service.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../website/srever/auth.service';
import { Router } from '@angular/router';

// Register chart components
Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: false,
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('myChart') chartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('categorybarmovie') categorybarmovie!: ElementRef<HTMLCanvasElement>;
  @ViewChild('visitsChart') visitsChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('visitsChartParHoure') visitsChartParHoure!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  constructor(private moviesService: DashbordServiceService,
    private http: HttpClient,
    private user: AuthService,
    private router: Router

  ) { }
  ngOnInit() {
    if (!this.user.user.isAdmin) {
      this.router.navigateByUrl('/')
    }
  }
  ngAfterViewInit(): void {
    this.moviesService.getStatsByDate().subscribe(data => {
      const Labels = data.map(d => d.date);
      const counts = data.map(d => d.count);
      const backgroundColors = counts.map(() => this.getRandomColor(0.7));
      const borderColors = counts.map(() => this.getRandomColor(1));
      const config: ChartConfiguration<'doughnut'> = {
        type: 'doughnut', // ✅ no need for "as ChartType"
        data: {
          labels: Labels,
          datasets: [{
            label: 'Movies Count',
            data: counts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1
          }]
        },

        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' },
            title: { display: true, text: 'Movies per date' }
          }
        },
      };

      this.chart = new Chart(this.chartRef.nativeElement, config);
    })
    this.moviesService.getMovies().subscribe(movies => {
      // نعدّ الأفلام حسب التصنيف
      const categoryCounts: { [key: string]: number } = {};
      movies.forEach((movie: any) => {
        const category = movie.collectionName || 'Uncategorized';
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });

      const Labels = Object.keys(categoryCounts);
      const Data = Object.values(categoryCounts);
      // Labels.unshift("")
      // Data.unshift(0);
      const backgroundColors = Labels.map(() => this.getRandomColor(0.7));
      const borderColors = Labels.map(() => this.getRandomColor(1));
      const config: ChartConfiguration<'bar'> = {
        type: 'bar', // ✅ no need for "as ChartType"
        data: {

          labels: Labels,
          datasets: [{
            label: 'Unfilled',
            data: Data,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            barPercentage: 0.5, // Adjust this value to control bar width

            borderWidth: 1
          }]
        },

        options: {

          responsive: true,

          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              display: false
            },
            title: { display: true, text: 'Movies per category' }
          }
        },
      };

      this.chart = new Chart(this.categorybarmovie.nativeElement, config);
    })
    this.moviesService.numberOFVisits().subscribe(data => {
      const grouped: Record<string, number> = {};

      data.forEach((v: any) => {
        const d = new Date(v.date);
        const day = d.toLocaleDateString('en-GB'); // اليوم فقط
        grouped[day] = (grouped[day] || 0) + v.count;
      });

      const labels: string[] = Object.keys(grouped);
      const counts: number[] = Object.values(grouped);

      const config: ChartConfiguration<'line'> = {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Visits',
            data: counts,
            backgroundColor: "#ff6385db",
            borderWidth: 3,
            borderColor: "#910624ff",
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            fill: true,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: 'Visits per Day' },
            legend: { display: false }
          },
          scales: {
            x: { title: { display: true, text: 'Day' } },
            y: { title: { display: true, text: 'Count' }, beginAtZero: true }
          }
        }
      };

      this.chart = new Chart(this.visitsChart.nativeElement, config);
    });

    this.moviesService.numberOFVisits().subscribe(data => {
      const Labels = data.map((v: any) => {
        const d = new Date(v.date);
        return d.toLocaleString('en-GB', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', hour12: false
        });
      }
      );


      const counts = data.map((v: any) => v.count);

      const config: ChartConfiguration<'line'> = {
        type: 'line',
        data: {
          labels: Labels,
          datasets: [{
            label: 'Visits Count',
            data: counts,
            borderColor: "#ff6385",
            borderWidth: 3,
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', display: false },
            title: { display: true, text: 'Visits per Hour' }
          },
          interaction: {
            intersect: false,
          },
          scales: {
            x: { title: { display: true, text: 'Date & Hour' } },
            y: { title: { display: true, text: 'Count' }, beginAtZero: true },

          }
        },
      };

      this.chart = new Chart(this.visitsChartParHoure.nativeElement, config);
    });

  }
  private getRandomColor(alpha: number): string {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
