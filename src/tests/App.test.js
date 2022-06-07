import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    it('O primeiro link deve possuir o texto `Home`', () => {
      renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toBeInTheDocument();
    });

    it('O segundo link deve possuir o texto', () => {
      renderWithRouter(<App />);
      const aboutLink = screen.getByRole('link', { name: /about/i });
      expect(aboutLink).toBeInTheDocument();
    });

    it('O terceiro link deve possuir o texto `Favorite Pokémons`', () => {
      renderWithRouter(<App />);
      const favoritesLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
      expect(favoritesLink).toBeInTheDocument();
    });
  });

describe('Testando os redirecionamentos dos Links de navegação', () => {
  it('Ao clicar no link `Home`, a aplicação é redirecionada para a URL `/`? ',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/about');

      const homeLink = screen.getByRole('link', { name: /home/i });

      userEvent.click(homeLink);

      expect(window.location.pathname).toEqual('/');
    });

  it('Ao clicar no link `About`, a aplicação é redirecionada para a URL `/about`?',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/favorites');

      const aboutLink = screen.getByRole('link', { name: /about/i });
      expect(aboutLink).toBeInTheDocument();

      userEvent.click(aboutLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/about');

      expect(screen.getByRole(
        'heading', { name: /about pokédex/i, level: 2 },
      )).toBeInTheDocument();
    });

  it('Ao clicar no link `Favorite Pokémons`, a aplicação é redirecionada para a URL `/favorites`?',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/about');

      const favotitesLink = screen.getByRole('link', { name: /favorite pokémons/i });
      expect(favotitesLink).toBeInTheDocument();

      userEvent.click(favotitesLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');

      expect(screen.getByRole(
        'heading', { name: /favorite pokémons/i, level: 2 },
      )).toBeInTheDocument();
    });

  it('Teste se a aplicação é redirecionada para a página `Not Found` ao entrar em uma URL desconhecida.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/*');

    const { pathname } = history.location;
    expect(pathname).toBe('/*');

    expect(screen.getByRole(
      'heading', { name: /Page requested not found/i, level: 2 },
    )).toBeInTheDocument();
  });
});
