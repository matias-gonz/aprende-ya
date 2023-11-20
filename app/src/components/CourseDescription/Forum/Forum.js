import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
} from '@mui/material';
import axios from 'axios';

const Forum = ({ courseId, isCourseCreator }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [answerInputs, setAnswerInputs] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/questions/${courseId}`)
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching questions: ', error);
      });
  }, [courseId]);

  const handleAskQuestion = () => {
    if (newQuestion.trim() !== '') {
      axios.post('http://localhost:8000/questions/', {
        course_id: courseId,
        text: newQuestion,
      })
        .then(response => {
          setQuestions([...questions, { id: response.data.id, text: newQuestion, course_id: courseId, answer: '' }]);
          setNewQuestion('');
        })
        .catch(error => {
          console.error('Error asking question: ', error);
        });
    }
  };

  const handleAnswerQuestion = (questionId) => {
    const currentAnswer = answerInputs[questionId] || '';
    if (currentAnswer.trim() !== '') {
      axios.post(`http://localhost:8000/questions/${questionId}/answer`, {
        answer: currentAnswer,
      })
        .then(response => {
          const updatedQuestions = questions.map(q =>
            q.id === questionId ? { ...q, answer: response.data.answer } : q
          );
          setQuestions(updatedQuestions);
          setAnswerInputs({ ...answerInputs, [questionId]: '' });
        })
        .catch(error => {
          console.error('Error answering question: ', error);
        });
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Sección del Foro
      </Typography>

      <Box mb={2}>
        <TextField
          label="Hacer una pregunta"
          variant="outlined"
          fullWidth
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
      </Box>

      <Button variant="contained" style={{ backgroundColor: "#8a2be2", color: "white" }} onClick={handleAskQuestion}>
        Preguntar
      </Button>

      <List>
        {questions.map((question) => (
          <Paper key={question.id} elevation={3} style={{ margin: '10px', padding: '10px' }}>
            <ListItem>
              <ListItemText primary={question.text} />
              {question.answer && (
                <Box mt={2} bgcolor="#8a2be2" p={2} borderRadius={4}>
                  <Typography variant="subtitle2" color="white">
                    Respuesta: {question.answer}
                  </Typography>
                </Box>
              )}
            </ListItem>
            {isCourseCreator && (
              <ListItem>
                <TextField
                  label="Tu respuesta"
                  variant="outlined"
                  fullWidth
                  value={answerInputs[question.id] || ''}
                  onChange={(e) =>
                    setAnswerInputs({
                      ...answerInputs,
                      [question.id]: e.target.value,
                    })
                  }
                />
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#8a2be2", color: "white" }}
                  onClick={() => handleAnswerQuestion(question.id)}
                >
                  Responder
                </Button>
              </ListItem>
            )}
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default Forum;
