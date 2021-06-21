import { GetStaticProps } from 'next';
import Link from 'next/link';

import { FiCalendar, FiUser } from 'react-icons/fi';

import Prismic from '@prismicio/client';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import Header from '../components/Header';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <>
      <main className={`${commonStyles.container} ${styles.content}`}>
        <Header />
        <div className={styles.posts}>
          <Link href="/">
            <a>
              <strong>Titulo</strong>
              <p>Subtitulo e coisarada</p>
              <div>
                <time>
                  <FiCalendar />
                  15 mar 2021
                </time>
                <span>
                  <FiUser />
                  Felipe Brenner
                </span>
              </div>
            </a>
          </Link>
          <Link href="/">
            <a className={styles.post}>
              <strong>Titulo</strong>
              <p>Subtitulo e coisarada</p>
              <div>
                <time>
                  <FiCalendar />
                  15 mar 2021
                </time>
                <span>
                  <FiUser />
                  Felipe Brenner
                </span>
              </div>
            </a>
          </Link>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    Prismic.predicates.at('document.type', 'posts'),
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 3,
    }
  );

  return {
    props: {
      postsResponse,
    },
  };
};
