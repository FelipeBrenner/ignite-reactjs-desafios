import { render, screen, fireEvent } from '@testing-library/react';
import { RouterContext } from 'next/dist/next-server/lib/router-context';

import Header from '../../components/Header';

const mockedPush = jest.fn();
let RouterWrapper;

describe('Header', () => {
  beforeAll(() => {
    mockedPush.mockImplementation(() => Promise.resolve());
    const MockedRouterContext = RouterContext as React.Context<unknown>;
    RouterWrapper = ({ children }): JSX.Element => {
      return (
        <MockedRouterContext.Provider
          value={{
            push: mockedPush,
          }}
        >
          {children}
        </MockedRouterContext.Provider>
      );
    };
  });

  it('should be able to render logo', () => {
    render(<Header />);

    screen.getByAltText('logo');
  });

  it('should be able to navigate to home page after a click', () => {
    render(<Header />, {
      wrapper: RouterWrapper,
    });

    const secondLink = screen.getByAltText('logo');

    fireEvent.click(secondLink);

    expect(mockedPush).toHaveBeenCalledWith(
      '/',
      expect.anything(),
      expect.anything()
    );
  });
});
