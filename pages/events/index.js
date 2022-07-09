import Layout from '@/components/Layout';
import { API_URL, PER_PAGE } from '@/config/index.js';
import Pagination from '@/components/Pagination';
import EventItem from '@/components/EventItem';

export default function EventsPage({
  events,
  page,
  total,
}) {
  console.log(events);
  return (
    <Layout>
      <h1>Events</h1>
      {events.data.length === 0 && (
        <h3>No events to show</h3>
      )}

      {events.data.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({
  query: { page = 1 },
}) {
  console.log(page);
  //  Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const totalRes = await fetch(
    `${API_URL}/api/events/count`
  );
  const total = await totalRes.json();

  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/api/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();

  console.log(events);
  return {
    props: { events },
  };
}
