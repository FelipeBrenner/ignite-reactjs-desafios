import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { FiCalendar, FiUser } from 'react-icons/fi';

import Prismic from '@prismicio/client';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import Header from '../components/Header';

import { formatDate } from '../utils';

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
  preview: boolean;
}

export default function Home({
  postsPagination,
  preview,
}: HomeProps): JSX.Element {
  const [nextPage, setNextPage] = useState<string>(postsPagination.next_page);

  const formattedPosts = postsPagination.results.map(post => {
    return {
      ...post,
      first_publication_date: formatDate(post.first_publication_date),
    };
  });

  const [posts, setPosts] = useState<Post[]>(formattedPosts);

  async function handleLoadMorePosts(): Promise<void> {
    const newPostsPagination = await fetch(nextPage).then(response =>
      response.json()
    );

    setNextPage(newPostsPagination.next_page);

    const newFormattedPosts = newPostsPagination.results.map(post => {
      return {
        ...post,
        first_publication_date: formatDate(post.first_publication_date),
      };
    });

    setPosts([...posts, ...newFormattedPosts]);
  }

  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>

      <main className={commonStyles.container}>
        <Header />
        <div className={styles.posts}>
          {posts?.map(post => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <div className={commonStyles.info}>
                  <time>
                    <FiCalendar />
                    {post.first_publication_date}
                  </time>
                  <span>
                    <FiUser />
                    {post.data.author}
                  </span>
                </div>
              </a>
            </Link>
          ))}
          {nextPage && (
            <button type="button" onClick={handleLoadMorePosts}>
              Carregar mais posts
            </button>
          )}
          {preview && (
            <aside>
              <Link href="/api/exit-preview">
                <a className={commonStyles.preview}>Sair do modo Preview</a>
              </Link>
            </aside>
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  previewData,
}) => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      pageSize: 1,
      ref: previewData?.ref ?? null,
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  };

  return {
    props: {
      postsPagination,
      preview,
    },
    revalidate: 60 * 60, // 1 hour
  };
};
