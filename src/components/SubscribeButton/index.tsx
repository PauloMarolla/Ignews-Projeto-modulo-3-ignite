import styles from './styles.module.scss'

interface SusbcribeButtonProps {
  priceId: string,
}

export const SubscribeButton = ({priceId}: SusbcribeButtonProps) => {
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe Now
    </button>
  )
}