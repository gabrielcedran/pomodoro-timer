import { ButtonContainer } from './Button.styles'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
}

export const Button = ({ variant = 'primary' }: ButtonProps) => {
  return <ButtonContainer variant={variant}>Click me</ButtonContainer>
}
