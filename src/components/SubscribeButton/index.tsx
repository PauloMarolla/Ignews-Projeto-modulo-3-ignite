import { useSession, signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'
import styles from './styles.module.scss'

interface SusbcribeButtonProps {
  priceId: string,
}

export const SubscribeButton = ({priceId}: SusbcribeButtonProps) => {
  const [session] = useSession()
  const router = useRouter()

  async function handleSubscribe() {
    if(!session) {
      signIn('github')
      return
    }

    if(session.activeSubscription) {
      router.push('/posts');
      return;
    } 

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({sessionId})

    } catch(err) {
      console.log(err.response);
      alert(err.message)
    }

  }

  return (
    <button 
    type="button" 
    className={styles.subscribeButton}
    onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  )
}