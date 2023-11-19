import React, { useState } from 'react';
import {
    TextField,
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormGroup,
    Box,
    Container
} from '@mui/material';

const MultipleChoiceBuilder = ({ courseData, setCourseData }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentOptions, setCurrentOptions] = useState({ option1: '', option2: '', option3: ''});
    const [correctOption, setCorrectOption] = useState('');
    const [exam, setExam] = useState([])

    const handleAddQuestion = () => {
        const newQuestion = {
            question: currentQuestion,
            options: [currentOptions.option1, currentOptions.option2, currentOptions.option3],
            answer: currentOptions[correctOption],
        };

        exam.push(newQuestion)
        setCourseData({ ...courseData, exam: JSON.stringify(exam) })

        setQuestions([...questions, newQuestion]);
        setCurrentQuestion('');
        setCurrentOptions({ option1: '', option2: '', option3: ''});
        setCorrectOption('');
    };

    return (
        <div>
            <Container>
                <TextField
                    label="Pregunta"
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <FormControl component="fieldset" fullWidth>
                    <FormGroup>
                        <TextField
                            label="Opción 1"
                            value={currentOptions.option1}
                            onChange={(e) => setCurrentOptions({ ...currentOptions, option1: e.target.value })}
                            margin="normal"
                            fullWidth
                            multiline
                            rows={2}
                        />
                        <TextField
                            label="Opción 2"
                            value={currentOptions.option2}
                            onChange={(e) => setCurrentOptions({ ...currentOptions, option2: e.target.value })}
                            margin="normal"
                            multiline
                            rows={2}
                        />
                        <TextField
                            label="Opción 3"
                            value={currentOptions.option3}
                            onChange={(e) => setCurrentOptions({ ...currentOptions, option3: e.target.value })}
                            margin="normal"
                            multiline
                            rows={2}
                        />
                        <RadioGroup value={correctOption} onChange={(e) => setCorrectOption(e.target.value)}>
                            <FormControlLabel value="option1" control={<Radio />} label="Opción 1" />
                            <FormControlLabel value="option2" control={<Radio />} label="Opción 2" />
                            <FormControlLabel value="option3" control={<Radio />} label="Opción 3" />
                        </RadioGroup>
                    </FormGroup>
                </FormControl>
            </Container>

            <Container>
                <Button variant="contained" color="primary" onClick={handleAddQuestion} disabled={questions.length === 5}>
                    Agregar Pregunta
                </Button>
            </Container>

            <Box>
                {questions.map((q, index) => (
                    <div key={index}>
                        <h3>{q.question}</h3>
                        <ul>
                            {q.options.map((opt, optIndex) => (
                                <li key={optIndex}>{opt}</li>
                            ))}
                        </ul>
                        <p>Respuesta correcta: {q.answer}</p>
                    </div>
                ))}
            </Box>
        </div>
    );
};

export default MultipleChoiceBuilder;