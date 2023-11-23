import React from 'react';
import ReactApexChart from 'react-apexcharts';

class AttendanceRadialChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [70], // 출석율 데이터
      options: {
        chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            }
          },
        },
        labels: ['오늘 출석 현황'],
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={350} />
      </div>
    );
  }
}

export default AttendanceRadialChart;
