import {Component} from "react";
import {Box} from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import CourseList from "../../components/CourseList/CourseList";
import Cover from "../../components/Cover/Cover";

class Home extends Component {

  constructor(props) {
    super(props);
    const {isUserLoggedIn} = props;
    this.state = {
      isUserLoggedIn: isUserLoggedIn,
    };
  }

  render() {
    const {isUserLoggedIn} = this.state;

    return (
      <Box>
        <NavBar isUserLoggedIn={isUserLoggedIn} />
        <Cover/>
        <CourseList/>
      </Box>
    )
  }
}

export default Home;