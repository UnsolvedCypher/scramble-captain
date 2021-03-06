import React from 'react';
import {
  Dropdown, Menu, Container, Header,
} from 'semantic-ui-react';
import Iframe from 'react-iframe';
import { authFetch, logout } from '../components/withAuthSync';

interface ScramblePageProps {
  permittedScrambles: Array<{name: string; id: number;}>;
  competitionId: number;
}

interface ScramblePageState {
  currScrambleId: number;
  permittedScrambles: Array<{name: string; id: number;}>;
}

export default class ScramblePage extends React.Component<ScramblePageProps, ScramblePageState> {
  static async getInitialProps(ctx) {
    const res = await authFetch('api/permitted_scrambles', 'get', null, ctx);
    const propsToBe = await res.json();
    return propsToBe;
  }


  constructor(props: ScramblePageProps) {
    super(props);
    const { permittedScrambles } = props;
    this.state = {
      permittedScrambles,
      currScrambleId: permittedScrambles.length > 0 ? permittedScrambles[0].id : null,
    };
  }


  componentDidMount() {
    this.poll();
  }

  poll = async () => {
    setTimeout(this.poll, 5000);
    const { competitionId } = this.props;
    const { currScrambleId } = this.state;
    if (currScrambleId) {
      authFetch(`api/competitions/${competitionId}/scrambles/${currScrambleId}/mark_open`, 'post', null, null);
    }
    const res = await authFetch('api/permitted_scrambles', 'get', null, null);
    const { permittedScrambles } = await res.json();
    const firstScrambleId = permittedScrambles.length > 0 ? permittedScrambles[0].id : null;
    const newCurrScrambleId = permittedScrambles.some((s) => s.id === currScrambleId)
      ? currScrambleId
      : firstScrambleId;
    this.setState({ permittedScrambles, currScrambleId: newCurrScrambleId });
  }


  render() {
    const { competitionId } = this.props;
    const { currScrambleId, permittedScrambles } = this.state;
    if (permittedScrambles.length === 0) {
      return (
        <div style={{ height: '100vh' }}>
          <Menu inverted style={{ borderRadius: 0 }}>
            <Menu.Item position="right" content="Log out" onClick={() => logout(null)} />
          </Menu>
          <Header content="No scrambles available" style={{ textAlign: 'center' }} />
        </div>
      );
    }
    return (
      <div style={{ height: '100vh', backgroundColor: 'black' }}>
        <Menu inverted style={{ marginBottom: 0 }}>
          <Container>
            <Dropdown
              item
              defaultValue={currScrambleId}
              options={permittedScrambles.map((scramble) => ({
                key: scramble.id, value: scramble.id, text: scramble.name,
              }))}
              onChange={(_, data) => this.setState({ currScrambleId: Number.parseInt(`${data.value}`, 10) })}
            />
            <Menu.Item position="right" content="Log out" onClick={() => logout(null)} />
          </Container>
        </Menu>
        <Iframe
          width="100%"
          height="100%"
          url={`${process.env.backend}/api/competitions/${competitionId}/scrambles/${currScrambleId}`}
        />
      </div>
    );
  }
}
