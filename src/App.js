import React from 'react';
import Playfair from './Playfair';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import "@fontsource/roboto" // Defaults to weight 400.
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  body: {
    fontFamily: 'Roboto',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    textAlign: 'center'
  },
  userText: {
    width: '100%',
    marginBottom: '1rem'
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
];

const playfair = new Playfair(allowedChars);

const filterString = string => {
  return string
    .toLowerCase()
    .split('')
    .filter(char => allowedChars.includes(char))
    .join('');
};

const App = () => {

  const classes = useStyles();
  const [decryptMode, setDecryptMode] = React.useState(false);
  const [cipherInput, setCipherInput] = React.useState('');
  const [cipherOutput, setCipherOutput] = React.useState('');
  const [cipherOutputPairs, setCipherOutputPairs] = React.useState(playfair.duples);
  const [cipherKey, setCipherKey] = React.useState('');
  const [cipherKeyWithoutRepetition, setCipherKeyWithoutRepetition] = React.useState('');
  const [matrixArray, setMatrixArray] = React.useState(playfair.matrixArray);

  const handleSwitchDecryptMode = (event) => {
    setDecryptMode(event.target.checked);
    console.log(event.target.checked);
    setCipherOutput(playfair.process({ input: cipherInput, decrypt: event.target.checked }));
  };

  const handleCipherInputChange = (event) => {
    let input = filterString(event.target.value);
    setCipherInput(input);
    setCipherOutput(playfair.process({ input: input, decrypt: decryptMode }));
    setCipherOutputPairs(playfair.duples);
  };

  const handleCipherKeyChange = (event) => {
    const key = filterString(event.target.value);
    setCipherKey(key);
    playfair.setKey(key);
    setCipherKeyWithoutRepetition(playfair.keyWithoutRepetition);
    setMatrixArray(playfair.matrixArray);
    setCipherOutput(playfair.process({ input: cipherInput, decrypt: decryptMode }));
  };

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
              <Paper className={'paper'} elevation={2}>
                {/* <Typography component="div">
                  <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Szyfruj</Grid>
                    <Grid item>
                      <Switch
                        color="primary"
                        checked={decryptMode}
                        onChange={handleSwitchDecryptMode}
                      />
                    </Grid>
                    <Grid item>Deszyfruj</Grid>
                  </Grid>
                </Typography> */}
                <TextField
                  className={classes.userText}
                  label="Twój tekst (Wejście)"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={cipherInput}
                  onChange={handleCipherInputChange}
                />
                {/* <Typography variant="body2" gutterBottom>
                  Text może zawierać tylko znaki z alfabetu łacińskiego od A do Z, liczby od 0 do 9 oraz spacje ' '.
                </Typography> */}
                <TextField
                  className={classes.userText}
                  required
                  id="outlined-required"
                  label="Klucz szyfrujący"
                  value={cipherKey}
                  onChange={handleCipherKeyChange}
                  variant="outlined"
                />
                {/* <Typography component="div" style={{ marginBottom: '1rem' }}>
                  <Grid component="label">
                    <Button variant="contained" color="primary">
                      {decryptMode ? 'Deszyfruj' : 'Szyfruj'}
                    </Button>
                  </Grid>
                </Typography> */}
                {/* <Typography variant="body2" gutterBottom>
                  Text może zawierać tylko znaki z alfabetu łacińskiego od A do Z, liczby od 0 do 9 oraz spacje ' '.
                </Typography> */}
                <TextField
                  className={classes.userText}
                  label="Wyjście"
                  multiline
                  rows={4}
                  variant="outlined"
                  disabled={true}
                  value={cipherOutput}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={'paper'} style={{ marginBottom: '1rem' }} elevation={2}>
                <div className={'cryptoInfo'}>
                  Wejście:
                  <p>
                    {cipherOutputPairs.length > 0 && cipherOutputPairs.map((value, key) => (
                      <span key={key} className="cipherOutputPair">[{value[0]},{value[1]}]</span>
                    ))}
                  </p>
                </div>
                <div className={'cryptoInfo'}>
                  Klucz:
                  <p>
                    {cipherKey}
                  </p>
                </div>
                <div className={'cryptoInfo'}>
                  Klucz bez powtórzeń:
                  <p>
                    {cipherKeyWithoutRepetition.length > 0 && (
                      <span className={'cipherKeyWithoutRepetition'}>
                        {cipherKeyWithoutRepetition}
                      </span>
                    )}
                  </p>
                </div>
              </Paper>
              <Grid container className={classes.root} spacing={1}>

                {matrixArray.map((value, key) => {
                  return (
                    <Grid key={key} item xs={2}>
                      <Paper elevation={2} className={'paper'} style={{
                        height: '4rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 'unset',
                        border: 'unset',
                        backgroundColor: (cipherKeyWithoutRepetition.includes(value) ? 'orange' : 'transparent')
                      }}>
                        {value === ' ' ?
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 9v4H6V9H4v6h16V9z" /></svg>
                          : value
                        }
                      </Paper>
                    </Grid>
                  )
                })}

              </Grid>

            </Grid>
          </Grid>
        </main>
      </Container>
    </div>
  );
}

export default App;
