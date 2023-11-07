import {createTheme} from "@mui/material/styles";

const appTheme = createTheme({
  typography: {
    h3: {
      fontFamily: '\'Baloo 2\', sans-serif',
      fontSize: '2rem',
    },
    h6: {
      fontFamily: '\'Baloo 2\', sans-serif',
      fontSize: '1rem',
    }
  }
});

export default appTheme;
