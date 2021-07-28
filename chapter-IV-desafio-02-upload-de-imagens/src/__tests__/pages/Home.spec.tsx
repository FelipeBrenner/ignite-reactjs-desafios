import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AxiosMock from 'axios-mock-adapter';

import Home from '../../pages/index';
import { theme } from '../../styles/theme';
import { api } from '../../services/api';

const apiMock = new AxiosMock(api);

let queryClient: QueryClient;
let wrapper;

describe('Home page', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC';
    const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC';
    Object.defineProperty(global.Image.prototype, 'src', {
      set(src) {
        if (src === LOAD_FAILURE_SRC) {
          setTimeout(() => {
            if (this.onerror) {
              this.onerror(new Error('mocked error'));
            }
          });
        } else if (src === LOAD_SUCCESS_SRC) {
          setTimeout(() => {
            if (this.onload) {
              this.onload();
            }
          });
        }
      },
    });

    function noOp(): string {
      return 'noOp';
    }
    Object.defineProperty(window.URL, 'createObjectURL', { value: noOp });
  });

  beforeEach(() => {
    apiMock.reset();

    queryClient = new QueryClient();

    wrapper = ({ children }): JSX.Element => (
      <ChakraProvider resetCSS theme={theme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ChakraProvider>
    );
  });

  it('should be able to render loading', async () => {
    apiMock.onGet('/api/images').reply(200);

    render(<Home />, { wrapper });

    expect(
      screen.getByRole('heading', { name: 'Carregando aplicação...' })
    ).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should be able to render error', async () => {
    const mockedConsoleError = jest.fn();
    Object.defineProperty(console, 'error', {
      value: mockedConsoleError,
    });

    apiMock.onGet('/api/images').reply(400);
    queryClient.setQueryDefaults('images', { retry: 0 });

    render(<Home />, { wrapper });

    expect(
      await screen.findByText('Infelizmente ocorreu um erro =(')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Clique aqui para tentar novamente' })
    ).toBeInTheDocument();
  });

  it('should be able to render images list', async () => {
    apiMock.onGet('/api/images').reply(200, {
      after: null,
      data: [
        {
          id: '1617555636970000',
          ts: 1617555636970000,
          title: 'Doge',
          description: 'The best doge',
          url: 'LOAD_SUCCESS_SRC',
        },
        {
          id: '1617556158800000',
          ts: 1617556158800000,
          title: 'Danilo',
          description: 'The best friend',
          url: 'LOAD_SUCCESS_SRC',
        },
      ],
    });

    render(<Home />, { wrapper });

    expect(await screen.findByText('The best doge')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Doge' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Doge' })).toBeInTheDocument();

    expect(await screen.findByText('The best friend')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Danilo' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Danilo' })).toBeInTheDocument();
  });

  it('should be able to view an image', async () => {
    apiMock.onGet('/api/images').reply(200, {
      after: null,
      data: [
        {
          id: '1617555636970000',
          ts: 1617555636970000,
          title: 'Doge',
          description: 'The best doge',
          url: 'LOAD_SUCCESS_SRC',
        },
      ],
    });

    render(<Home />, { wrapper });

    expect(await screen.findByText('The best doge')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Doge' })).toBeInTheDocument();
    const dogeImg = screen.getByRole('img', { name: 'Doge' });
    expect(dogeImg).toBeInTheDocument();

    fireEvent.click(dogeImg);

    expect(await screen.findByText('Abrir original')).toBeInTheDocument();
    expect(screen.getByText('Abrir original')).toHaveAttribute(
      'href',
      'LOAD_SUCCESS_SRC'
    );
  });

  it('should be able to load more images', async () => {
    apiMock.onGet('/api/images').replyOnce(200, {
      after: 'next-cursor',
      data: [
        {
          id: '1617555636970000',
          ts: 1617555636970000,
          title: 'Doge',
          description: 'The best doge',
          url: 'LOAD_SUCCESS_SRC',
        },
        {
          id: '1617556158800000',
          ts: 1617556158800000,
          title: 'Danilo',
          description: 'The best friend',
          url: 'LOAD_SUCCESS_SRC',
        },
      ],
    });
    apiMock.onGet('/api/images').replyOnce(200, {
      after: null,
      data: [
        {
          id: '1617555636990000',
          ts: 1617555636990000,
          title: 'Vini',
          description: 'The ??',
          url: 'LOAD_SUCCESS_SRC',
        },
      ],
    });

    render(<Home />, { wrapper });

    expect(await screen.findByText('The best doge')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Doge' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Doge' })).toBeInTheDocument();

    expect(await screen.findByText('The best friend')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Danilo' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Danilo' })).toBeInTheDocument();

    const loadMoreButton = await screen.findByRole('button', {
      name: 'Carregar mais',
    });
    fireEvent.click(loadMoreButton);

    expect(await screen.findByText('The best doge')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Doge' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Doge' })).toBeInTheDocument();

    expect(await screen.findByText('The best friend')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Danilo' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Danilo' })).toBeInTheDocument();

    expect(await screen.findByText('The ??')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Vini' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Vini' })).toBeInTheDocument();

    expect(loadMoreButton).not.toBeInTheDocument();
  });

  it('should be able to add a new image', async () => {
    apiMock.onGet('/api/images').replyOnce(200, {
      after: 'next-cursor',
      data: [
        {
          id: '1617555636970000',
          ts: 1617555636970000,
          title: 'Doge',
          description: 'The best doge',
          url: 'LOAD_SUCCESS_SRC',
        },
        {
          id: '1617556158800000',
          ts: 1617556158800000,
          title: 'Danilo',
          description: 'The best friend',
          url: 'LOAD_SUCCESS_SRC',
        },
      ],
    });
    apiMock.onGet('/api/images').replyOnce(200, {
      after: null,
      data: [
        {
          id: '1617555636990000',
          ts: 1617555636990000,
          title: 'Vini',
          description: 'The ??',
          url: 'LOAD_SUCCESS_SRC',
        },
      ],
    });
    apiMock.onPost('https://api.imgbb.com/1/upload').replyOnce(200, {
      data: {
        url: 'LOAD_SUCCESS_SRC',
      },
    });

    const file = new File(['image'], 'image.png', { type: 'image/png' });

    render(<Home />, { wrapper });

    expect(await screen.findByText('The best doge')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Doge' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Doge' })).toBeInTheDocument();

    expect(await screen.findByText('The best friend')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Danilo' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Danilo' })).toBeInTheDocument();

    const loadMoreButton = await screen.findByRole('button', {
      name: 'Carregar mais',
    });
    fireEvent.click(loadMoreButton);

    expect(await screen.findByText('The best doge')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Doge' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Doge' })).toBeInTheDocument();

    expect(await screen.findByText('The best friend')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Danilo' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Danilo' })).toBeInTheDocument();

    expect(await screen.findByText('The ??')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Vini' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Vini' })).toBeInTheDocument();

    expect(loadMoreButton).not.toBeInTheDocument();

    const addNewImageButton = screen.getByText('Adicionar imagem');
    fireEvent.click(addNewImageButton);

    const fileInput = screen.getByTestId('image') as HTMLInputElement;
    const nameInput = screen.getByRole('textbox', {
      name: 'title',
    }) as HTMLInputElement;
    const descriptionInput = screen.getByRole('textbox', {
      name: 'description',
    }) as HTMLInputElement;

    userEvent.upload(fileInput, file);
    fireEvent.change(nameInput, {
      target: {
        value: 'Rocket League',
      },
    });
    fireEvent.change(descriptionInput, {
      target: {
        value: 'Flying forever',
      },
    });

    await screen.findByRole('img', { name: 'Uploaded photo' });
    expect(fileInput.files[0]).toStrictEqual(file);
    expect(nameInput).toHaveValue('Rocket League');
    expect(descriptionInput).toHaveValue('Flying forever');

    const submitButton = screen.getByRole('button', { name: 'Enviar' });

    apiMock.onPost('/api/images').replyOnce(200);
    apiMock.onGet('/api/images').replyOnce(200, {
      after: 'next-cursor',
      data: [
        {
          id: '1617555636970000',
          ts: 1617555636970000,
          title: 'Doge',
          description: 'The best doge',
          url: 'LOAD_SUCCESS_SRC',
        },
        {
          id: '1617556158800000',
          ts: 1617556158800000,
          title: 'Danilo',
          description: 'The best friend',
          url: 'LOAD_SUCCESS_SRC',
        },
      ],
    });
    apiMock.onGet('/api/images').replyOnce(200, {
      after: null,
      data: [
        {
          id: '1617555636990000',
          ts: 1617555636990000,
          title: 'Vini',
          description: 'The ??',
          url: 'LOAD_SUCCESS_SRC',
        },
        {
          id: '1617555639990000',
          ts: 1617555639990000,
          title: 'Rocket League',
          description: 'Flying forever',
          url: 'LOAD_SUCCESS_SRC',
        },
      ],
    });

    fireEvent.click(submitButton);

    expect(await screen.findByText('The best doge')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Doge' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Doge' })).toBeInTheDocument();

    expect(await screen.findByText('The best friend')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Danilo' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Danilo' })).toBeInTheDocument();

    expect(await screen.findByText('The ??')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Vini' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Vini' })).toBeInTheDocument();

    expect(await screen.findByText('Flying forever')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Rocket League' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Rocket League' })
    ).toBeInTheDocument();

    expect(loadMoreButton).not.toBeInTheDocument();
  });
});
