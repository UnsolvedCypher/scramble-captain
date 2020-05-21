import React from 'react';
import {
  Button, Form, Grid, Header, Message, Segment,
} from 'semantic-ui-react';
import Cookies from 'js-cookie';
import Router from 'next/router';

interface LoginState {
  login: string;
  password: string;
}

class LoginPage extends React.Component<{}, LoginState> {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }

  attemptLogin = async () => {
    const { login, password } = this.state;
    const res = await fetch('http://localhost:5000/api/sign_ins', {
      method: 'post',
      body: JSON.stringify({
        user: {
          email: login,
          password,
        },
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    this.setState({ password: '' });
    if (res.status === 200) {
      const { token } = await res.json();
      Cookies.set('jwt', token, { sameSite: 'strict' });
      Router.push('/');
    } else {
      // eslint-disable-next-line no-alert
      alert('Invalid login');
    }
  }

  render = () => {
    const { login, password } = this.state;
    return (
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            Log in to Scramble Captain
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Login ID"
                value={login}
                onChange={(e) => this.setState({ login: e.target.value })}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />

              <Button primary fluid size="large" onClick={this.attemptLogin}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us?
            {' '}
            <a href="/signup">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
export default LoginPage;
