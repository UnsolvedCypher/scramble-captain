import {
  Container, Grid, Card, Button, Header,
} from 'semantic-ui-react';
import Link from 'next/link';
import Router from 'next/router';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { withAuthSync, authFetch, getUser } from '../components/withAuthSync';
import NewCompetitionModal from '../components/NewCompetitionModal';
import withHeaderFooter from '../components/withHeaderFooter';

interface HomeProps {
  competitions: Array<{id: number, name: string}>;
}

function Home(props: HomeProps) {
  const { competitions } = props;
  const refreshProps = () => {
    Router.replace('/');
  };

  return (
    <Container>
      <div style={{ textAlign: 'right' }}>
        <NewCompetitionModal onAdd={refreshProps} />
      </div>
      <br />
      <Grid stackable doubling columns={4}>
        {competitions.map((competition) => (
          <Grid.Column key={competition.id}>
            <Card>
              <Link href="/competitions/[competitionId]" as={`/competitions/${competition.id}`}>
                <Card.Content>
                  <Header content={competition.name} />
                </Card.Content>
              </Link>
              <Card.Content extra>
                <Link href="/competitions/[competitionId]" as={`/competitions/${competition.id}`}>
                  <Button fluid primary content="Manage" style={{ marginBottom: '0.5em' }} />
                </Link>
                <DeleteConfirmationModal
                  buttonFluid
                  buttonBasic
                  deleteUrl={`api/competitions/${competition.id}`}
                  confirmationText={`Are you sure you want to delete the competition "${competition.name}"?`}
                  afterDelete={refreshProps}
                />
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
}

Home.getInitialProps = async (ctx) => {
  // if the user is a scrambler, we redirect them to the /scramble page
  // since they should not be here
  const user = getUser(ctx);
  if (user != null && user.is_scrambler) {
    if (typeof window === 'undefined') {
      const { res } = ctx;
      res.writeHead(302, { Location: '/scramble' });
      res.end();
    } else {
      Router.push('/scramble');
    }
  }
  const res = await authFetch('api/competitions', 'get', null, ctx);
  return { competitions: await res.json() };
};

export default withHeaderFooter(withAuthSync(Home));
