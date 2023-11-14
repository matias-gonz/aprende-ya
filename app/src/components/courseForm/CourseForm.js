import React, {useState} from 'react';
import {
  Typography,
  TextField,
  Container, MenuItem, Select,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {useNavigate} from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import axios from "axios";

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px', // Agrega padding alrededor del formulario
};

function CourseForm({isUserLoggedIn}) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: 0,
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setCourseData({...courseData, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = 'http://localhost:8000/course';

    setLoading(true)

    axios
      .post(apiUrl, courseData, { withCredentials: true })
      .then((response) => {
        console.log('Create course:', response.data);
        setLoading(false)
        navigate('/');
      })
      .catch((error) => {
        setLoading(false)
        console.error('Error trying to create a new course:', error);
      });
  };

  return (
    <div>
      <NavBar isUserLoggedIn={isUserLoggedIn}/>
      <Container maxWidth="sm">
        <Typography variant="h5" component="div" padding={2} display="flex" alignItems="center" justifyContent="center">
          Agregar Nuevo Curso
        </Typography>
        <form onSubmit={handleSubmit} style={formStyle}>
          <TextField
            fullWidth
            label="Título del Curso"
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
          <Select
            fullWidth
            value={courseData.category}
            name={'category'}
            onChange={handleInputChange}
            style={{marginBottom: '16px'}}
          >
            <MenuItem value={0}>Programación</MenuItem>
            <MenuItem value={1}>Matemática</MenuItem>
            <MenuItem value={2}>Marketing</MenuItem>
            <MenuItem value={3}>Economía</MenuItem>
            <MenuItem value={4}>Arte</MenuItem>
          </Select>
          <LoadingButton loading={loading} loadingIndicator="Agregando curso…" type="submit" variant="contained" color="primary">
            Agregar Curso
          </LoadingButton>
        </form>
      </Container>
    </div>
  );
}

export default CourseForm;
