import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "@fontsource/roboto" // Defaults to weight 400.

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: '#ebebeb',
    fontFamily: 'Roboto',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100vh'
  },
  header: {
    textAlign: 'center'
  },
  userText: {
    width: '100%'
  }
}));

const allowedChars = [
  'a', 'b', 'c', 'd', 'e', 'f',
  'g', 'h', 'i', 'j', 'k', 'l',
  'm', 'n', 'o', 'p', 'q', 'r',
  's', 't', 'u', 'v', 'w', 'x',
  'y', 'z', '1', '2', '3', '4',
  '5', '6', '7', '8', '9', '0',
  ' ', ',', '.', ':', '?', '!'
]

const App = () => {

  const classes = useStyles();
  const [displayPlayfairPlusMatrix, setDisplayPlayfairPlusMatrix] = React.useState(false);
  const [userText, setUserText] = React.useState('Controlled');

  const handleChange = (event) => {
    setUserText(event.target.value);
  };

  const playfairPlusMatrixQuestion = (
    <Paper style={{width: '100%', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setDisplayPlayfairPlusMatrix(!displayPlayfairPlusMatrix)}
      >
        Primary
      </Button>
    </Paper>
  );

  const playfairPlusMatrix = allowedChars.map((value, key) => {
    
    return (
      <Grid key={key} item xs={2}>
        <Paper className={classes.paper} style={{
              height: '4rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
        }}>
          {value === ' ' ? 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 9v4H6V9H4v6h16V9z"/></svg>
            : value
          }
        </Paper>
      </Grid>
    )
  });

  return (
    <div className={classes.body}>
      <Container>
        <header>
          <Typography className={classes.header} variant="h1" component="h2" gutterBottom>
            Playfair+
          </Typography>
        </header>
        <main>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper>
                <TextField
                  className={classes.userText}
                  label="Twój tekst"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={userText}
                  onChange={handleChange}
                />
                <Typography variant="body2" gutterBottom>
                  Text może zawierać tylko znaki z alfabetu łacińskiego od A do Z, liczby od 0 do 9 oraz spacje ' '.
                </Typography>
                <TextField
                  required
                  id="outlined-required"
                  label="Klucz szyfrujący"
                  defaultValue="Hello World"
                  variant="outlined"
                  inputProps={{ maxLength: 36 }}
                />
                <Typography variant="body2" gutterBottom>
                  Text może zawierać tylko znaki z alfabetu łacińskiego od A do Z, liczby od 0 do 9 oraz spacje ' '.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>{userText}</Paper>
              <Grid container className={classes.root} spacing={1}>

                {displayPlayfairPlusMatrix ? playfairPlusMatrix : playfairPlusMatrixQuestion}

              </Grid>

            </Grid>
          </Grid>
        </main>
      </Container>
    </div>
  );
}

export default App;
