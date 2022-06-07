import React, {
  FC,
  MutableRefObject,
  ReactNode,
  Ref,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { CustomSelect } from './CustomSelect';
import { Props, StylesConfig } from 'react-select';
import { styled } from '@linaria/react';

type IconWithDropdownType = Props & { icon: ReactNode };

export const IconWithDropdown: FC<IconWithDropdownType> = ({
  icon,
  onChange,
  ...props
}) => {
  const eventRef: MutableRefObject<boolean> = useRef(false);
  const containerRef: Ref<HTMLDivElement> = useRef(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useLayoutEffect(() => {
    const containerClickHandler: EventListener = (event) => {
      eventRef.current = true;
    };
    const bodyClickHandler: EventListener = (event) => {
      if (!eventRef.current && menuIsOpen) {
        setMenuIsOpen(false);
      }

      eventRef.current = false;
    };

    const body = document.querySelector('body');
    const container = containerRef.current;

    body?.addEventListener('click', bodyClickHandler);
    container?.addEventListener('click', containerClickHandler);

    return () => {
      body?.removeEventListener('click', bodyClickHandler);
      container?.removeEventListener('click', containerClickHandler);
    };
  }, [containerRef, eventRef, menuIsOpen, setMenuIsOpen]);

  const handleChange = useCallback(
    (option: any, actionMeta: any) => {
      setMenuIsOpen(false);

      if (onChange) {
        onChange(option, actionMeta);
      }
    },
    [setMenuIsOpen, onChange],
  );

  return (
    <>
      {/* {Boolean(menuIsOpen) && <StyledCloseOverlay onClick={() => setMenuIsOpen(false)} />} */}
      <div ref={containerRef}>
        <CustomSelect
          menuIsOpen={menuIsOpen}
          onChange={handleChange}
          menuShouldScrollIntoView={true}
          closeMenuOnSelect={true}
          menuPlacement="auto"
          isOptionSelected={() => false}
          defaultValue={null}
          components={{
            Control: () => <span onClick={() => setMenuIsOpen(!menuIsOpen)}>{icon}</span>,
            ...props.components,
          }}
          styles={
            {
              menu: (provided) => ({
                ...provided,
                minWidth: '130px !important',
                transform: 'translateX(-100%)',
                marginLeft: '20px !important',
              }),
              option: (provided, state) => ({
                ...provided,
                color: (state.data as any).negative ? '#ed0000 !important' : 'inherit',
              }),
              ...props.styles,
            } as StylesConfig
          }
          {...props}
        />
      </div>
    </>
  );
};

// const StyledCloseOverlay = styled.section`
//   position: fixed;
//   width: 100vw;
//   height: 100vh;
//   top: 0;
//   left: 0;
//   z-index: 2;
// `;
