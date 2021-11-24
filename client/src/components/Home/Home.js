import React, { useState } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';

import Form from '../Form/Form';

const Home = () => {

  return (
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={24} sm={12}>
            <Form/>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
