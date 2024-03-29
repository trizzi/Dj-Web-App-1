import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index.js';
import styles from '@/styles/Event.module.css';
import { useRouter } from 'next/router';
import EventMap from '@/components/EventMap';

export default function EventPage({ evt }) {
  const router = useRouter();

  const deleteEvent = (e) => {
    console.log('Delete');
  };

  return (
    <Layout>
      <div className={styles.event}>
        {/* <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a
            href='#'
            className={styles.delete}
            onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div> */}

        <span>
          {new Date(evt.date).toLocaleDateString('en-US')}{' '}
          at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>
        <EventMap evt={evt} />
        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  const paths = events.data.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }));

  console.log('paths', paths);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  console.log('slugggg', slug);
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json();
  const allEvents = JSON.stringify(events);
  console.log('event', events);

  return {
    props: {
      evt: allEvents[0],
    },
    revalidate: 1,
  };
}

// export async function getServerSIdeProps({
//   query: { slug },
// }) {
//   console.log(slug);
//   const res = await fetch(
//     `${API_URL}/api/events?filters[slug]=${slug}`
//   );
//   const events = await res.json();
//   console.log(events);
//   return {
//     props: {
//       evt: events[0],
//     },
//   };
// }
