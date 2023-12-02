import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, TextField, Button, TablePagination, Typography, Box  } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from "react-redux";

const fetchData = async () => {
    try {
        const response = await axios.get("/api/detects");
        console.log("DETECTS : ",response.data);
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('Error while fetching data from server');
    }
};

const List = () => {
    const [detectedData, setDetectedData] = React.useState([]);
    const userData = useSelector((state) => state.user);
    console.log("USER : ",userData);
    console.log("USER BNO : ",userData.bno)
    useEffect(() => {
        fetchData().then((d) => {
            setDetectedData(d);
        });
    }
    , []);
    console.log("DETECTED : ",detectedData);
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
    // const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedData, setSelectedData] = useState(null);

    // 영상 모달 열기
    const handleOpenModal = (video) => {
        setSelectedData(video);
        setOpenModal(true);
    };

    // 영상 모달 닫기
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Paper >
        <br />
        <Typography variant="h6" >이상탐지 목록</Typography>
        <br/>
        <TableContainer>
            <br />
        <Table>
            <TableHead>
                <TableRow style={{backgroundColor: '#f5f5f5'}}>
                    {/* 테이블 헤더 */}
                    <TableCell align="center">CCTV_ID</TableCell>
                    <TableCell align="center">비디오 경로</TableCell>
                    <TableCell align="center">탐지된 이상 종류</TableCell>
                    <TableCell align="center">탐지 일자</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {detectedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((videos) => (
                    <TableRow key={videos.video_idx} onClick={() => handleOpenModal(videos)}>
                        {/* 테이블 데이터 셀 */}
                        <TableCell align="center">{videos.cctv_id}</TableCell>
                        <TableCell align="center">{videos.video_path}</TableCell>
                        <TableCell align="center">{videos.action_detected}</TableCell>
                        <TableCell align="center">{videos.detected_at}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
        <TablePagination
            component="div"
            count={detectedData.length}
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
                    <source src='/videos/detect1.mp4' type="video/mp4" />
                    브라우저가 비디오를 지원하지 않습니다.
                </video>
            </DialogContent>
        </Dialog>
    </Paper>
    );
};

export default List;