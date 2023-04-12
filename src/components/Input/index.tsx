import React, { InputHTMLAttributes, forwardRef, ForwardRefRenderFunction } from "react";
import { IconBaseProps } from "react-icons/lib";
import { Container } from "./styles";
import { Button } from '../Button/index';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ComponentType<IconBaseProps>;
  rightIcon?: React.ComponentType<IconBaseProps>;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ leftIcon: LeftIcon, rightIcon: RightIcon, ...rest}, ref) => (
  <Container leftIcon={LeftIcon} rightIcon={RightIcon}>
    {LeftIcon && <LeftIcon size={24}/>}
    <input ref={ref} type="text" {...rest} />
    {RightIcon && <RightIcon size={24}/>}
  </Container>
);

export const Input = forwardRef(InputBase);

export const InputWithButtons: React.FC<InputProps> = ({ leftIcon: LeftIcon, rightIcon: RightIcon, ...rest}) => (
  <Container leftIcon={LeftIcon} rightIcon={RightIcon}>
    {LeftIcon && <Button icon={LeftIcon}/>}
    <input type="text" {...rest} />
    {RightIcon && <Button icon={RightIcon}/>}
  </Container>
);