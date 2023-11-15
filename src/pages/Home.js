
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import axios, * as others from 'axios';
import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Home(props) {

    let navigate = useNavigate();

    let [boardData,setBoardData] = useState([]);

    let [keyword,setKeyword] = useState("");
  
    const upperStyle = {
		display: "flex",
        width:'100%' 
	}
    const searchTextFieldDivStyle = {
        width:'25%'
    }

    const searchButtonDivStyle = {
        margin:'5px'
    }
    
    const bottomButtonDivStyle = {
        margin:'10px'
    }


    useEffect(()=>{
        axios.get("/api/board").then(response=>{
            console.log('board data');
            setKeyword('');
            const data = response.data.data;
            setBoardData(data);
        });
    },[])

    const search = () =>{
        axios.get("/api/board",{
            params:{
                keyword:keyword
            }
        }).then(response=>{
            const data = response.data.data;
            setBoardData(data);
        });
      }

    return(
        <div>
            <div style={upperStyle}>
                <div style={searchTextFieldDivStyle}>
                    <TextField fullWidth id="outlined-basic" label="검색어" variant="outlined" onChange={(e)=> 
                    setKeyword(e.target.value)} />
                </div>
                <div style={searchButtonDivStyle}>
                    <Button size='large' variant="contained" onClick={search}>검색</Button>
                </div>
            </div>
        <Table>
            <TableHead>
             <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>등록일</TableCell>
             </TableRow>
            </TableHead>
            <TableBody>
             {boardData.map((e)=>{
                 return(
                     <TableRow>
                         <TableCell onClick={()=> navigate("/modify/"+e.id)}>{e.id}</TableCell>
                         <TableCell>{e.title}</TableCell>
                         <TableCell>{e.regDate}</TableCell>
                     </TableRow>
                 )
             })}
            </TableBody>
        </Table>
        <div style={bottomButtonDivStyle}>
      <Button size='large' variant="contained" onClick={()=> navigate("/insert")}>등록</Button>
        </div>
     </div>
    )
}

export default Home;