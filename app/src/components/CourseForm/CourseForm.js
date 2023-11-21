import React, {useState} from 'react';
import {
  Typography,
  TextField,
  Container, MenuItem, Select, Box,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {useNavigate} from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import "./CourseForm.css";

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
};

function CourseForm({isUserLoggedIn}) {
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: 0,
    image: '',
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setCourseData({...courseData, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = 'http://localhost:8000/course';

    axios
      .post(apiUrl, courseData, {withCredentials: true})
      .then((response) => {
        console.log('Create course:', response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error trying to create a new course:', error);
      });
  };

  return (
    <Box>
      <NavBar isUserLoggedIn={isUserLoggedIn}/>
      <Container maxWidth="sm">
        <Typography variant={"h3"} className={"CourseForm-title"}>Crear curso</Typography>
        <form onSubmit={handleSubmit} style={formStyle}>
          <TextField
            fullWidth
            label="Título"
            name="title"
            value={courseData.title}
            onChange={handleInputChange}
            style={{marginBottom: '16px'}}
          />
          <TextField
            fullWidth
            multiline
            rows={5}
            label="Descripción"
            name="description"
            value={courseData.description}
            onChange={handleInputChange}
            style={{marginBottom: '16px'}}
          />
          <TextField
            fullWidth
            label="Imágen"
            name="image"
            value={courseData.image}
            onChange={handleInputChange}
            style={{marginBottom: '16px'}}
          />
          <Select
            fullWidth
            value={courseData.category}
            name={'category'}
            onChange={handleInputChange}
            style={{marginBottom: '16px'}}
          >
            <MenuItem value={1}>Programación</MenuItem>
            <MenuItem value={2}>Matemática</MenuItem>
            <MenuItem value={3}>Marketing</MenuItem>
            <MenuItem value={4}>Economía</MenuItem>
            <MenuItem value={5}>Arte</MenuItem>
          </Select>
          <TextField
            fullWidth
            label="Precio"
            name="price"
            value={courseData.price}
            onChange={handleInputChange}
            style={{marginBottom: '16px'}}
          />
          <LoadingButton type="submit" className={"CourseForm-button"}>
            Crear
          </LoadingButton>
        </form>
      </Container>
    </Box>
  );
}

export default CourseForm;
