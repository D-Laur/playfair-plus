import React from 'react';
import Playfair from './Playfair';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
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
const playfair = new Playfair();

const App = () => {

  const classes = useStyles();
  const [displayPlayfairPlusMatrix, setDisplayPlayfairPlusMatrix] = React.useState(false);
  const [decryptMode, setDecryptMode] = React.useState(false);
  const [cipherInput, setCipherInput] = React.useState('');
  const [cipherKey, setCipherKey] = React.useState('');
  const [cipherKeyWithoutRepetition, setCipherKeyWithoutRepetition] = React.useState('');
  const [matrixString, setMatrixString] = React.useState(playfair.matrixString);

  console.log(matrixString);

  const handleSwitchDecryptMode = (event) => {
    setDecryptMode(event.target.checked);
  };

  const handleCipherInputChange = (event) => {
    setCipherInput(event.target.value);
  };

  const handleCipherKeyChange = (event) => {
    setCipherKey(event.target.value);
    playfair.setKey(event.target.value);
    setCipherKeyWithoutRepetition(playfair.keyWithoutRepetition);
    setMatrixString(playfair.matrixString)
  };

  const playfairPlusMatrixQuestion = (
    <Paper style={{ width: '100%', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 9v4H6V9H4v6h16V9z" /></svg>
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
                <Typography component="div">
                  <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Szyfruj</Grid>
                    <Grid item>
                      <Switch checked={decryptMode} onChange={handleSwitchDecryptMode} name="checkedC" />
                    </Grid>
                    <Grid item>Deszyfruj</Grid>
                  </Grid>
                </Typography>
                <TextField
                  className={classes.userText}
                  label="Twój tekst"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={cipherInput}
                  onChange={handleCipherInputChange}
                />
                <Typography variant="body2" gutterBottom>
                  Text może zawierać tylko znaki z alfabetu łacińskiego od A do Z, liczby od 0 do 9 oraz spacje ' '.
                </Typography>
                <TextField
                  required
                  id="outlined-required"
                  label="Klucz szyfrujący"
                  value={cipherKey}
                  onChange={handleCipherKeyChange}
                  variant="outlined"
                  inputProps={{ maxLength: 36 }}
                />
                <Typography variant="body2" gutterBottom>
                  Text może zawierać tylko znaki z alfabetu łacińskiego od A do Z, liczby od 0 do 9 oraz spacje ' '.
                </Typography>
                <TextField
                  className={classes.userText}
                  label="Wyjście"
                  multiline
                  rows={4}
                  variant="outlined"
                  // value={userText}
                  // onChange={handleChange}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>Wejście: {cipherInput}</Paper>
              <Paper>Klucz: {cipherKey}</Paper>
              <Paper>Klucz bez powtórzeń: {cipherKeyWithoutRepetition}</Paper>
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
