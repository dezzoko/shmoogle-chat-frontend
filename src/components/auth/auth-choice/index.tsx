import { FC } from "react";
import { StyledChoiceContainer, StyledButton, ButtonVariant } from "./styled"

interface AuthChoice{
    idForm:string;

}

export const AuthChoice:FC<AuthChoice> =({idForm})=>{
    
    return ( <StyledChoiceContainer>
        <StyledButton form={idForm} type="submit" variant={ButtonVariant.outlined}>
          Создать Аккаунт
        </StyledButton>
        <StyledButton form={idForm} type="submit" variant={ButtonVariant.primary}>
          {' '}
          Далее
        </StyledButton>
      </StyledChoiceContainer>)


}