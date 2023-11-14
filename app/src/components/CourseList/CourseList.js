import "./CourseList.css";
import {Component} from "react";
import axios from "axios";
import {Box, Tab, Tabs} from "@mui/material";

class CourseList extends Component {
  state = {
    courses: [],
    category: 0,
  }

  constructor(props) {
    super(props);

    axios.get('http://localhost:8000/courses').then((response) => {
      this.setState({courses: response.data});
    }).catch((error) => {
      console.error('Error fetching courses: ', error);
    });
  }

  handleTabChange = (event, newValue) => {
    this.setState({category: newValue});
  }

  render() {
    const {courses, category} = this.state;
    return (
      <Box>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={category} onChange={this.handleTabChange}>
            <Tab label="Programación"/>
            <Tab label="Matemática"/>
            <Tab label="Marketing"/>
            <Tab label="Economía"/>
            <Tab label="Arte"/>
          </Tabs>
        </Box>
        {category === 0 && (
          <p>Programación</p>
        )}
        {category === 1 && (
          <p>Matemática</p>
        )}
        {category === 2 && (
          <p>Marketing</p>
        )}
        {category === 3 && (
          <p>Economía</p>
        )}
        {category === 4 && (
          <p>Arte</p>
        )}
      </Box>
    )
  }
}

export default CourseList;
