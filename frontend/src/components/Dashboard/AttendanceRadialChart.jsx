import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from '../../axios';

const AttendanceRadialChart = () => {
  const [series, setSeries] = useState([70]); // 출석율 데이터
  const [options] = useState({
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%',
        }
      },
    },
    labels: ['오늘 출석 현황'],
  });
  const [attendance, setAttendance] = useState(''); // 출석 현황 데이터
  const total = 20; // 전체 인원
  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        const dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const res = await axios.get(`/api/children/attendance/${dateString}`);
        console.log('출석 데이터', res.data);
        setAttendance(res.data);
        // 현제 출석인원 / 전체 인원
        console.log('출석율',(res.data.length) / total * 100)
        setSeries([(res.data.length) / total * 100]);
      } catch (error) {
        // 오류 처리
        console.error('Error fetching attendance data:', error);
      }
    };
    // setSeries([attendance.attendance / total * 100]);
    fetchData();
    // const attendanceRate = attendance.length / total * 100;
    // console.log('출석율', attendanceRate);
    // setSeries([attendanceRate]);
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="radialBar" height={350} />
    </div>
  );
};

export default AttendanceRadialChart;