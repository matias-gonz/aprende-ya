import {Component} from "react";
import {Box, Grid, Typography} from "@mui/material";
import "./Cover.css";
import student from "../../assets/student.png";

class Cover extends Component {
  render() {
    return (
      <Grid container spacing={1} className="Cover">
        <Grid item xs={6} className="Cover-title-container">
          <Typography variant={"h1"} className="Cover-title">Desata tu</Typography>
          <Typography variant={"h1"} className="Cover-title">potencial con</Typography>
          <Typography variant={"h1"} className="Cover-title-aprende-ya">AprendeYA</Typography>
        </Grid>
        <Grid item xs={6} className="Cover-image-container">
          <Box className={"Cover-circle Cover-circle-medium"}/>
          <img className={"Cover-circle Cover-circle-strong"} src={student}/>
        </Grid>
      </Grid>
    );
  }
}

export default Cover;