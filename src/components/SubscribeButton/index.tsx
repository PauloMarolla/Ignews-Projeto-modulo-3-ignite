import { useSession, signIn } from 'next-auth/client'
import styles from './styles.module.scss'

interface SusbcribeButtonProps {
  priceId: string,
}

export const SubscribeButton = ({priceId}: SusbcribeButtonProps) => {
  const [session] = useSession()

  function handleSubscribe() {
    if(!session) {
      signIn('github')
      return
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