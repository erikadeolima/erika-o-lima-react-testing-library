import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import pokemons from '../data';

let favoritePokemons = [];

describe('Teste o componente FavoritePokemons', () => {
  it('Teste se é exibida na tela a mensagem `No favorite pokemon found`,'
  + 'caso a pessoa não tenha pokémons favoritos;',
  () => {
    renderWithRouter(<FavoritePokemons />);

    const notFavoriteFoundText = screen.getByText('No favorite pokemon found');
    const favoritesPokemonsList = document.getElementsByClassName('favorite-pokemon');

    expect(notFavoriteFoundText).toBeInTheDocument();

    expect(favoritesPokemonsList).toHaveLength(0);
  });

  it('Teste se existem pokémons favoritados.', () => {
    favoritePokemons = [pokemons[0], pokemons[2], pokemons[4]];
    renderWithRouter(
      <FavoritePokemons
        pokemons={ favoritePokemons }
      />,
    );

    const notFavoFoundText = screen.queryByText('No favorite pokemon found');
    expect(notFavoFoundText).not.toBeInTheDocument();

    const favoritesPokemonsList = document.getElementsByClassName('favorite-pokemon');
    expect(favoritesPokemonsList).toHaveLength(favoritePokemons.length);
  });
});
