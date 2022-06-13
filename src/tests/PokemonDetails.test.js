import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const checkboxLabel = 'Pokémon favoritado?';

beforeEach(() => {
  const { history } = renderWithRouter(
    <App
      isFavorite
    />,
  );
  history.push(`/pokemons/${pokemons[0].id}`);
});

describe('Teste se as informações detalhadas'
+ 'do pokémon selecionado são mostradas na tela',
() => {
  it('A página deve conter um texto `{name} Details`',
    () => {
      expect(screen.getAllByRole('heading', { level: 2 })[0])
        .toHaveTextContent(pokemons[0].name);
    });
  it('Não deve existir o link de navegação para os detalhes do pokémon selecionado',
    () => {
      expect(screen.queryByRole('link', { name: /more details/i }))
        .not.toBeInTheDocument();
    });
  it('A seção de detalhes deve conter um heading `h2` com o texto `Summary`',
    () => {
      expect(screen.getAllByRole('heading', { level: 2 })[1])
        .toHaveTextContent(/summary/i);
    });
  it('A seção de detalhes deve conter um parágrafo com'
  + ' o resumo do pokémon específico sendo visualizado.',
  () => {
    expect(screen.getByText(pokemons[0].summary))
      .toHaveTextContent(pokemons[0].summary);
  });
});

describe('Teste se existe na página uma seção com os'
+ 'mapas contendo as localizações do pokémon',
() => {
  it('Na seção de detalhes deverá existir um heading `h2`'
  + ' com o texto `Game Locations of {name}`.',
  () => {
    expect(screen.getAllByRole('heading', { level: 2 })[2])
      .toHaveTextContent(`Game Locations of ${pokemons[0].name}`);
  });
  it('Todas as localizações do pokémon devem ser mostradas na seção de detalhes;',
    () => {
      expect(screen.getAllByAltText(/location/i))
        .toHaveLength(pokemons[0].foundAt.length);
    });
  it('Devem ser exibidos o nome da localização e uma imagem do mapa em cada localização;',
    () => {
      const locations = pokemons[0].foundAt;
      locations.forEach((local) => expect(screen.getByText(local.location))
        .toBeInTheDocument());
      expect(screen.getAllByAltText(/location/i)[0])
        .toHaveProperty('src', locations[0].map);
      expect(screen.getAllByAltText(/location/i)[1])
        .toHaveProperty('src', locations[1].map);
    });
  it('A imagem da localização deve ter um atributo `src` com a URL da localização.',
    () => {
      const locations = pokemons[0].foundAt;
      expect(screen.getAllByAltText(/location/i)[0])
        .toHaveProperty('src', locations[0].map);
      expect(screen.getAllByAltText(/location/i)[1])
        .toHaveProperty('src', locations[1].map);
    });
  it('A imagem da localização deve ter um atributo `alt` com o texto `{name} location`.',
    () => {
      expect(screen.getAllByAltText(/location/i)[0])
        .toHaveProperty('alt', `${pokemons[0].name} location`);
    });
});

describe('Teste se o usuário pode favoritar um pokémon através da página de detalhes',
  () => {
    it('A página deve exibir um `checkbox` que permite favoritar o pokémon',
      () => {
        expect(screen.getByRole('checkbox', { name: checkboxLabel }).checked)
          .toBeFalsy();
        userEvent.click(screen.getByRole('checkbox', { name: checkboxLabel }));
        expect(screen.getByRole('checkbox', { name: checkboxLabel }).checked)
          .toBeTruthy();
      });
    /* it('Cliques alternados no `checkbox` devem adicionar'
    + ' e remover respectivamente o pokémon da lista de favoritos',
    () => {
      // como testar uma propiedade do react
    }); */
    it('O `label` do `checkbox` deve conter o texto `Pokémon favoritado?`',
      () => {
        expect(screen.getByRole('checkbox', { name: 'Pokémon favoritado?' }))
          .toBeInTheDocument();
      });
  });
