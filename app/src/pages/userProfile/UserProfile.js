import React, { useState, useEffect,Component } from 'react';


import {
  Container,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Card,  
  CardActionArea,
  CardMedia,
  CardContent,
  Grid
} from '@mui/material';
import Rating from '@mui/material/Rating';

import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { Email, Lock, Person } from '@mui/icons-material';
import Cookies from 'js-cookie';
import axios from 'axios';

const CourseCard = ({ course }) => {
  return (
    <>
      <Card>
        <CardActionArea href={`/curso/${course.id}`}>
          <CardMedia
            component="img"
            height="140"
            image={course.image}
            alt={course.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {course.title}
            </Typography>
            <Rating name="half-rating-read" value={course.rating || 0} precision={0.5} readOnly />
            <Typography variant="body2">
              {course.description}
            </Typography>
            <Typography variant="body1" className={"CourseList-price"}>
              ${course.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};


const UserProfile = ({ isUserLoggedIn, handleLogoutState }) => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [purchasedCourses, setPurchasedCourses] = useState([]); // Nuevo estado para los cursos comprados
  const [wishlistedCourses, setWishlistedCourses] = useState([]); // Nuevo estado para los cursos comprados

  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const user_id = Cookies.get('user_id');
    const userApiUrl = `http://localhost:8000/user/${user_id}`;

    axios
      .get(userApiUrl, { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch((error) => console.error('Error fetching user data: ', error));

    const coursesApiUrl = `http://localhost:8000/courses/${user_id}`;
    axios
      .get(coursesApiUrl)
      .then((response) => setPurchasedCourses(response.data))
      .catch((error) => console.error('Error fetching purchased courses: ', error));

    const wishlistcoursesApiUrl = `http://localhost:8000/wishlist/user/${user_id}`;
    axios
      .get(wishlistcoursesApiUrl)
      .then((response) => setWishlistedCourses(response.data))
      .catch((error) => console.error('Error fetching purchased courses: ', error));

    axios
    .get('http://localhost:8000/courses')
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses: ', error);
      });
  }, []);


  const handleSave = () => {
    setIsEditing(false);
    const user_id = Cookies.get('user_id');
    const apiUrl = `http://localhost:8000/user/${user_id}`;

    axios
      .put(apiUrl, user, { withCredentials: true })
      .then((response) => {
        setUser(response.data);
        alert('User data has been saved successfully.');
      })
      .catch((error) => console.error('Error saving user data: ', error));
  };

  const handleDeleteUser = () => {
    const user_id = Cookies.get('user_id');
    const apiUrl = `http://localhost:8000/user/${user_id}`;
    axios
      .delete(apiUrl, { withCredentials: true })
      .then((response) => {
        if (window.confirm('Usuario borrado con éxito. ¿Desea redirigir a la página de inicio?')) {
          navigate('/');
        }
      })
      .catch((error) => {
        alert('Error al eliminar usuario');
        console.error('Error deleting user: ', error);
      });
  };

  const handleLogout = () => {
    Cookies.remove('user_id');
    handleLogoutState();
    navigate('/');
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  const filteredCourses = () => {
    const userCourseIds = purchasedCourses.map(course => course.course_id);
    const userCoursesSet = new Set(userCourseIds);
    return courses.filter(course => userCoursesSet.has(course.id));
  };
  const filteredWishedCourses = () => {
    const userCourseIds = wishlistedCourses.map(course => course.course_id);
    const userCoursesSet = new Set(userCourseIds);
    return courses.filter(course => userCoursesSet.has(course.id));
  };
  const drawerItems = [
    { text: 'Mi Perfil', onClick: () => setSelectedTab(0) },
    { text: 'Cursos Comprados', onClick: () => setSelectedTab(1) },
    { text: 'Wish List', onClick: () => setSelectedTab(2) },
  ];

  return (
    <div>
      <NavBar isUserLoggedIn={isUserLoggedIn} />

      <Container maxWidth="sm" elevation={0}>
        <Box mt={4}>
          <Button onClick={toggleDrawer(true)}>Abrir barra lateral</Button>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List>
              {drawerItems.map((item, index) => (
                <ListItem button key={index} onClick={item.onClick}>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Drawer>

          <Tabs value={selectedTab} onChange={handleTabChange} textColor="black" indicatorColor="secondary">
            <Tab label="Mi Perfil" />
            <Tab label="Cursos Comprados" />
            <Tab label="Wish List" />
          </Tabs>

          {selectedTab === 0 && (
            <form>
              <TextField
                label="Nombre"
                fullWidth
                variant="outlined"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                disabled={!isEditing}
                style={{ marginTop: '20px' }}
                InputProps={{
                  startAdornment: <Person />,
                }}
              />
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                disabled={!isEditing}
                style={{ marginBottom: '20px', marginTop: '20px' }}
                InputProps={{
                  startAdornment: <Email />,
                }}
              />
              <TextField
                label="Contraseña"
                fullWidth
                variant="outlined"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                disabled={!isEditing}
                style={{ marginBottom: '20px' }}
                InputProps={{
                  startAdornment: <Lock />,
                }}
              />
              {isEditing ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  style={{
                    marginTop: '20px',
                    color: 'white',
                    backgroundColor: '#8B008B', // Violeta
                    '&:hover': {
                      backgroundColor: '#4B0082', // Violeta más oscuro al pasar el mouse
                    },
                  }}
                >
                  Guardar
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                  style={{
                    marginTop: '20px',
                    color: 'white',
                    backgroundColor: '#8B008B', // Violeta
                    '&:hover': {
                      backgroundColor: '#4B0082', // Violeta más oscuro al pasar el mouse
                    },
                  }}
                >
                  Editar
                </Button>
              )}
            </form>
          )}
          {selectedTab === 1 && (
            <div>
              <Typography variant="h5" style={{ marginTop: '20px' }}>
                Cursos Comprados
              </Typography>
              <Grid container spacing={5} style={{ marginTop: '10px' }}>
              {filteredCourses().map(course => (
        <Grid item xs={12} sm={6} md={4} key={course.id}>
          <CourseCard course={course} />
        </Grid>
      ))}
              </Grid>
            </div>
          )}
          {selectedTab === 2 && (
            <div>
              <Typography variant="h5" style={{ marginTop: '20px' }}>
              Wish List              </Typography>
              <Grid container spacing={5} style={{ marginTop: '10px' }}>
              {filteredWishedCourses().map(course => (
        <Grid item xs={12} sm={6} md={4} key={course.id}>
          <CourseCard course={course} />
        </Grid>
      ))}
              </Grid>
            </div>
          )}
          
        </Box>
        
        {selectedTab === 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            style={{
              marginTop: '20px',
              color: 'white',
              backgroundColor: '#8B008B', // Violeta
              '&:hover': {
                backgroundColor: '#4B0082', // Violeta más oscuro al pasar el mouse
              },
            }}
          >
            Cerrar Sesión
          </Button>
        )}
        {selectedTab === 0 && (
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteUser}
              style={{
                marginTop: '20px',
                backgroundColor: '#8B008B', // Violeta
                '&:hover': {
                  backgroundColor: '#4B0082', // Violeta más oscuro al pasar el mouse
                },
                color: 'white'
              }}
            >
              Eliminar usuario
            </Button>
          </Box>
        )}


      </Container>
    </div>
  );
};

export default UserProfile;
