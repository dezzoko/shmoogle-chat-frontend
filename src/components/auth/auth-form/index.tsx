import { FC, PropsWithChildren } from 'react';

import { InputForm, Input, StyledSpanContainer, StyledSpan } from './styled';

interface AuthFormProps {
  postUserHandler: (e: any) => void;
  login: string;
  password: string;
  loginChangeHandler: (e: any) => void;
  passwordChangeHandler: (e: any) => void;
  formId: string;
}

export const AuthForm: FC<PropsWithChildren<AuthFormProps>> = (props: PropsWithChildren<AuthFormProps>) => {
  const { postUserHandler, login, password, loginChangeHandler, passwordChangeHandler, formId, children } = props;

  return (
    <>
      <StyledSpan fontSize={16} fontWeight={400}>
        Используйте аккаунт Google
      </StyledSpan>
      <InputForm id={formId} onSubmit={postUserHandler}>
        <Input value={login} type="email" onChange={loginChangeHandler} placeholder="Введите адрес электронной почты" />
        <Input value={password} type="password" onChange={passwordChangeHandler} placeholder="Введите пароль" />
        <StyledSpanContainer fontSize={14} fontWeight={400}>
          <StyledSpan fontSize={14} fontWeight={0} textAlign="left" color="blue">
            Забыли адрес электронной почты?
          </StyledSpan>
        </StyledSpanContainer>
        {children}
      </InputForm>
    </>
  );
};
