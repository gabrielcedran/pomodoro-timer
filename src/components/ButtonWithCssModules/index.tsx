import styles from './index.module.css'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
}

export function Button({ variant = 'primary' }: ButtonProps) {
  return (
    // example of how to apply different styles using css modules `styles[colour]`
    <button className={`${styles.button} ${styles[variant]}`}>Send</button>
  )
}
