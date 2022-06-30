import Layout from '../components/Layout';
import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';
import styles from '../styles/404.module.css';

export default function NotFoundPage() {
  return (
    <Layout>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle /> 404
        </h1>
        <h4>Sorry, Page Not Found</h4>
        <Link href='/'>Go Back Home</Link>
      </div>
    </Layout>
  );
}
