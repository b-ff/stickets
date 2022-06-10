import React, {
  FC,
  HTMLAttributes,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { styled } from '@linaria/react';
import { version } from '../../../manifest.json';
import { ColumnTabs } from '../components/ColumnTabs';
import { ContentCenter } from '../components/ContentCenter';
import { AppearanceSettings } from '../components/AppearanceSettings';
import { NotesSettings } from '../components/NotesSettings';
import { useSettings } from '../hooks/useSettings';

export const PageSettings: FC<HTMLAttributes<HTMLElement>> = (props): ReactElement => {
  const { settings, updateSettings } = useSettings();

  const header = useMemo(
    () => <StyledSettingsHeader {...props}>Settings</StyledSettingsHeader>,
    [],
  );

  const footer = useMemo(
    () => (
      <StyledFooterText {...props}>
        <p>Stickets Chrome Extension</p>
        <p>Version {version}</p>
      </StyledFooterText>
    ),
    [],
  );

  const handleChange = useCallback(
    (data: any) => {
      console.log('PageSettings', settings);
      updateSettings(data);
    },
    [settings, updateSettings],
  );

  const tabs: ITab[] = useMemo(
    () => [
      {
        title: 'Appearance',
        tab: <AppearanceSettings onChange={handleChange} />,
      },
      {
        title: 'Notes',
        tab: <NotesSettings onChange={handleChange} />,
      },
      {
        title: 'About',
        tab: <ContentCenter>About page</ContentCenter>,
      },
    ],
    [],
  );

  return <ColumnTabs header={header} footer={footer} tabs={tabs} />;
};

const StyledSettingsHeader = styled.h1`
  padding: calc(var(--fontBigSize) * 2) var(--fontBigSize);
  font-size: var(--fontBigSize);
  font-weight: 600;
`;

const StyledFooterText = styled.small`
  display: block;
  width: 100%;
  padding: calc(var(--fontBigSize) * 2) var(--fontBigSize);
  font-size: var(--fontSmallSize);
  font-weight: normal;
  line-height: 20px;
  text-align: center;
  color: var(--textTertiaryColor);
  box-sizing: border-box;
`;
