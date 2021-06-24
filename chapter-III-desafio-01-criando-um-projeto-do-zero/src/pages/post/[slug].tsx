import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

import Header from '../../components/Header';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>post.data.title | spacetraveling</title>
      </Head>

      <Header />

      <img src="/teste.png" alt="banner" className={styles.banner} />
      <main className={commonStyles.container}>
        <article className={styles.post}>
          <h1>Criando um app CRA do zero</h1>
          <div>
            <time>
              <FiCalendar />
              15 Mar 2021
            </time>
            <span>
              <FiUser />
              Felipe Brenner
            </span>
            <time>
              <FiClock />4 min
            </time>
          </div>
          <h2>Título seção</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa odio,
            corrupti illum praesentium asperiores atque labore placeat sunt
            rerum fugit voluptas qui. Odit velit optio reiciendis, laudantium
            dicta perspiciatis ipsa ex iure fugit consequatur odio aspernatur
            dolores magni dignissimos, atque expedita quo? Dolorum, voluptates
            rerum eos dignissimos hic dolor voluptatem, facere at quia
            laudantium est! Iure eos saepe esse sed, autem dolorum vero quia
            commodi recusandae minima laudantium. Quisquam illum ullam vel
            laudantium in commodi ex saepe corrupti aliquam non?
          </p>
          <h2>Título seção</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa odio,
            corrupti illum praesentium asperiores atque labore placeat sunt
            rerum fugit voluptas qui. Odit velit optio reiciendis, laudantium
            dicta perspiciatis ipsa ex iure fugit consequatur odio aspernatur
            dolores magni dignissimos, atque expedita quo? Dolorum, voluptates
            rerum eos dignissimos hic dolor voluptatem, facere at quia
            laudantium est! Iure eos saepe esse sed, autem dolorum vero quia
            commodi recusandae minima laudantium. Quisquam illum ullam vel
            laudantium in commodi ex saepe corrupti aliquam non?
          </p>
        </article>
      </main>
    </>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps: GetStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
