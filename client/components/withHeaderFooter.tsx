import React from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'

const withHeaderFooter = (InnerComponent) => {
  const HeaderFooterPage = (props) => (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            {/* <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} /> */}
            Scramble Captain
          </Menu.Item>
          {/* <Menu.Item as='a'>Home</Menu.Item> */}

          <Dropdown item simple text='Dropdown'>
            <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Header Item</Dropdown.Header>
              <Dropdown.Item>
                <i className='dropdown icon' />
                <span className='text'>Submenu</span>
                <Dropdown.Menu>
                  <Dropdown.Item>List Item</Dropdown.Item>
                  <Dropdown.Item>List Item</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
      <div style={{marginTop: '7em'}} />
      <div style={{flexGrow: 1}}>
        <InnerComponent {...props} />
      </div>

      <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
        <Container textAlign='center'>

          {/* <Divider inverted section />
          <Image centered size='mini' src='/logo.png' /> */}
          <List horizontal inverted divided link size='small'>
            <List.Item as='a' href='#'>
              About
            </List.Item>
            <List.Item as='a' href='#'>
              GitHub
            </List.Item>
            {/* <List.Item as='a' href='#'>
              Terms and Conditions
            </List.Item>
            <List.Item as='a' href='#'>
              Privacy Policy
            </List.Item> */}
          </List>
        </Container>
      </Segment>
    </div>
  )
  HeaderFooterPage.getInitialProps = async (ctx) => {
    if (InnerComponent.getInitialProps) {
      return InnerComponent.getInitialProps(ctx);
    } else {
      return {};
    }
  }
  return HeaderFooterPage;
}

export default withHeaderFooter;