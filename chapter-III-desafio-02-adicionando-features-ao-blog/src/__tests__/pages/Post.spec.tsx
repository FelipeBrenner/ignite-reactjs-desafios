import { render, screen } from '@testing-library/react';
import {
  GetStaticPropsContext,
  GetStaticPathsContext,
  GetStaticPathsResult,
} from 'next';
import { ParsedUrlQuery, parse } from 'querystring';

import { useRouter } from 'next/router';
import { getPrismicClient } from '../../services/prismic';
import Post, { getStaticProps, getStaticPaths } from '../../pages/post/[slug]';

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
      body: Record<string, unknown>[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

interface GetStaticPropsResult {
  props: PostProps;
}

const mockedQueryReturn = {
  results: [
    {
      uid: 'como-utilizar-hooks',
    },
    {
      uid: 'criando-um-app-cra-do-zero',
    },
  ],
};

const mockedGetByUIDReturn = {
  uid: 'como-utilizar-hooks',
  first_publication_date: '2021-03-25T19:25:28+0000',
  data: {
    title: 'Como utilizar Hooks',
    subtitle: 'Pensando em sincronização em vez de ciclos de vida',
    author: 'Joseph Oliveira',
    banner: {
      url:
        'https://images.prismic.io/criando-projeto-do-zero/95494d57-eee2-4adb-9883-befa9829abca_christopher-gower-m_HRfLhgABo-unsplash.jpg?auto=compress,format',
    },
    content: [
      {
        body: [
          {
            type: 'paragraph',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            spans: [],
          },
          {
            type: 'paragraph',
            text:
              'Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit tellus. Nam facilisis sodales felis, pharetra pharetra lectus auctor sed.',
            spans: [],
          },
          {
            type: 'paragraph',
            text:
              'Ut venenatis mauris vel libero pretium, et pretium ligula faucibus. Morbi nibh felis, elementum a posuere et, vulputate et erat. Nam venenatis.',
            spans: [],
          },
        ],
        heading: 'Proin et varius',
      },
      {
        body: [
          {
            type: 'paragraph',
            text:
              'Nulla auctor sit amet quam vitae commodo. Sed risus justo, vulputate quis neque eget, dictum sodales sem. In eget felis finibus, mattis magna a, efficitur ex. Curabitur vitae justo consequat sapien gravida auctor a non risus. Sed malesuada mauris nec orci congue, interdum efficitur urna dignissim. Vivamus cursus elit sem, vel facilisis nulla pretium consectetur. Nunc congue.',
            spans: [
              {
                start: 27,
                end: 32,
                type: 'em',
              },
              {
                start: 365,
                end: 376,
                type: 'strong',
              },
            ],
          },
          {
            type: 'paragraph',
            text:
              'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam consectetur massa nec metus condimentum, sed tincidunt enim tincidunt. Vestibulum fringilla risus sit amet massa suscipit eleifend. Duis eget metus cursus, suscipit ante ac, iaculis est. Donec accumsan enim sit amet lorem placerat, eu dapibus ex porta. Etiam a est in leo pulvinar auctor. Praesent sed vestibulum elit, consectetur egestas libero.',
            spans: [],
          },
          {
            type: 'paragraph',
            text:
              'Ut varius quis velit sed cursus. Nunc libero ante, hendrerit eget consectetur vel, viverra quis lectus. Sed vulputate id quam nec tristique. Etiam lorem purus, imperdiet et porta in, placerat non turpis. Cras pharetra nibh eu libero ullamcorper, at convallis orci egestas. Fusce ut est tellus. Donec ac consectetur magna, nec facilisis enim. Sed vel tortor consectetur, facilisis felis non, accumsan risus. Integer vel nibh et turpis.',
            spans: [
              {
                start: 141,
                end: 158,
                type: 'hyperlink',
                data: {
                  link_type: 'Media',
                  name: 'christopher-gower-m_HRfLhgABo-unsplash.jpg',
                  kind: 'image',
                  url:
                    'https://images.prismic.io/criando-projeto-do-zero/95494d57-eee2-4adb-9883-befa9829abca_christopher-gower-m_HRfLhgABo-unsplash.jpg?auto=compress,format',
                  size: '876817',
                  height: '2584',
                  width: '3882',
                },
              },
            ],
          },
          {
            type: 'paragraph',
            text:
              'Nam eu sollicitudin neque, vel blandit dui. Aliquam luctus aliquet ligula, sed:',
            spans: [],
          },
          {
            type: 'list-item',
            text:
              'Suspendisse ac facilisis leo. Sed nulla odio, aliquam ut lobortis vitae, viverra quis risus. Vivamus pulvinar enim sit amet elit porttitor bibendum. Nulla facilisi. Aliquam libero libero, porta ac justo vitae, dapibus convallis sapien. Praesent a nibh pretium, ultrices urna eget, vulputate felis. Phasellus ac sagittis ipsum, a congue lectus. Integer interdum ut velit vehicula volutpat. Nulla facilisi. Nulla rhoncus metus lorem, sit amet facilisis ipsum faucibus et. Lorem ipsum.',
            spans: [],
          },
          {
            type: 'list-item',
            text:
              'Curabitur a rutrum ante. Praesent in justo sagittis, dignissim quam facilisis, faucibus dolor. Vivamus sapien diam, faucibus sed sodales sed, tincidunt quis sem. Donec tempus ipsum massa, ut fermentum ante molestie consectetur. In hac habitasse platea dictumst. Sed non finibus nibh, vitae dapibus arcu. Sed lorem magna, imperdiet non pellentesque et, rhoncus ac enim. Class aptent taciti sociosqu ad litora torquent per conubia.',
            spans: [],
          },
          {
            type: 'paragraph',
            text:
              'Praesent ac sapien eros. Suspendisse potenti. Morbi eu ante nibh. Proin dictum, tellus ut molestie tincidunt, urna tortor sodales velit, ut tempor lectus ipsum nec sapien. Nulla nec purus vitae libero aliquet posuere non et sapien. Cras in erat rhoncus, dignissim ligula iaculis, faucibus orci. Donec ligula neque, imperdiet vitae mauris eget, egestas varius massa. Praesent ornare nisi at dui dapibus, ac tristique felis.',
            spans: [],
          },
          {
            type: 'paragraph',
            text:
              'Phasellus maximus urna lacus, non imperdiet ex blandit sit amet. Vivamus et tellus est. Mauris ligula elit, placerat non tellus a, dictum porttitor urna. Phasellus mollis turpis id suscipit dapibus. In dolor.',
            spans: [],
          },
          {
            type: 'paragraph',
            text:
              'Sed sit amet euismod sapien, non eleifend erat. Vivamus et quam odio. Integer nisi lacus, maximus sit amet turpis in, luctus molestie sem. Duis sit amet euismod erat. Fusce pulvinar ex neque, egestas cursus nulla ullamcorper vel. Pellentesque mollis erat egestas est rhoncus, sit amet sodales massa ullamcorper. Etiam auctor ante a neque facilisis tristique. Proin ultricies fringilla turpis, eget tempus elit imperdiet non. Quisque.',
            spans: [],
          },
          {
            type: 'paragraph',
            text:
              'Etiam eu tortor placerat, varius orci non, ornare nunc. Cras suscipit in ligula ultricies lacinia. Pellentesque at tristique sapien, et scelerisque leo. Donec eu nisi at magna tristique luctus vel at turpis. Nam vestibulum ornare ex cursus vulputate. In elementum tellus at sapien bibendum, id maximus mauris convallis. Donec facilisis porta lobortis. Vivamus mauris diam, pretium ac dolor.',
            spans: [],
          },
          {
            type: 'paragraph',
            text: 'Pellentesque et consequat arcu, ac laoreet ante. Nam non.',
            spans: [
              {
                start: 49,
                end: 56,
                type: 'strong',
              },
            ],
          },
        ],
        heading: 'Cras laoreet mi',
      },
    ],
  },
};

jest.mock('@prismicio/client');
jest.mock('../../services/prismic');
jest.mock('next/router');
const mockedUseRouter = useRouter as jest.Mock;
const mockedPrismic = getPrismicClient as jest.Mock;

describe('Post', () => {
  beforeAll(() => {
    mockedUseRouter.mockReturnValue({
      isFallback: false,
    });

    mockedPrismic.mockReturnValue({
      getByUID: () => {
        return Promise.resolve(mockedGetByUIDReturn);
      },
      query: () => {
        return Promise.resolve(mockedQueryReturn);
      },
    });
  });

  it('should be able to return prismic posts documents paths using getStaticPaths', async () => {
    const getStaticPathsReturn = [
      {
        params: {
          slug: 'como-utilizar-hooks',
        },
      },
      {
        params: {
          slug: 'criando-um-app-cra-do-zero',
        },
      },
    ];

    const getStaticPathsContext: GetStaticPathsContext = {};

    const response = (await getStaticPaths(
      getStaticPathsContext
    )) as GetStaticPathsResult;

    expect(response.paths).toEqual(getStaticPathsReturn);
  });

  it('should be able to return prismic post document using getStaticProps', async () => {
    const routeParam = parse('como-utilizar-hooks');

    const postReturn = mockedGetByUIDReturn;
    const getStaticPropsContext: GetStaticPropsContext<ParsedUrlQuery> = {
      params: routeParam,
    };

    const response = (await getStaticProps(
      getStaticPropsContext
    )) as GetStaticPropsResult;

    expect(response.props.post).toEqual(expect.objectContaining(postReturn));
  });

  it('should be able to render post document info', () => {
    const postProps = mockedGetByUIDReturn;

    render(<Post post={postProps} />);

    screen.getByText('Como utilizar Hooks');
    screen.getByText('25 mar 2021');
    screen.getByText('Joseph Oliveira');
    screen.getByText('4 min');

    screen.getByText('Proin et varius');
    screen.getByText(/Nullam dolor sapien/);
    screen.getByText('Cras laoreet mi');
    screen.getByText(/Ut varius quis velit sed cursus/);
  });

  it('should be able to render loading message if fallback', () => {
    mockedUseRouter.mockReturnValueOnce({
      isFallback: true,
    });

    const postProps = mockedGetByUIDReturn;

    render(<Post post={postProps} />);

    screen.getByText('Carregando...');
  });
});
