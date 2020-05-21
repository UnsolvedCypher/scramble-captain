import {
  Container, Menu, Item, Label, Button,
} from 'semantic-ui-react';
// import Link from 'next/link';
import Router from 'next/router';
import { NextPageContext } from 'next';
import React from 'react';
import { withAuthSync, authFetch, logout } from '../../components/withAuthSync';
import NewScrambleModal from '../../components/NewScrambleModal';
import NewUserModal from '../../components/NewUserModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import ScramblePermissionsModal from '../../components/ScramblePermissionsModal';

interface User {
  id: number;
  name: string;
  viewing: Array<string>;
}

interface Scramble {
  id: number;
  name: string;
  scramblers: Array<number>;
}

interface Competition {
  id: number,
  scramblers: Array<User>;
  delegates: Array<User>;
  scrambles: Array<Scramble>;
}

interface CompetitionProps {
  initialCompetition: Competition;
}

interface CompetitionState {
  competition: Competition;
}

class Home extends React.Component<CompetitionProps, CompetitionState> {
  constructor(props) {
    super(props);
    const { initialCompetition } = this.props;
    this.state = {
      competition: initialCompetition,
    };
  }

  static getInitialProps = async (ctx: NextPageContext) => {
    const { competitionId } = ctx.query;
    const res = await authFetch(`api/competitions/${competitionId}`, 'get', null, ctx);
    return { initialCompetition: await res.json() };
  };

  componentDidMount() {
    this.poll();
  }

  poll = () => {
    setTimeout(this.poll, 5000);
    this.refreshProps();
  }

  refreshProps = async () => {
    const { initialCompetition } = this.props;
    const { id } = initialCompetition;
    const res = await authFetch(`api/competitions/${id}`, 'get', null, null);
    this.setState({ competition: await res.json() });
  }

  render = () => {
    const { competition } = this.state;
    const {
      id, scramblers, delegates, scrambles,
    } = competition;
    return (
      <Container>
        <Button content="Log out" onClick={() => logout(null)} />
        <h2>Scrambles</h2>
        <Item.Group divided>
          {scrambles.map((scramble) => (
            <Item key={scramble.id}>
              {/* <Label color={scramble.} */}
              <Item.Header>
                <Label color={scramble.scramblers.length > 0 ? 'green' : 'grey'} content={scramble.name} />
              </Item.Header>
              {/* <Item.Header content={scramble.name} /> */}
              <Item.Extra>
                <ScramblePermissionsModal
                  onAdd={this.refreshProps}
                  scrambleId={scramble.id}
                  permittedScramblers={scramble.scramblers}
                  competitionId={competition.id}
                  allScramblers={scramblers}
                />
                <DeleteConfirmationModal
                  deleteUrl={`api/competitions/${competition.id}/scrambles/${scramble.id}`}
                  confirmationText={`Are you sure you want to delete scramble "${scramble.name}"?`}
                  afterDelete={this.refreshProps}
                />
              </Item.Extra>
            </Item>
          ))}
        </Item.Group>
        <NewScrambleModal competitionId={id} onAdd={this.refreshProps} />
        <h2>Scramblers</h2>
        <Item.Group divided>
          {scramblers.map((scrambler) => (
            <Item key={scrambler.id}>
              <Item.Header content={scrambler.name} />
              <Item.Extra>
                {scrambler.viewing.map((s) => (
                  <Label content={`Viewing ${s}`} />
                ))}
                <DeleteConfirmationModal
                  deleteUrl={`api/competitions/${competition.id}/scramblers/${scrambler.id}`}
                  confirmationText={`Are you sure you want to delete scrambler "${scrambler.name}"?`}
                  afterDelete={this.refreshProps}
                />
              </Item.Extra>
            </Item>
          ))}
        </Item.Group>
        <NewUserModal competitionId={id} onAdd={this.refreshProps} />

        <h2>Delegates</h2>
        <Menu vertical>
          {delegates.map((delegate) => (
            <Menu.Item key={delegate.id} content={delegate.name} />
          ))}
        </Menu>
      </Container>
    );
  }
}


export default withAuthSync(Home);
