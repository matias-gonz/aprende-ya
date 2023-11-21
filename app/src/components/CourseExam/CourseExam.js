import React, { useState } from 'react';
import {Button, Container, FormControl, FormControlLabel, Modal, Radio, RadioGroup, Typography} from "@mui/material";
import Cookies from "js-cookie";
import {useParams} from "react-router-dom";
import axios from "axios";

const CourseExam = ({ questions, course_id }) => {
    const [score, setScore] = useState(0);
    const [certificado, setCertificado] = useState("");
    const [loadingCertificate, setLoadingCertificate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const parsedQuestions = JSON.parse(questions);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const handleSelectAnswer = (questionIndex, optionIndex) => {
        console.log(questionIndex, optionIndex);
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: optionIndex,
        });
    };

    const handleCompleteExam = () => {
        let s = 0;
        parsedQuestions.forEach((question, index) => {
            if (selectedAnswers[index] === question.options.indexOf(question.answer)) {
                s++;
            }
        });
        setScore(s);
        setLoadingCertificate(true);
        setShowModal(true);

        const user_id = Cookies.get('user_id');

        axios.post(`http://127.0.0.1:8000/certificates/${user_id}?course_id=${course_id}`, {withCredentials: true})
          .then(response => {
              console.log('Certificate generated:', response.data);
              setCertificado(response.data['hash']);
              setLoadingCertificate(false);
          })
          .catch(error => {
              console.error('Error generating certificate:', error);
              setLoadingCertificate(false);
          });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container>
            {parsedQuestions.map((question, questionIndex) => (
                <Container key={questionIndex}>
                    <Typography variant="h3">{question.question}</Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label={`question${questionIndex}`}
                            value={selectedAnswers[questionIndex] | ''}
                            onChange={(event) => handleSelectAnswer(questionIndex, parseInt(event.target.value))}
                        >
                            {question.options.map((option, optionIndex) => (
                                <FormControlLabel
                                    key={optionIndex}
                                    value={optionIndex.toString()}
                                    control={<Radio />}
                                    label={option}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Container>
            ))}
            <Button variant="contained" color="primary" onClick={handleCompleteExam}>
                Completar Examen
            </Button>
            <Modal open={showModal} onClose={handleCloseModal}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '20px', border: '1px solid #ccc', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <Typography variant={"h3"} style={{fontSize: '3rem', fontWeight: 'bold'}}>¡Felicidades!</Typography>
                    <br />
                    <Typography variant={"h3"}>Tu puntuacion es: {score}/{parsedQuestions.length}</Typography>
                    <br />
                    <Typography variant={"h3"}>Certificado:</Typography>
                    {loadingCertificate ?
                      <Typography variant={"h3"} style={{fontSize: '1.5rem'}}>Generando certificado...</Typography> :
                      <Typography variant={"h3"} style={{fontSize: '1.5rem'}}>{certificado}</Typography>
                    }
                    <br />
                    <br />
                    <Button onClick={handleCloseModal}>Close</Button>
                </div>
            </Modal>
        </Container>
    );
};

export default CourseExam;