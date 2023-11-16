import React from 'react';
import {Typography, Grid, Paper, AppBar, Tab, Container, Tabs, Box} from '@mui/material';
import NavBar from "../NavBar/NavBar";
import CourseMaterialsList from "./CourseMaterial/CourseMaterialsList";
import ReviewTab from "./ReviewTab/ReviewTab";

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

const CourseDescription = () => {
    const [tabValue, setTabValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div>
            <NavBar/>
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
                            src="https://pathwright.imgix.net/https%3A%2F%2Fcdn.filestackcontent.com%2Fapi%2Ffile%2FaG1M12goSV2FQ4lXQA2N%3Fsignature%3D888b9ea3eb997a4d59215bfbe2983c636df3c7da0ff8c6f85811ff74c8982e34%26policy%3DeyJjYWxsIjogWyJyZWFkIiwgInN0YXQiLCAiY29udmVydCJdLCAiZXhwaXJ5IjogNDYyMDM3NzAzMX0%253D?dpr=2&fit=crop&h=232&ixlib=python-1.1.0&w=310&s=d2196586804112441fb6ed1b12a78f01"
                            alt="Foto del curso"
                            style={{ width: '100%', marginBottom: '20px' }}
                        />
                    </Grid>

                    <Grid item xs={12} sm>
                        <Paper elevation={0} style={{ padding: '20px' }}>
                            <Typography variant="h4" gutterBottom>
                                Título del Curso
                            </Typography>
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
                                    Esta es una descripción detallada del curso. Puedes agregar más información sobre el contenido,
                                    los objetivos del curso, los requisitos previos, etc.
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
        </div>
    );
};

export default CourseDescription;