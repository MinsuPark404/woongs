import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, TextField, Button, TablePagination, Typography, Box  } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useSelector } from "react-redux";
// Dayjs 플러그인 확장
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const fetchData = async () => {
    try {
        const response = await axios.get("/api/videos");
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('Error while fetching data from server');
    }
};

const List = () => {
    const [videos, setVideos] = React.useState([]);
    // const [searchTerm, setSearchTerm] = React.useState("");
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const userData = useSelector((state) => state.user);
    console.log("USER : ",userData);
    console.log("USER BNO : ",userData.bno)
    useEffect(() => {
        // fetchData().then((data) => setVideos(data));
        // 전체 목록에서 해당 사업자의 비디오만 필터링
        if (userData.bno !== '') {
            fetchData()
            .then((data) => {
                // console.log("DATA : ",data);
                // console.log("BNO TYPE: ",typeof(data[0].business_bno));
                // console.log("User BNO TYPE: ",typeof(userData.bno));
                const videos = data.filter((video) => video.business_bno === userData.bno);
                // console.log("VIDEOS : ",videos);
                setVideos(videos);
            
            });
        } else {
            fetchData().then((data) => setVideos(data));
        }
    }
    , []);
    /*
    sample data
    usiness_bno: "123-45-67890"
    video_archived_at: "2023-11-22T03:00:00.000Z"
    video_created_at: "2023-11-22T05:00:00.000Z"
    video_idx: 1
    video_name: "해피 어린이집_2023-11-22"
    video_path: "/videos/happy_kids_20231122.mp4"
    video_recoded_at: "2023-11-22T01:00:00.000Z"
    */
    console.log("VIDEOS : ",videos);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        console.log("handleChangePage : ",newPage);
        setPage(newPage);
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // 페이지 번호를 다시 0으로 리셋
    };

    const [openModal, setOpenModal] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    // 영상 모달 열기
    const handleOpenModal = (video) => {
        setSelectedVideo(video);
        setOpenModal(true);
    };

    // 영상 모달 닫기
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSearch = () => {
        // 필터링 로직 트리거
        const filtered = videos.filter((video) => {
            const recodedAt = dayjs(video.video_recoded_at);
            const createdAt = dayjs(video.video_created_at);
        
            let isAfterStart = true, isBeforeEnd = true;
            if (startDate && startTime) {
                const startDateTime = dayjs(startDate).hour(dayjs(startTime).hour()).minute(dayjs(startTime).minute());
                isAfterStart = recodedAt.isSameOrAfter(startDateTime);
            }
        
            if (endDate && endTime) {
                const endDateTime = dayjs(endDate).hour(dayjs(endTime).hour()).minute(dayjs(endTime).minute());
                isBeforeEnd = createdAt.isSameOrBefore(endDateTime);
            }
            console.log("isAfterStart : ",isAfterStart);
            console.log("isBeforeEnd : ",isBeforeEnd);
            return isAfterStart && isBeforeEnd;
        });
        setFilteredVideos(filtered);
    };
    const [filteredVideos, setFilteredVideos] = useState(videos);

    useEffect(() => {
        setFilteredVideos(videos);
    }, [videos]);

    return (
        <Paper >
        <br />
        <Typography variant="h6" >비디오 목록</Typography>
        <br/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', padding: 2 }}>
                    <DatePicker
                        label="시작 날짜 선택"
                        value={startDate}
                        onChange={setStartDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                        label="시작 시간 선택"
                        value={startTime}
                        onChange={setStartTime}
                        renderInput={(params) => <TextField {...params} />}
                    />

                    <Typography variant="h4" sx={{ alignSelf: 'center' }}>~</Typography>

                    <DatePicker
                        label="종료 날짜 선택"
                        value={endDate}
                        onChange={setEndDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                        label="종료 시간 선택"
                        value={endTime}
                        onChange={setEndTime}
                        renderInput={(params) => <TextField {...params} />}
                    />
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    검색
                </Button>
                </Box>
            </LocalizationProvider>
        <TableContainer>
            <br />
        <Table>
            <TableHead>
                <TableRow style={{backgroundColor: '#f5f5f5'}}>
                    {/* 테이블 헤더 */}
                    <TableCell align="center">사업자 번호</TableCell>
                    <TableCell align="center">비디오 이름</TableCell>
                    <TableCell align="center">비디오 경로</TableCell>
                    <TableCell align="center">비디오 촬영 일자</TableCell>
                    <TableCell align="center">비디오 종료 일자</TableCell>
                    <TableCell align="center">비디오 아카이빙 일자</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {filteredVideos
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((videos) => (
                    <TableRow key={videos.video_idx} onClick={() => handleOpenModal(videos)}>
                        {/* 테이블 데이터 셀 */}
                        <TableCell align="center">{videos.business_bno}</TableCell>
                        <TableCell align="center">{videos.video_name}</TableCell>
                        <TableCell align="center">{videos.video_path}</TableCell>
                        <TableCell align="center">{videos.video_recoded_at}</TableCell>
                        <TableCell align="center">{videos.video_created_at}</TableCell>
                        <TableCell align="center">{videos.video_archived_at}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
        <TablePagination
            component="div"
            count={filteredVideos.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="lg">
            <DialogTitle>영상 재생</DialogTitle>
            <DialogContent>
                {/* {selectedVideo && (
                    <video width="100%" controls>
                        <source src={selectedVideo.video_path} type="" />
                        브라우저가 비디오를 지원하지 않습니다.
                    </video>
                )} */}
                <video width="100%" controls>
                    <source src='/videos/nomal1.mp4' type="video/mp4" />
                    브라우저가 비디오를 지원하지 않습니다.
                </video>
            </DialogContent>
        </Dialog>
    </Paper>
    );
};

export default List;