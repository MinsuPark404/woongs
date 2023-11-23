import React from 'react';
import ReactApexChart from 'react-apexcharts';

class WeeklyAttendanceBarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: '출석율',
        data: [90, 95, 88, 85, 99] // 주별 출석율 데이터
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        xaxis: {
          categories: ["월", "화", "수", "목", "금"], // 요일
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val + "%";
            }
          }
        },
        title: {
          text: '주별 출석율',
          align: 'center',
          style: {
            color: '#444'
          }
        }
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
      </div>
    );
  }
}

export default WeeklyAttendanceBarChart;
