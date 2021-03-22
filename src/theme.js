import {createMuiTheme} from '@material-ui/core/styles';

const theme = (type) => createMuiTheme({
  palette: {
    type: type ? type : 'light',
    primary: {
      main: '#E10019',
      contrastText: '#fff',
    },
    secondary: {
      main: '#228042',
    }
  }
});

export default theme;
