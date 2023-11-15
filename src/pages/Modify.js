import React, { Component, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from 'novel';
import { useState, useRef } from 'react';
import axios, * as others from 'axios';
import { Button, TextField } from '@mui/material';

function Modify(props) {
    let contents = '';
    let [cont,setCont] = useState("");
    let navigate = useNavigate();


    const ref = useRef(null);
    let {id} = useParams();
    let [boardData,setBoardData] = useState({});
    let [title,setTitle] = useState("");

    const titleDivStyle = {
      width:'77.5%'
  }
  const bottomDivstyle = {
    display:'flex',
    'justify-content':'space-around',
    width: '13%'
  }

  const returnToHome = () => {
    navigate(`/`);
  };

    useEffect(()=>{
        axios.get(`/api/board/${id}`).then(response=>{
            console.log('board data');
            const data = response.data.data;
            setBoardData(data);
            setTitle(data.title);
            contents = response.data.data.content;
            setCont(response.data.data.content);
            returnToHome();
        });
    },[])


    const submit = () =>{
      console.log(ref.current);
      axios.post("/api/board",{
        id:`${id}`,
        content: contents,
        title: `${title}`,
        regDate:null
      }).then(response=>{
          console.log('complete')
      });
    }

    return (
      <div ref={ref}>
        <div style={titleDivStyle}>
          <TextField fullWidth id="outlined-basic" label="제목" variant="outlined" value={title} onChange={(e)=> 
          setTitle(e.target.value)} />
        </div>
        <Editor 
        defaultValue={cont}
        disableLocalStorage={true}
        onUpdate={(editor) =>{  contents = editor.getHTML()}}>
          
        </Editor>
        <div style={bottomDivstyle}>
            <div>
              <Button size='large' variant="contained" onClick={submit}>저장</Button>
            </div>
            <div>
              <Button size='large' variant="contained" onClick={()=> navigate("/")}>뒤로</Button>
            </div>
        </div>

      </div>
    );
}

export default Modify;       