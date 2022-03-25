import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { SubscribeButton } from '.';

jest.mock('next-auth/client');
jest.mock('next/router');

describe('SubscribeButton Component', () => {
	it('renders correctly', () => {
		//mock da sessão deslogada
		const useSessionMocked = mocked(useSession);
		useSessionMocked.mockReturnValueOnce([null, false]);

		render(<SubscribeButton />);

		expect(screen.getByText('Subscribe Now')).toBeInTheDocument();
	});

	it('redirects user to sign in when not authenticated', () => {
		const useSessionMocked = mocked(useSession);
		useSessionMocked.mockReturnValueOnce([null, false]);

		const signInMocked = mocked(signIn);

		render(<SubscribeButton />);

		const subscribeButton = screen.getByText('Subscribe Now');

		fireEvent.click(subscribeButton);

		expect(signInMocked).toHaveBeenCalled();
	});

	it('redirects to posts when user already has a subscription', () => {
		//mock da sessao logada
		const useSessionMocked = mocked(useSession);
		useSessionMocked.mockReturnValueOnce([
			{
				user: {
					name: 'John Doe',
					email: 'john.doe@example.com',
				},
				activeSubscription: 'fake-active-subscription',
				expires: 'fake-expires',
			},
			false,
		]);

		//mock do useRouter para mockar a funcao push
		const useRouterMocked = mocked(useRouter);
		const pushMock = jest.fn();

		useRouterMocked.mockReturnValueOnce({
			push: pushMock,
		} as any);

		render(<SubscribeButton />);

		//pega o elemento em tela (retorna o elemento)
		const subscribeButton = screen.getByText('Subscribe Now');

		//verifica se o elemento foi clicado com o param /posts
		fireEvent.click(subscribeButton);
		expect(pushMock).toHaveBeenCalledWith('/posts');
	});
});
