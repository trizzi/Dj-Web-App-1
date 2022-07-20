import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { parseCookies } from '@/helpers/index';
import { API_URL } from '@/config/index';
import styles from '@/styles/Dashboard.module.css';
import DashboardEvent from '@/components/DashboardEvent';

export default function DashboardPage({ events, token }) {
  const router = useRouter();
  console.log(events);
  const deleteEvent = async (id) => {
    if (confirm('Are you sure>')) {
      const res = await fetch(
        `${API_URL}/api/events/${id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload('/events');
      }
    }
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

  console.log(token);

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: ` Bearer ${token}`,
    },
  });

  const events = await res.json();
  return {
    props: { events, token },
  };
}
