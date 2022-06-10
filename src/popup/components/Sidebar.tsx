import React, {
  FC,
  HTMLAttributes,
  MouseEventHandler,
  ReactElement,
  useCallback,
} from 'react';
import { styled } from '@linaria/react';
import { IconLogo } from '../icons/IconLogo';
import { IconSettings } from '../icons/IconSettings';
import { IconLogout } from '../icons/IconLogout';
import { useAuth } from '../hooks/useAuth';
import { useAppNavigate } from '../../common/hooks/useAppNavigate';
import { Routes } from '../enums/Routes';
import { AppLink } from '../../common/components/AppLink';

export const Sidebar: FC<HTMLAttributes<HTMLElement>> = (props): ReactElement => {
  const [isLoggedIn, doLogout] = useAuth();
  const navigate = useAppNavigate();

  const handleSettingsClick: MouseEventHandler = useCallback(() => {
    navigate(Routes.Settings);
  }, [navigate]);

  const handleLogoutClick: MouseEventHandler = useCallback(() => {
    doLogout();
  }, [doLogout]);

  return (
    <StyledSidebar {...props}>
      <StyledTopIcons>
        <AppLink to={Routes.Notes}>
          <StyledIconLogo />
        </AppLink>
        <StyledIconSettins onClick={handleSettingsClick} />
      </StyledTopIcons>
      {Boolean(isLoggedIn) && <StyledIconLogout onClick={handleLogoutClick} />}
    </StyledSidebar>
  );
};

const StyledSidebar = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledTopIcons = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 8px;
  margin: 12px 10px;
`;

const StyledIconLogo = styled(IconLogo)`
  border-radius: 2px;
`;

const StyledIconSettins = styled(IconSettings)`
  stroke: var(--iconPrimaryColor);
  cursor: pointer;
`;

const StyledIconLogout = styled(IconLogout)`
  margin: 12px 10px;
  stroke: var(--textTertiaryColor);
  cursor: pointer;
`;
