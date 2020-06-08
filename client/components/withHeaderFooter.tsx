/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Container,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react';
import Link from 'next/link';
import { logout } from './withAuthSync';

const withHeaderFooter = (InnerComponent) => {
  const HeaderFooterPage = (props) => {
    const { user } = props;
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Menu fixed="top" inverted>
          <Container>
            <Link href="/">
              <Menu.Item as="a" header>
                Scramble Captain
              </Menu.Item>
            </Link>
            {user == null ? (
              <Link href="/login"><Menu.Item position="right" content="Log in" /></Link>
            ) : (
              <Menu.Item position="right" content="Log out" onClick={() => logout(null)} />
            )}
          </Container>
        </Menu>
        <div style={{ marginTop: '7em' }} />
        <div style={{ flexGrow: 1 }}>
          <InnerComponent {...props} />
        </div>

        <Segment inverted vertical style={{ margin: '3em 0em 0em', padding: '3em 0em' }}>
          <Container textAlign="center">
            <List horizontal inverted divided link size="small">
              <List.Item as="a" href="https://github.com/UnsolvedCypher/scramble-captain/blob/master/README.md">
                About
              </List.Item>
              <List.Item as="a" href="https://github.com/unsolvedcypher/scramble-captain">
                GitHub
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  };
  HeaderFooterPage.getInitialProps = async (ctx) => {
    if (InnerComponent.getInitialProps) {
      return InnerComponent.getInitialProps(ctx);
    }
    return {};
  };
  return HeaderFooterPage;
};

export default withHeaderFooter;
