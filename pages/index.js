import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import Link from 'next/link';
import EventItem from '@/components/EventItem';

export default function Home({ events }) {
  console.log(events);
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.name} />
      ))}
      {events.length > 0 && (
        <Link hrefs='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  console.log(events);
  return {
    props: { events: events.slice(0, 3) },
    revalidate: 1,
  };
}
