import { render, screen } from '@testing-library/react';
import { stripe } from '../../services/stripe';
import { mocked } from 'jest-mock';
import Home, { getStaticProps } from '../../pages';

jest.mock('next/router');
jest.mock('next-auth/client', () => {
	return {
		useSession: () => [null, false],
	};
});
jest.mock('../../services/stripe');

describe('Home page', () => {
	it('render correctly', () => {
		render(<Home product={{ priceId: 'fake-price-id', amount: 'R$10,00' }} />);

		expect(screen.getByText('for R$10,00 month')).toBeInTheDocument();
	});

	//testando uma chamada via SSR na pagina Home, mockando os dados do stripe
	it('loads initial data', async () => {
		const retriveStripePricesMocked = mocked(stripe.prices.retrieve);

		retriveStripePricesMocked.mockResolvedValueOnce({
			id: 'fake-price-id',
			unit_amount: 1000,
		} as any);

		//executa a funcao
		const response = await getStaticProps({});

		//verifica se o objeto esperado contem os dados
		expect(response).toEqual(
			expect.objectContaining({
				props: {
					product: {
						priceId: 'fake-price-id',
						amount: '$10.00',
					},
				},
			}),
		);
	});
});
