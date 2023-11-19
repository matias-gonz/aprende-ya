import React, { useState } from 'react';
import {Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";

const CourseExam = ({ questions }) => {
    const parsedQuestions = JSON.parse(questions);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const handleSelectAnswer = (questionIndex, optionIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: optionIndex,
        });
    };

    const handleCompleteExam = () => {
        let score = 0;
        parsedQuestions.forEach((question, index) => {
            if (selectedAnswers[index] === question.options.indexOf(question.answer)) {
                score++;
            }
        });
        alert(`Tu puntaje es: ${score}/${parsedQuestions.length}`);
        // Aquí podrías hacer otras acciones con el puntaje, como mostrarlo en el modal, enviarlo a una base de datos, etc.
    };

    return (
        <Container>
            {parsedQuestions.map((question, questionIndex) => (
                <Container key={questionIndex}>
                    <Typography variant="h3">{question.question}</Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label={`question${questionIndex}`}
                            value={selectedAnswers[questionIndex] || ''}
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
        </Container>
    );
};

export default CourseExam;