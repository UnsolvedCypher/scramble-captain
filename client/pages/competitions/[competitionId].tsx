import {
  Container, Menu, Button, Grid, Card,
} from 'semantic-ui-react';
import { NextPageContext } from 'next';
import React from 'react';
import { withAuthSync, authFetch, logout } from '../../components/withAuthSync';
import NewScrambleModal from '../../components/NewScrambleModal';
import NewUserModal from '../../components/NewUserModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import ScramblePermissionsModal from '../../components/ScramblePermissionsModal';
import withHeaderFooter from '../../components/withHeaderFooter';

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
        <h2>Scrambles</h2>
        <div style={{ textAlign: 'right' }}>
          <NewScrambleModal competitionId={id} onAdd={this.refreshProps} />
        </div>
        <br />
        <Grid stackable doubling columns={4}>
          {scrambles.map((scramble) => (
            <Grid.Column key={scramble.id}>
              <Card>
                <div style={{ backgroundColor: scramble.scramblers.length === 0 ? 'grey' : 'limegreen', height: '1em' }} />
                <Card.Content>
                  <Card.Header content={scramble.name} />
                  <br />
                  <Card.Meta content={scramble.scramblers.length === 0
                    ? 'Scramble is closed'
                    : `Scramble is open to ${scramblers.filter((s) => scramble.scramblers.includes(s.id)).map((s) => s.name).join(', ')}`}
                  />
                </Card.Content>
                <Card.Content extra>
                  <ScramblePermissionsModal
                    onAdd={this.refreshProps}
                    scrambleId={scramble.id}
                    permittedScramblers={scramble.scramblers}
                    competitionId={competition.id}
                    allScramblers={scramblers}
                  />
                  <DeleteConfirmationModal
                    buttonFluid
                    buttonBasic
                    deleteUrl={`api/competitions/${competition.id}/scrambles/${scramble.id}`}
                    confirmationText={`Are you sure you want to delete scramble "${scramble.name}"?`}
                    afterDelete={this.refreshProps}
                  />
                </Card.Content>
              </Card>
            </Grid.Column>

          ))}
        </Grid>
        <h2>Scramblers</h2>
        <div style={{ textAlign: 'right' }}>
          <NewUserModal competitionId={id} onAdd={this.refreshProps} />
        </div>
        <br />
        <Grid stackable doubling columns={4}>
          {scramblers.map((scrambler) => (
            <Grid.Column key={scrambler.id}>
              <Card>
                <Card.Content>
                  <Card.Header content={scrambler.name} />
                  <Card.Meta content={scrambler.viewing.length === 0
                    ? 'Not viewing scrambles'
                    : `Viewing ${scrambler.viewing.join(', ')}`}
                  />
                </Card.Content>
                <Card.Content extra>
                  <DeleteConfirmationModal
                    buttonFluid
                    buttonBasic
                    deleteUrl={`api/competitions/${competition.id}/scramblers/${scrambler.id}`}
                    confirmationText={`Are you sure you want to delete scrambler "${scrambler.name}"?`}
                    afterDelete={this.refreshProps}
                  />
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>

        <h2>Delegates</h2>
        <Grid stackable doubling columns={4}>
          {delegates.map((delegate) => (
            <Grid.Column key={delegate.id}>
              <Card header={delegate.name} />
            </Grid.Column>
          ))}
        </Grid>
      </Container>
    );
  }
}


export default withAuthSync(withHeaderFooter(Home));
