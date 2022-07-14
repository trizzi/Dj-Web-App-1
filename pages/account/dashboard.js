import Layout from '@/components/Layout';
import { parseCookies } from '@/helpers/index';
import { API_URL } from '@/config/index';
import styles from '@/styles/Dashboard.module.css';
import DashboardEvent from '@/components/DashboardEvent';

export default function DashboardPage({ events }) {
  const deleteEvent = (id) => {
    console.log(id);
  };

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
      </div>

      {events.map((evt) => (
        <DashboardEvent
          key={evt.id}
          evt={evt}
          handleDelete={deleteEvent}
        />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: ` Bearer ${token}`,
    },
  });

  const events = await res.json();
  return {
    props: { events },
  };
}
