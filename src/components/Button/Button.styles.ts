import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  $variant: ButtonVariant
}

const variantColourMapping: { [K in ButtonVariant]: string } = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 0;
  margin: 8px;
  // without theme
  /* background: ${(props) => {
    return variantColourMapping[props.$variant]
  }}; */

  // with theme - example of css syntax highlighting
  /* ${(props) => {
    return css`
      background-color: ${props.theme[props.$variant]};
    `
  }} */
  background-color: ${(props) => props.theme[props.$variant]};
`
