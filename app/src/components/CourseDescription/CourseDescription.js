import React from 'react';
import {Typography, Grid, Paper, AppBar, Tab, Container, Tabs, Box, DialogContent, Dialog, Button} from '@mui/material';
import NavBar from "../NavBar/NavBar";
import CourseMaterialsList from "./CourseMaterial/CourseMaterialsList";
import ReviewTab from "./ReviewTab/ReviewTab";
import './CourseDescription.css';
import PaymentForm from "../PaymentForm/PaymentForm";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import CourseExam from "../CourseExam/CourseExam";
import Cookies from "js-cookie";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
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

    const { course_id } = useParams();

    useEffect(() => {
        const apiUrl = `http://localhost:8000/course/${course_id}`;

        axios.get(apiUrl, {withCredentials: true})
            .then((response) => setCourse(response.data))
            .catch((error) => console.error('Error fetching user data: ', error));
    }, []); // Empty dependency array to execute the effect only once

    const handleClose = () => {
        setBuyDialog(false);
        setExamDialog(false);
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
                            style={{ width: '100%', marginBottom: '20px' }}
                        />
                    </Grid>

                    <Grid item xs={12} sm justify="center">
                        <Paper Paper elevation={0} style={{ padding: '20px', textAlign: 'center' }}>
                            <Typography variant="h4" gutterBottom>
                                {course.title}
                            </Typography>

                            <Typography variant="h5" gutterBottom>
                                ${course.price}
                            </Typography>

                            <Button className={"BuyButton"} variant="contained" color="primary" onClick={handleBuyClick}>
                                Comprar
                            </Button>
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
                <Tab label="Curso" />
                <Tab label="Reseñas" />
                <Tab label="Foro" />
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
                            <Paper elevation={0} style={{ padding: '20px' }}>
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
                    <CourseMaterialsList/>
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
                    <ReviewTab/>
                </Paper>

            </TabPanel>
            <TabPanel value={tabValue} index={2}>

            </TabPanel>

            <Dialog
                open={buyDialog}
                onClose={handleClose}
            >
                <DialogContent>
                    <PaymentForm course_id={course.id} price={course.price} />
                </DialogContent>
            </Dialog>
            <Dialog
                open={examDialog}
                onClose={handleClose}
            >
                <DialogContent>
                    <CourseExam questions={course.exam} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CourseDescription;