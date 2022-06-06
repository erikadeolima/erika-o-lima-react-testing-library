import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    it('O primeiro link deve possuir o texto `Home`', () => {
      renderWithRouter(<App />);
      const homeLink = screen.getByRole('link',{name:/home/i});
      expect(homeLink).toBeInTheDocument();
    });

    it('O segundo link deve possuir o texto', () => {
      renderWithRouter(<App />);
      const aboutLink = screen.getByRole('link',{name:/about/i});
      expect(aboutLink).toBeInTheDocument();
    });
    
    it('O terceiro link deve possuir o texto `Favorite Pokémons`', () => {
      renderWithRouter(<App />);
      const favoritesLink = screen.getByRole('link',{name:/Favorite Pokémons/i});
      expect(favoritesLink).toBeInTheDocument();
    });
  });
  
  describe('Testando os redirecionamentos dos Links de navegação',() => {
    it('Teste se a aplicação é redirecionada para a página inicial, na URL `/` ao clicar no link `Home` da barra de navegação.', () => {
      const {history}=renderWithRouter(<App />);
      history.push('/about');

      const homeLink = screen.getByRole('link',{name:/home/i});

      userEvent.click(homeLink);

      expect(window.location.pathname).toEqual('/');

    });

    it('Teste se a aplicação é redirecionada para a página de `About`, na URL `/about`, ao clicar no link `About` da barra de navegação.', async () => {
      const {history}=renderWithRouter(<App />);
      history.push('/favorites');

      const aboutLink = screen.getByRole('link',{name:/about/i});
      expect(aboutLink).toBeInTheDocument();

      userEvent.click(aboutLink);

      const {pathname} = history.location;
      expect(pathname).toBe('/about');
      
      expect(screen.getByRole('heading', {name:/about pokédex/i, level:2})).toBeInTheDocument();
    });

    it('Teste se a aplicação é redirecionada para a página de `Pokémons Favoritados`, na URL `/favorites`, ao clicar no link `Favorite Pokémons` da barra de navegação.', async () => {
      const {history}=renderWithRouter(<App />);
      history.push('/about');

      const favotitesLink = screen.getByRole('link',{name:/favorite pokémons/i});
      expect(favotitesLink).toBeInTheDocument();

      userEvent.click(favotitesLink);

      const {pathname} = history.location;
      expect(pathname).toBe('/favorites');
      
      expect(screen.getByRole('heading', {name:/favorite pokémons/i, level:2})).toBeInTheDocument();
    });

    it('Teste se a aplicação é redirecionada para a página `Not Found` ao entrar em uma URL desconhecida.', async () => {
      const {history}=renderWithRouter(<App />);
      history.push('/*');

      const {pathname} = history.location;
      expect(pathname).toBe('/*');
      
      expect(screen.getByRole('heading', {name:/Page requested not found/i, level:2})).toBeInTheDocument();
    });
  });
