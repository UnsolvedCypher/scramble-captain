import {
  Container, Menu, Item, Button,
} from 'semantic-ui-react';
import Link from 'next/link';
import Router from 'next/router';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { withAuthSync, authFetch } from '../components/withAuthSync';
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
      <Item.Group divided>
        {competitions.map((competition) => (
          <Item key={competition.id}>
            {/* <Label color={scramble.} */}
            <Link href="/competitions/[competitionId]" as={`/competitions/${competition.id}`}>
              <Item.Header content={competition.name} />
            </Link>
            <Item.Extra>
              <DeleteConfirmationModal
                deleteUrl={`api/competitions/${competition.id}`}
                confirmationText={`Are you sure you want to delete the competition "${competition.name}"?`}
                afterDelete={refreshProps}
              />
            </Item.Extra>
          </Item>
        ))}
      </Item.Group>
      <NewCompetitionModal onAdd={refreshProps} />
    </Container>
  );
}

Home.getInitialProps = async (ctx) => {
  const res = await authFetch('api/competitions', 'get', null, ctx);
  return { competitions: await res.json() };
};

export default withHeaderFooter(withAuthSync(Home));
