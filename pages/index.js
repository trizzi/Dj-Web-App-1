import Layout from '@/components/Layout';
import { API_URL } from '@/config/index.js';
import Link from 'next/link';
import EventItem from '@/components/EventItem';

export default function Home({ events }) {
  console.log(events);
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.data.length === 0 && (
        <h3>No events to show</h3>
      )}

      {events.data.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}
      {events.data.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${API_URL}/api/events?_sort=date:ASC&_limit=3`
  );
  const events = await res.json();

  console.log(events);
  return {
    props: { events },
    revalidate: 1,
  };
}
