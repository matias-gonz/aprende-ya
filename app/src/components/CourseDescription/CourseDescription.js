import React from 'react';
import {Typography, Grid, Paper, Tab, Tabs, Box, DialogContent, Dialog, Button} from '@mui/material';
import NavBar from "../NavBar/NavBar";
import CourseMaterialsList from "./CourseMaterial/CourseMaterialsList";
import ReviewTab from "./ReviewTab/ReviewTab";
import './CourseDescription.css';
import PaymentForm from "../PaymentForm/PaymentForm";
import Forum from './Forum/Forum';

import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import CourseExam from "../CourseExam/CourseExam";
import Cookies from "js-cookie";
import ReviewModal from "../ReviewModal/ReviewModal";

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
  const [examDialog, setExamDialog] = React.useState(false)
  const [reviewModal, setReviewModal] = React.useState(false)
  const [isEnrolled, setIsEnrolled] = React.useState(false)

  const {course_id} = useParams();
  const user_id = Cookies.get('user_id');

  useEffect(() => {
    const apiUrl = `http://localhost:8000/course/${course_id}`;

    axios.get(apiUrl, {withCredentials: true})
      .then((response) => setCourse(response.data))
      .catch((error) => console.error('Error fetching user data: ', error));

    axios.get(`http://localhost:8000/course/${course_id}/user/${user_id}`, {withCredentials: true})
      .then((response) => {
        if (response.data['is_finished'] !== null) {
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

  const handleCloseExam = () => {
    setExamDialog(false);
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleBuyClick = () => {
    setBuyDialog(true)
  };


  return (
    <div>
      <NavBar isUserLoggedIn={isUserLoggedIn}/>
      <Paper
        style={{paddingTop: '80px'}}
        elevation={0}
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: '40%',
          flexGrow: 1,
        }}
      >
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
                isEnrolled ? null :
                  <Button className={"BuyButton"} variant="contained" color="primary" onClick={handleBuyClick}>
                    Comprar
                  </Button>
              }
            </Paper>
          </Grid>
        </Grid>
      </Paper>


      <Tabs
        value={tabValue}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        centered
      >
        <Tab label="Curso"/>
        <Tab label="Reseñas"/>
        <Tab label="Foro"/>
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
          {isEnrolled ? <CourseMaterialsList/> : null}
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

      <Dialog
        open={buyDialog}
        onClose={handleCloseBuy}
      >
        <DialogContent>
          <PaymentForm course_id={course.id} price={course.price}/>
        </DialogContent>
      </Dialog>
      <Dialog
        open={examDialog}
        onClose={handleCloseExam}
      >
        <DialogContent>
          <CourseExam questions={course.exam}/>
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