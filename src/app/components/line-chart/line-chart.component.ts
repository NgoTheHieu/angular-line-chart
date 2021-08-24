import { Component, OnInit, OnDestroy } from '@angular/core';
import * as echarts from 'echarts';
@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnDestroy {
  options: any;
  updateOptions: any;
  date: any = [];
  private oneDot = 5 * 1000;
  private now: any;
  private value: any ;
  private data: any[] = [];
  private timer: any;

  constructor() { }

  ngOnInit(): void {
    this.realTimeHandler();
  }

  realTimeHandler(){
    // generate some random testing data:
    this.data = [Math.random() * 3000];
    this. now = Date.now() - (1000000 * 5 * 1000);
    this.now = new Date(this.now);
    this.date.push([this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'));
    this.data.push(Math.round((Math.random() - 0.5) * 20 + this.data[0]));
    for (let i = 0; i < 1000000 ; i++) {
      this.randomData(i);
    }
    console.log(this.data);
    // initialize chart options:
    this.options = {
      tooltip: {
          trigger: 'axis',
          position:  (pt:any) => {
              return [pt[0], '10%'];
          }
      },
      title: {
          left: 'center',
          text: '大数据量面积图',
      },
      toolbox: {
          feature: {
              dataZoom: {
                  yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.date
      },
      yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
      },
      dataZoom: [{
          type: 'inside',
          start: 0,   
          end: 10
      }, {
          start: 0,
          end: 10
      }],
      series: [
          {
              name: '模拟数据',
              type: 'line',
              symbol: 'none',
              sampling: 'lttb',
              itemStyle: {
                  color: 'rgb(255, 70, 131)'
              },
              areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgb(255, 158, 68)'
                  }, {
                      offset: 1,
                      color: 'rgb(255, 70, 131)'
                  }])
              },
              data: this.data
          }
      ]
  };

    // Mock dynamic data:
    this.timer = setInterval(() => {
      for (let i = 0; i < 1; i++) {
        this.data.shift();
        this.randomData(i);
      }

      // update series data:
      this.updateOptions = {
        series: [{
          data: this.data
        }]
      };
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  randomData(i : any) {
    this.value = Math.floor(Math.random() * 20);
    this.now = new Date(this.now.getTime() + this.oneDot);
    this.date.push([this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/') + ' at ' + [this.now.getHours(), this.now.getMinutes(), this.now.getSeconds()].join(':'));
    this.data.push(Math.floor(Math.random() * 3000));
  }
}