import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

const pokemonNameTestId = 'pokemon-name';
const nextTestId = 'next-pokemon';
const pokemonTypeId = 'pokemon-type';
const types = data.map(({ type }) => type)
  .filter((type, index) => data.indexOf(type) === index);

beforeEach(async () => {
  renderWithRouter(<App />);
  await waitFor(
    () => expect(screen.getByRole(
      'heading', { name: /encountered pokémons/i, level: 2 },
    )).toBeInTheDocument(),
    { timeout: 3000 },
  );
});
test('Teste se página contém um heading h2 com o texto Encountered pokémons.',
  () => {
    const pokedexText = screen.getByRole(
      'heading', { name: /encountered pokémons/i, level: 2 },
    );

    expect(pokedexText).toHaveTextContent(/encountered pokémons/i);
  });

describe('O próximo pokémon da lista é exibido quando o botão Próximo pokémon é clicado',
  () => {
    /* beforeEach(async () => {
      renderWithRouter(<App />);
      await waitFor(
        () => expect(screen.getByRole(
          'heading', { name: /encountered pokémons/i, level: 2 },
        )).toBeInTheDocument(),
        { timeout: 3000 },
      );
    }); */
    it('O botão deve conter o texto Próximo pokémon', () => {
      const nextPokemonButton = screen.getByTestId(nextTestId);
      /* renderWithRouter(<App />);
      await waitFor(
        () => expect(pokemonName).toBeInTheDocument(),
        { timeout: 3000 },
      ); */

      expect(nextPokemonButton).toBeInTheDocument();

      expect(nextPokemonButton).toHaveTextContent(/próximo pokémon/i);
    });
    it('Deve exibir sucessivamente os pokemons, ao clicar se clicar no botão proximo',
      () => {
        const pokemonName = screen.getByTestId(pokemonNameTestId);
        const nextPokemonButton = screen.getByTestId(nextTestId);

        /* renderWithRouter(<App />);
        await waitFor(
          () => expect(nextPokemonButton).toBeInTheDocument(),
          expect(pokemonName).toHaveTextContent(/pikachu/i),
          { timeout: 3000 },
        ); */
        /* Quando a Page é carregada e Clico no meu proximo Pokemon */
        userEvent.click(nextPokemonButton);
        expect(pokemonName).toHaveTextContent(/charmander/i);
      });

    it('Se estiver no último pokémon, ao clicar no botão, deve retornar ao primeiro.',
      () => {
        const pokemonName = screen.getByTestId(pokemonNameTestId);
        const nextPokemonButton = screen.getByTestId(nextTestId);

        /* renderWithRouter(<App />);
        await waitFor(
          () => expect(pokemonName).toHaveTextContent(/Pikachu/i),
          { timeout: 3000 },
        ); */
        /* userEvent.click(nextPokemonButton);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(/Dragonair/i); */
        const pokemons = data;
        for (let i = 0; i <= pokemons.length - 1; i += 1) {
          if (pokemons[i].name !== 'Dragonair') {
            userEvent.click(nextPokemonButton);
          } else {
            expect(pokemonName).toHaveTextContent(/dragonair/i);
          }
        }
        userEvent.click(nextPokemonButton);
        expect(pokemonName).toHaveTextContent(/pikachu/i);
      });
  });

describe('Teste se a Pokédex tem os botões de filtro:', () => {
  it('Deve existir um botão de filtragem para cada tipo de pokémon, sem repetição',
    () => {
      const filterTypePokemon = screen.getAllByTestId('pokemon-type-button');
      const numFilter = 7;
      /* renderWithRouter(<App />);

      const filterTypePokemon = screen.getAllByTestId('pokemon-type-button');
      const numFilter = 7;

      await waitFor(
        () => expect(screen.getByRole(
          'heading', { name: /encountered pokémons/i, level: 2 },
        )).toBeInTheDocument(),
        { timeout: 3000 },
      ); */

      expect(filterTypePokemon).toHaveLength(numFilter);

      types.forEach(
        (type) => expect(screen.getByRole(
          'button', { value: type },
        )).toBeInTheDocument(),
      );
    });
  it('A partir da seleção de um botão de tipo,'
    + 'a Pokédex deve circular somente pelos pokémons daquele tipo;',
  () => {
    const pokemonName = screen.getByTestId(pokemonNameTestId);
    const nextPokemonButton = screen.getByTestId(nextTestId);
    const FilterFire = screen.getByRole('button', { name: /fire/i });
    const FilterPsychic = screen.getByRole('button', { name: /psychic/i });

    /* renderWithRouter(<App />);
    await waitFor(
      () => expect(nextPokemonButton).toBeInTheDocument(),
      expect(pokemonName).toHaveTextContent(/pikachu/i),
      { timeout: 3000 },
    ); */
    /* Quando a Filtro o tipo Fire e Clico no meu proximo Pokemon */
    userEvent.click(FilterFire);
    expect(pokemonName).toHaveTextContent(/charmander/i);

    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent(/rapidash/i);

    /* Quando a Filtro o tipo Psychic e Clico no meu proximo Pokemon */
    userEvent.click(FilterPsychic);
    expect(pokemonName).toHaveTextContent(/alakazam/i);

    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent(/mew/i);
  });
  it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic',
    () => {
      /* renderWithRouter(<App />);
      await waitFor(() => expect(screen.getByRole(
        'button', { name: /All/i },
      )).toBeInTheDocument(),
      { timeout: 3000 }); */

      types.forEach((type) => {
        expect(screen.getByRole('button', { name: type })).toHaveTextContent(type);
      });
    });

  it('O botão All precisa estar sempre visível', async () => {
    /* renderWithRouter(<App />);
    await waitFor(() => expect(screen.getByRole(
      'heading', { name: /encountered pokémons/i, level: 2 },
    )),
    { timeout: 3000 }); */

    expect(screen.getByRole(
      'button', { name: /All/i },
    )).toHaveTextContent(/All/i);
    userEvent.click(screen.getByRole('button', { name: /electric/i }));
    expect(screen.getByRole(
      'button', { name: /All/i },
    )).toBeInTheDocument();

    window.location.reload();
    await waitFor(() => expect(screen.getByRole(
      'button', { name: /all/i },
    )).toBeInTheDocument(),
    { timeout: 3000 });
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    /* renderWithRouter(<App />);
    await waitFor(() => expect(screen.getByRole(
      'heading', { name: /encountered pokémons/i, level: 2 },
    )),
    { timeout: 3000 }); */

    userEvent.click(screen.getByRole('button', { name: /fire/i }));
    expect(screen.getByTestId(pokemonTypeId)).toHaveTextContent('Fire');
    userEvent.click(screen.getByRole('button', { name: /all/i }));
    expect(screen.getByTestId(pokemonTypeId)).toHaveTextContent('Electric');

    userEvent.click(screen.getByRole('button', { name: /bug/i }));
    expect(screen.getByTestId(pokemonTypeId)).toHaveTextContent('Bug');
    userEvent.click(screen.getByRole('button', { name: /all/i }));
    expect(screen.getByTestId(pokemonTypeId)).toHaveTextContent('Electric');
  });
});

/* describe('',()=>{
  it('',()=>{})
}); */
