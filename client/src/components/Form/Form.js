import React from 'react';
import { Typography, Paper, Container, Grow, Grid } from '@material-ui/core';

import useStyles from './styles';
import Weather from '../Weather/weather';

const Form = ({}) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to check Weather.
        </Typography>
      </Paper>
    );
  }

  return (
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={24} sm={12}>
            <Weather />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Form;
