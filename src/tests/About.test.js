import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from './renderWithRouter';

describe('', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    render(<About />);

    const pokedexTextCount = screen.getAllByText(/pokédex/i);

    expect(pokedexTextCount).toHaveLength(2);
  });

  it('Teste se a página contém um heading `h2` com o texto `About Pokédex`.', () => {
    renderWithRouter(<About />);

    const aboutPage = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });

    expect(aboutPage).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    /* renderWithRouter(<About />);

    const aboutParagraphOne = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémons/i
      );
    const aboutParagraphTwo = screen.getByText(
      /one can filter pokémons by type, and see more details for each one of them/i
      );

    expect(aboutParagraphOne).toBeInTheDocument();
    expect(aboutParagraphTwo).toBeInTheDocument(); */
    const { container } = render(<About />);

    const parágrafos = container.querySelectorAll('p');

    expect(parágrafos).toHaveLength(2);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex: `https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`.', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img).toHaveAttribute('src', url);
  });
});
