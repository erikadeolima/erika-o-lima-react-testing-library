import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Teste se é renderizado um card com as informações de determinado pokémon:',
  () => {
    beforeEach(() => {
      renderWithRouter(
        <Pokemon
          pokemon={ pokemons[0] }
          isFavorite
        />,
      );
    });
    it('O nome correto do pokémon deve ser mostrado na tela',
      () => {
        const { name } = pokemons[0];
        expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
      });

    it('O tipo correto do pokémon deve ser mostrado na tela;',
      () => {
        const { type } = pokemons[0];
        expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
      });

    it('O peso médio do pokémon deve ser exibido com um texto'
    + ' no formato `Average weight: valor && unidade de medida`',
    () => {
      const { averageWeight: { value, measurementUnit } } = pokemons[0];
      expect(screen.getByTestId('pokemon-weight'))
        .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    });
    it('A imagem do pokémon deve ser exibida.'
    + ' Ela deve conter um atributo src com a URL da imagem'
    + ' e um atributo alt com o texto `{name} sprite`.',
    () => {
      const { name, image } = pokemons[0];
      const tagImage = screen.getAllByRole('img');

      expect(tagImage).toBeDefined();
      expect(tagImage[0]).toHaveProperty('src', image);
      expect(tagImage[0]).toHaveProperty('alt', `${name} sprite`);
    });
  });

test('Teste se ao clicar no link de navegação do pokémon,'
+ ' é feito o redirecionamento da aplicação para a página de detalhes de pokémon',
() => {
  const { history } = renderWithRouter(
    <Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />,
  );
  const detailsLink = screen.getByRole('link', { name: /more details/i });
  expect(detailsLink).toBeDefined();
  expect(detailsLink).toHaveProperty('href', `http://localhost/pokemons/${pokemons[0].id}`);

  userEvent.click(detailsLink);
  history.push(`/pokemons/${pokemons[0].id}`);
  expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
});

describe('Teste se existe um ícone de estrela nos pokémons favoritados',
  () => {
    it('O ícone deve ser uma imagem com o atributo src', () => {
      renderWithRouter(
        <Pokemon
          pokemon={ pokemons[0] }
          isFavorite
        />,
      );
      const tagImage = screen.getAllByRole('img');

      expect(tagImage).toBeDefined();
      expect(tagImage[1]).toHaveProperty('src', 'http://localhost/star-icon.svg');
    });
    it('A imagem deve ter o atributo alt igual a `{name} is marked as favorite`', () => {
      renderWithRouter(
        <Pokemon
          pokemon={ pokemons[0] }
          isFavorite
        />,
      );
      const tagImage = screen.getAllByRole('img');
      const { name } = pokemons[0];

      expect(tagImage).toBeDefined();
      expect(tagImage[1]).toHaveProperty('alt', `${name} is marked as favorite`);
    });
  });
