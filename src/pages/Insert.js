import { Editor } from 'novel';
import { useState, useRef } from 'react';
import axios, * as others from 'axios';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Insert(props) {
  

    let contents = '';
    let navigate = useNavigate();

    const ref = useRef(null);
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


    const submit = () =>{
      console.log(ref.current);
      axios.post("/api/board",{
        id: null,
        title: title,
        content: contents,
        regDate:null
      }).then(response=>{
          console.log('complete')
          returnToHome();
      });
    }

    return (
      <div ref={ref}>
        <div style={titleDivStyle}>
        <TextField fullWidth id="outlined-basic" label="제목" variant="outlined" onChange={(e)=> 
          setTitle(e.target.value)} />
        </div>
        <Editor 
        defaultValue=""
        onUpdate={(editor) => contents = editor.getHTML()}></Editor>
      {/* <button onClick={submit}>저장</button> */}
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


export default Insert;   