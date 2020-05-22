import React from 'react';
import {
  Button, Form, Grid, Header, Message, Segment,
} from 'semantic-ui-react';
import Cookies from 'js-cookie';
import Router from 'next/router';

interface LoginState {
  login: string;
  password: string;
  passwordConfirmation: string;
  name: string;
}

class SignUpPage extends React.Component<{}, LoginState> {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      passwordConfirmation: '',
      name: '',
    };
  }

  attemptRegistration = async () => {
    const {
      login, password, passwordConfirmation, name,
    } = this.state;
    const res = await fetch(`${process.env.backend}/api/sign_ups`, {
      method: 'post',
      body: JSON.stringify({
        user: {
          email: login,
          name,
          password,
          password_confirmation: passwordConfirmation,
        },
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.status === 200) {
      const { token } = await res.json();
      Cookies.set('jwt', token, { sameSite: 'strict' });
      Router.push('/');
    } else {
      // eslint-disable-next-line no-alert
      alert('Unable to sign up- make sure your password is long enough');
    }
  }

  render = () => {
    const {
      login, password, passwordConfirmation, name,
    } = this.state;
    return (
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            Delegate registration
          </Header>
          <Message info content="If you are a scrambler, ask the Delegate to create an account for you from their competition dashboard" />
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                iconPosition="left"
                placeholder="Name"
                value={name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
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
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password confirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => this.setState({ passwordConfirmation: e.target.value })}
              />

              <Button primary fluid size="large" onClick={this.attemptRegistration}>
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
export default SignUpPage;
