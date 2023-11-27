import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import { Box, Paper, Typography, TextField, MenuItem, FormControl, Select, InputLabel, Button, Grid } from "@mui/material";

const Draft = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const [header, setHeader] = useState("");

  const updateTextDescription = async (state) => {
    await setEditorState(state);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleHeaderChange = (event) => {
    setHeader(event.target.value);
  };

  const handleSubmit = () => {
    // 게시글 등록 로직
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log("제목:", title, "말머리:", header, "내용:", html);
    // 게시글 등록 처리
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
                <MenuItem value="공지">공지</MenuItem>
                <MenuItem value="알림">알림</MenuItem>
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
        {/* 목록으로 돌아가기 */}
        <Grid container justifyContent="flex-end">
            <Grid item>
                <Button variant="contained" color="secondary" >
                목록으로
                </Button>
            </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Draft;
