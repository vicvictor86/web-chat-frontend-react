import React, { InputHTMLAttributes } from "react";
import { IconBaseProps } from "react-icons/lib";
import { Container } from "./styles";
import { Button } from '../Button/index';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ComponentType<IconBaseProps>;
  rightIcon?: React.ComponentType<IconBaseProps>;
}

export const Input: React.FC<InputProps> = ({ leftIcon: LeftIcon, rightIcon: RightIcon, ...rest}) => (
  <Container leftIcon={LeftIcon} rightIcon={RightIcon}>
    {LeftIcon && <LeftIcon size={24}/>}
    <input type="text" {...rest} />
    {RightIcon && <RightIcon size={24}/>}
  </Container>
);

export const InputWithButtons: React.FC<InputProps> = ({ leftIcon: LeftIcon, rightIcon: RightIcon, ...rest}) => (
  <Container leftIcon={LeftIcon} rightIcon={RightIcon}>
    {LeftIcon && <Button icon={LeftIcon}/>}
    <input type="text" {...rest} />
    {RightIcon && <Button icon={RightIcon}/>}
  </Container>
);