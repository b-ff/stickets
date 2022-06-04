import { styled } from '@linaria/react';
import React, { FC, HTMLAttributes, ReactElement } from 'react';

type AvatarProps = HTMLAttributes<HTMLElement> & {
  src?: string;
  name?: string;
};

export const Avatar: FC<AvatarProps> = ({
  src = '',
  name = '',
  ...props
}): ReactElement => {
  const abbr: string = name
    ? name
        .split(' ')
        .map((s: string): string => s[0])
        .join('')
    : '?';

  return (
    <StyledAvatarContainer title={name} {...props}>
      {abbr}
      <StyledAvatarImage style={{ backgroundImage: src ? `url(${src})` : 'none' }} />
    </StyledAvatarContainer>
  );
};

const StyledAvatarContainer = styled.figure`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--controlPrimaryColor);
  border-radius: 50%;
  overflow: hidden;
`;

const StyledAvatarImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
`;
