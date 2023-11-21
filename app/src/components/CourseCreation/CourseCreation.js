import React, { useState } from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    TextField,
    Container,
    Paper,
    ListItemText,
    ListItem, List, IconButton, ListItemSecondaryAction, InputAdornment, Select, MenuItem, Grid, Box
} from '@mui/material';
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import {useNavigate} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MultipleChoiceBuilder from "../MultipleChoiceBuilder/MultipleChoiceBuilder";

const steps = ['Título', 'Descripción', 'Contenido', 'Imagen', 'Examen', 'Revisión'];

const CourseCreation = ({isUserLoggedIn}) => {
    const navigate = useNavigate();

    const [sections, setSections] = useState([]); // State to manage sections and videos
    const [activeStep, setActiveStep] = useState(0);
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        category: 1,
        image: '',
        sections: [],
        exam: '[]',
        price: 0
    });
    const [materialLink, setMaterialLink] = useState('');
    const [materials, setMaterials] = useState([]);
    const [exam, setExam] = useState([])

    const handleAddMaterial = () => {
        if (materialLink) {
            setMaterials([...materials, materialLink]);
            setMaterialLink(''); // Limpiar el input después de agregar el enlace
        }
    };

    const handleDeleteMaterial = (index) => {
        const updatedMaterials = materials.filter((_, i) => i !== index);
        setMaterials(updatedMaterials);
    };

    const handleSubmit = () => {
        const apiUrl = 'http://localhost:8000/course';

        const dataToSend = {
            ...courseData,
            exam: JSON.stringify(exam),
            sections: sections // Ensure this is the updated sections state
        };
        console.log(dataToSend)

        axios
            .post(apiUrl, dataToSend, {withCredentials: true})
            .then((response) => {
                console.log('Create course:', response.data);
                navigate('/');
            })
            .catch((error) => {
                console.error('Error trying to create a new course:', error);
            });
    };

    const handleNext = () => {
        console.log(activeStep)
        if (activeStep === (steps.length - 1)) {
            handleSubmit()
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCourseData({...courseData, [name]: value});
    };

    const handleAddSection = () => {
        setSections([...sections, { title: '', videos: [] }]);
    };

    const handleDeleteSection = (sectionIndex) => {
        const updatedSections = sections.filter((_, index) => index !== sectionIndex);
        setSections(updatedSections);
    };

    const handleAddVideo = (sectionIndex) => {
        const newVideo = { title: '', description: '', duration: 0, link: '' };
        const updatedSections = sections.map((section, index) => {
            if (index === sectionIndex) {
                return { ...section, videos: [...section.videos, newVideo] };
            }
            return section;
        });
        setSections(updatedSections);
    };

    const handleDeleteVideo = (sectionIndex, videoIndex) => {
        const updatedSections = sections.map((section, sIndex) => {
            if (sIndex === sectionIndex) {
                return { ...section, videos: section.videos.filter((_, vIndex) => vIndex !== videoIndex) };
            }
            return section;
        });
        setSections(updatedSections);
    };

    const handleVideoInputChange = (sectionIndex, videoIndex, field, value) => {
        const updatedSections = sections.map((section, sIndex) => {
            if (sIndex === sectionIndex) {
                const updatedVideos = section.videos.map((video, vIndex) => {
                    if (vIndex === videoIndex) {
                        return { ...video, [field]: value };
                    }
                    return video;
                });
                return { ...section, videos: updatedVideos };
            }
            return section;
        });
        setSections(updatedSections);
    };

    const categoryNames = ['0', 'Programación', 'Matemática', 'Marketing', 'Economía', 'Arte'];

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <TextField
                        style={{marginTop: "15%"}}
                        fullWidth
                        label="Título del Curso"
                        value={courseData.title}
                        onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                    />
                );
            case 1:
                return (
                    <Container>
                        <TextField
                            style={{marginTop: "15%"}}
                            fullWidth
                            label="Descripción del Curso"
                            value={courseData.description}
                            onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                            multiline
                            rows={5}
                        />
                        <Select
                            fullWidth
                            value={courseData.category}
                            name={'category'}
                            onChange={handleInputChange}
                            style={{marginTop: '20px'}}
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
                            style={{marginTop: '20px'}}
                        />
                    </Container>
                );
            case 2:
                return (
                    <Container>
                        <Button variant="contained" color="primary" onClick={handleAddSection} startIcon={<AddIcon />}>
                            Agregar Sección
                        </Button>
                        {sections.map((section, sectionIndex) => (
                            <Paper key={sectionIndex} style={{ marginTop: '20px', padding: '10px' }}>
                                <TextField
                                    label="Título de la Sección"
                                    value={section.title}
                                    onChange={(e) => {
                                        const updatedSections = [...sections];
                                        updatedSections[sectionIndex].title = e.target.value;
                                        setSections(updatedSections);
                                    }}
                                    fullWidth
                                />
                                <Button variant="contained" color="secondary" onClick={() => handleAddVideo(sectionIndex)} style={{ marginTop: '10px' }}>
                                    Agregar Video
                                </Button>
                                {section.videos.map((video, videoIndex) => (
                                    <Grid container spacing={2} key={videoIndex} style={{ marginTop: '10px' }}>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Título del Video"
                                                value={video.title}
                                                onChange={(e) => handleVideoInputChange(sectionIndex, videoIndex, 'title', e.target.value)}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Descripción del Video"
                                                value={video.description}
                                                onChange={(e) => handleVideoInputChange(sectionIndex, videoIndex, 'description', e.target.value)}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Duración (en segundos)"
                                                value={video.duration}
                                                onChange={(e) => handleVideoInputChange(sectionIndex, videoIndex, 'duration', e.target.value)}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Enlace del Video"
                                                value={video.link}
                                                onChange={(e) => handleVideoInputChange(sectionIndex, videoIndex, 'link', e.target.value)}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant="contained" color="error" onClick={() => handleDeleteVideo(sectionIndex, videoIndex)}>
                                                Eliminar Video
                                            </Button>
                                        </Grid>
                                    </Grid>
                                ))}
                                <Button variant="contained" color="error" onClick={() => handleDeleteSection(sectionIndex)} style={{ marginTop: '10px' }}>
                                    Eliminar Sección
                                </Button>
                            </Paper>
                        ))}
                    </Container>
                );
            case 3:
                return (
                    <TextField
                        style={{marginTop: "15%"}}
                        fullWidth
                        label="Enlace de la imagen"
                        value={courseData.image}
                        onChange={(e) => setCourseData({ ...courseData, image: e.target.value })}
                    />
                );
            case 4:
                return (
                    <MultipleChoiceBuilder courseData={courseData} setCourseData={setCourseData}/>
                );
            case 5:
                return (
                    <Paper elevation={0} style={{ padding: '20px' }}>
                        {courseData && (
                            <div>
                                <Box style={{ padding: '20px' }}>
                                    <Typography variant="h3">Imagen del curso</Typography>
                                    <Grid item xs={12} sm style={{ paddingTop: '10px' }}>
                                        <img
                                            src={courseData.image}
                                            alt="Foto del curso"
                                            style={{ width: '30%', marginBottom: '20px' }}
                                        />
                                    </Grid>
                                </Box>
                                <Box style={{ padding: '20px' }}>
                                    <Typography variant="h3">Título</Typography>
                                    <Typography variant="body1" style={{ paddingTop: '10px' }}>{courseData.title}</Typography>
                                </Box>
                                <Box style={{ padding: '20px' }}>
                                    <Typography variant="h3">Descripción</Typography>
                                    <Typography variant="body1" style={{ paddingTop: '10px' }}>{courseData.description}</Typography>
                                </Box>
                                <Box style={{ padding: '20px' }}>
                                    <Typography variant="h3">Categoría</Typography>
                                    <Typography variant="body1" style={{ paddingTop: '10px' }}>{categoryNames[courseData.category]}</Typography>
                                </Box>
                                <Box style={{ padding: '20px' }}>
                                    <Typography variant="h3">Secciones</Typography>
                                    {sections.map((section, sectionIndex) => (
                                        <Box key={sectionIndex} style={{ marginTop: '10px', padding: '10px' }}>
                                            <Typography variant="h5">{`Sección ${sectionIndex + 1}: ${section.title}`}</Typography>
                                            <List>
                                                {section.videos.map((video, videoIndex) => (
                                                    <ListItem key={videoIndex}>
                                                        <ListItemText
                                                            primary={`Video ${videoIndex + 1}: ${video.title}`}
                                                            secondary={`Descripción: ${video.description}, Duración: ${video.duration} segundos, Enlace: ${video.link}`}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Box>
                                    ))}
                                </Box>
                                <Box style={{ padding: '20px' }}>
                                    <Typography variant="h3" style={{ paddingBottom: '10px' }}>Preguntas</Typography>
                                    {JSON.parse(courseData.exam).map((q, index) => (
                                        <Box key={index}>
                                            <Typography variant="body1" style={{ paddingTop: '30px' }}>Pregunta: {q.question}</Typography>
                                            <ul>
                                                {q.options.map((opt, optIndex) => (
                                                    <li key={optIndex}>{opt}</li>
                                                ))}
                                            </ul>
                                            <Typography variant="body1">Respuesta correcta: {q.answer}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                                <Box style={{ padding: '20px' }}>
                                    <Typography variant="h3">Precio</Typography>
                                    <Typography variant="body1" style={{ paddingTop: '10px' }}>${courseData.price}</Typography>
                                </Box>
                            </div>
                        )}
                    </Paper>
                );
            default:
                return 'Paso no válido';
        }
    };

    return (
        <Container>
            <Paper
                style={{paddingTop: '100px'}}
                elevation={0}
                sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: '70%',
                    flexGrow: 1,
                }}
            >
                <NavBar isUserLoggedIn={isUserLoggedIn}/>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Paper>
            <Container>
                {activeStep === steps.length ? (
                    <Container>
                        <Typography variant="h5">¡Curso creado!</Typography>
                        
                    </Container>
                ) : (
                    <Container>
                        <Typography>{getStepContent(activeStep)}</Typography>
                        <Container style={{ display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
                            <Button disabled={activeStep === 0} onClick={handleBack} style={{ marginTop: 'auto' }}>Atrás</Button>
                            <Button variant="contained" color="primary" onClick={handleNext} style={{ marginBottom: '20px' }}>
                                {activeStep === steps.length - 1 ? 'Crear Curso' : 'Siguiente'}
                            </Button>
                        </Container>
                    </Container>
                )}
            </Container>
        </Container>
    );
};

export default CourseCreation;
