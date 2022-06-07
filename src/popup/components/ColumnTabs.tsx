import React, {
  FC,
  ReactNode,
  HTMLAttributes,
  ReactElement,
  useMemo,
  useState,
} from 'react';
import { styled } from '@linaria/react';
import { applyStyleIfHasProperty, noop } from '../../common/utils';

type TabButtonProps = HTMLAttributes<HTMLButtonElement> & { active: boolean };

type Tab = {
  title: ReactNode;
  badge: ReactNode;
  tab: ReactNode;
};

type ColumnTabsProps = HTMLAttributes<HTMLElement> & {
  header?: ReactNode;
  footer?: ReactNode;
  tabs: Tab[];
};

type TabLinkProps = HTMLAttributes<HTMLElement> & {
  tab: Tab;
  active?: boolean;
  onClick: React.MouseEventHandler;
};

const TabLink: FC<TabLinkProps> = ({
  tab: { title, badge },
  active = false,
  onClick = noop,
  ...props
}): ReactElement => (
  <StyledTabLink {...props}>
    <StyledTabButton type="button" active={active} onClick={onClick}>
      <span>{title}</span>
      <span>{badge}</span>
    </StyledTabButton>
  </StyledTabLink>
);

export const ColumnTabs: FC<ColumnTabsProps> = ({
  header,
  footer,
  tabs,
  ...props
}): ReactElement => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const links = useMemo(
    () =>
      tabs.map((tab, idx) => {
        const key = `${tab.title}-${idx}`;

        return (
          <TabLink
            key={key}
            tab={tab}
            active={activeTabIndex === idx}
            onClick={() => setActiveTabIndex(idx)}
          />
        );
      }),
    [tabs, activeTabIndex, setActiveTabIndex],
  );

  return (
    <StyledColumnTabsContainer {...props}>
      <StyledColumn>
        {header}
        <StyledTabNav>
          <StyledTabLinks>{links}</StyledTabLinks>
        </StyledTabNav>
        {footer}
      </StyledColumn>
      <StyledColumn>
        {tabs.map(({ title, tab }, idx) => {
          const key = `${title}-${idx}`;
          return idx === activeTabIndex && tab;
        })}
      </StyledColumn>
    </StyledColumnTabsContainer>
  );
};

const StyledColumnTabsContainer = styled.section`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`;

const StyledColumn = styled.section`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--controlPrimaryColor);

  &:last-of-type {
    border-right: none;
  }
`;

const StyledTabNav = styled.nav`
  flex: 1;
`;

const StyledTabLinks = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledTabLink = styled.li`
  display: contents;
`;

const StyledTabButton = styled.button<TabButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  margin: 0;
  padding: 0 var(--fontBigSize);
  background-color: ${applyStyleIfHasProperty<TabButtonProps>(
    'active',
    'var(--controlSecondaryColor)',
    'transparent',
  )};
  font-family: 'Helvetica';
  color: var(--textPrimaryColor);
  box-sizing: border-box;
  border: none;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: var(--controlSecondaryColor);
  }
`;
