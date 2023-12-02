import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import { Box, Paper, Typography, TextField, MenuItem, FormControl, Select, InputLabel, Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import axios from '../../axios'; // 실제 경로에 맞게 조정해야 합니다.

const Draft = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const [header, setHeader] = useState("");
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();

  console.log('[1] 현재 사용자 데이터:', userData);

  const updateTextDescription = (state) => {
    console.log('[2] 에디터 상태 업데이트:', state);
    setEditorState(state);
  };

  const handleTitleChange = (event) => {
    console.log('[3] 제목 변경:', event.target.value);
    setTitle(event.target.value);
  };

  const handleHeaderChange = (event) => {
    console.log('[4] 말머리 변경:', event.target.value);
    setHeader(event.target.value);
  };

  const handleSubmit = async () => {
    console.log('[5] 제출 버튼 클릭');

    if (!title.trim() || !header.trim()) {
      console.log('[6] 유효성 검사 실패: 제목 또는 말머리 누락');
      alert("제목과 말머리를 입력해주세요.");
      return;
    }

    const htmlContent = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log('[7] 변환된 HTML:', htmlContent);

    if (!htmlContent.trim()) {
      console.log('[8] 유효성 검사 실패: 내용 누락');
      alert("내용을 입력해주세요.");
      return;
    }

    const postData = {
      title,
      header,
      content: htmlContent
    };
    console.log('[9] 서버에 제출될 데이터:', postData);

    try {
      const response = await axios.post('/api/boards/create', postData);
      console.log('[10] 서버 응답:', response);
      alert("게시글이 성공적으로 등록되었습니다.");
      navigate("/main/board");
    } catch (error) {
      console.error('[11] 서버 요청 오류:', error);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ margin: 2, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          게시글 작성
        </Typography>
        <br/>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="header-select-label">말머리</InputLabel>
              <Select
                labelId="header-select-label"
                value={header}
                label="말머리"
                onChange={handleHeaderChange}
                size="small"
              >
                <MenuItem value="공지사항">공지사항</MenuItem>
                <MenuItem value="알람">알람</MenuItem>
                <MenuItem value="특이사항">특이사항</MenuItem>
                <MenuItem value="일반">일반</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="제목"
              value={title}
              onChange={handleTitleChange}
              size="small"
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
              글쓰기
            </Button>
          </Grid>
        </Grid>
        <br/>
        <Editor
          editorState={editorState}
          onEditorStateChange={updateTextDescription}
          editorStyle={{
            height: "500px",
            border: "1px solid lightgray",
            padding: "5px",
            marginTop: "20px",
          }}
        />
        <br/>
        <Grid container justifyContent="flex-end">
            <Grid item>
                  <Link to="/main/board" style={{textDecoration : 'none', color : 'inherit'}}>
                <Button variant="contained" color="secondary" >
                목록으로
                </Button>
                </Link>
            </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Draft;
