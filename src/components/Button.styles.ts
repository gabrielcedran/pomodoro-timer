import { styled, css } from 'styled-components'

interface ButtonContainerProps {
  variant: 'primary' | 'secondary' | 'success' | 'danger'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 50px;

  ${(props) => {
    return css`
      background-color: ${props.theme[props.variant]};
    `
  }}
`
