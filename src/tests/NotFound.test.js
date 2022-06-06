import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found 😭', () => {
    render(<NotFound />);

    const notFound = screen.getByRole('heading', {name:/page requested not found/i, level:2});
    
    expect(notFound).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    render(<NotFound />);

    const img = screen.getAllByRole('img')[1];
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img).toHaveAttribute('src', url);
  });
});

