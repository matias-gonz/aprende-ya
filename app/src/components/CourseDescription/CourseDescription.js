import React from 'react';
import {Typography, Grid, Paper, Tab, Tabs, Box, DialogContent, Dialog, Button} from '@mui/material';
import NavBar from "../NavBar/NavBar";
import CourseMaterialsList from "./CourseMaterial/CourseMaterialsList";
import ReviewTab from "./ReviewTab/ReviewTab";
import './CourseDescription.css';
import PaymentForm from "../PaymentForm/PaymentForm";
import Forum from './Forum/Forum';
import {useNavigate} from "react-router-dom";

import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import CourseExam from "../CourseExam/CourseExam";
import Cookies from "js-cookie";
import ReviewModal from "../ReviewModal/ReviewModal";
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';

const TabPanel = (props) => {
  const {children, value, index, ...other} = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} {...other}>
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};


const CourseDescription = ({isUserLoggedIn}) => {
  const [tabValue, setTabValue] = React.useState(0);
  const [buyDialog, setBuyDialog] = React.useState(false)
  const [course, setCourse] = useState({});
  const [reviewModal, setReviewModal] = React.useState(false)
  const [isEnrolled, setIsEnrolled] = React.useState(false)
  const [isInWishlist, setIsInWishlist] = React.useState(false);

  const {course_id} = useParams();
  const user_id = Cookies.get('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = `http://localhost:8000/course/${course_id}`;

    axios.get(apiUrl, {withCredentials: true})
      .then((response) => setCourse(response.data))
      .catch((error) => console.error('Error fetching user data: ', error));

    axios.get(`http://localhost:8000/course/${course_id}/user/${user_id}`, {withCredentials: true})
      .then((response) => {
        if (response.data['purchase_date'] !== null) {
          setIsEnrolled(true);
        }
      }).catch((error) => {
      console.error('Error fetching user data: ', error);
    });
  }, [course_id, user_id]);

  const handleCloseBuy = () => {
    setBuyDialog(false);
    window.location.reload();
  };

  const handleAddToWishlist = () => {
    axios.post(`http://localhost:8000/wishlist`, {
      course_id: course.id,
      user_id: user_id,
    })
    .then(response => {
      if (response.status === 200) {
        setIsInWishlist(true);
      } else {
        console.error('Error al agregar a la lista de deseos');
      }
    })
    .catch(error => {
      console.error('Error de red:', error);
    });
  };
  
  const handleRemoveFromWishlist = () => {
    axios.delete(`http://localhost:8000/wishlist`, {
      data: {
        course_id: course.id,
        user_id: user_id,
      },
    })
    .then(response => {
      if (response.status === 200) {
        setIsInWishlist(false);
      } else {
        console.error('Error al quitar de la lista de deseos');
      }
    })
    .catch(error => {
      console.error('Error de red:', error);
    });
  };
  
  const handleDeleteCourse = () => {
    axios.delete(`http://localhost:8000/course/${course.id}`, {}
    )
    .then(response => {
      if (response.status === 200) {
        alert("Curso eliminado")
        navigate('/');
          } else {
        alert("No puede eliminar cursos con estudiantes")
        console.error('Error al quitar de la lista de cursos');
      }
    })
    .catch(error => {
      alert("No puede eliminar cursos con estudiantes")
      console.error('Error de red:', error);
    });
  };
  
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleBuyClick = () => {
    setBuyDialog(true)
  };


  return (
    <div>
      <NavBar isUserLoggedIn={isUserLoggedIn}/>
      <Paper elevation={0} sx={{ p: 2, margin: 'auto', maxWidth: '90%', flexGrow: 1 }}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} sm>
            <img
              src={course.image}
              alt="Foto del curso"
              style={{width: '100%', marginBottom: '20px'}}
            />
          </Grid>

          <Grid item xs={12} sm justify="center">
            <Paper Paper elevation={0} style={{padding: '20px', textAlign: 'center'}}>
              <Typography variant="h4" gutterBottom>
                {course.title}
              </Typography>

              <Typography variant="h5" gutterBottom>
                ${course.price}
              </Typography>
              {
  !isEnrolled && (course.owner_id !== user_id) && (
    <div>
      <Button className={"BuyButton"} variant="contained" color="primary" onClick={handleBuyClick}>
        Comprar
      </Button>

      {isInWishlist ? (
        <Button
          className={"BuyButton"}
          variant="contained"
          color="primary"
          onClick={handleRemoveFromWishlist}
        >
          Quitar de la Wish List
        </Button>
      ) : (
        <Button
          className={"BuyButton"}
          variant="contained"
          color="primary"
          onClick={handleAddToWishlist}
        >
          Agregar a la Wish List
        </Button>
      )}
    </div>
  )
}
{course.owner_id !== user_id ? null : (
  <Button className={"BuyButton"} variant="contained" color="primary" onClick={handleDeleteCourse}>
    Eliminar Curso
  </Button>
)}


            </Paper>
          </Grid>
        </Grid>
      </Paper>


      <Tabs value={tabValue} onChange={handleChange} textColor="secondary" indicatorColor="secondary" centered>
        <Tab icon={<HomeIcon />} label="Curso"/>
        <Tab icon={<StarIcon />} label="Reseñas"/>
        <Tab icon={<LiveHelpIcon />} label="Foro"/>
        {isEnrolled ? <Tab icon={<FormatListNumberedRtlIcon/>} label="Examen"/> : null}
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Paper
          style={{paddingTop: '80px'}}
          elevation={0}
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: '50%',
            flexGrow: 1,
          }}
        >
          <Grid container spacing={2} alignItems="center" justify="center">
            <Grid item xs={12} sm>
              <Paper elevation={0} style={{padding: '20px'}}>
                <Typography variant="body1">
                  {course.description}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
        <Paper
          style={{paddingTop: '80px'}}
          elevation={0}
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: '50%',
            flexGrow: 1,
          }}
        >
          {isEnrolled ? <CourseMaterialsList courseSections={course.sections}/> : null}
        </Paper>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Paper style={{paddingTop: '80px'}} elevation={0} sx={{
          p: 2,
          margin: 'auto',
          maxWidth: '50%',
          flexGrow: 1,
        }}
        >
          <ReviewTab course_id={course.id}/>
        </Paper>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Paper
          style={{paddingTop: '80px'}}
          elevation={0}
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: '50%',
            flexGrow: 1,
          }}
        >
          <Forum courseId={course.id} isCourseCreator={course.owner_id === Cookies.get('user_id')}/>
        </Paper>
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <CourseExam questions={course.exam} course_id={course_id}/>
      </TabPanel>

      <Dialog
        open={buyDialog}
        onClose={handleCloseBuy}
      >
        <DialogContent>
          <PaymentForm course_id={course.id} price={course.price}/>
        </DialogContent>
      </Dialog>
      <Dialog
        open={reviewModal}
        onClose={() => setReviewModal(false)}
      >
        <DialogContent>
          <ReviewModal setReviewModal={setReviewModal} course_id={course.id}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseDescription;