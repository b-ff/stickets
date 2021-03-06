import React, {
  forwardRef,
  HTMLAttributes,
  ReactElement,
  Ref,
  useCallback,
  useLayoutEffect,
  useRef,
  ForwardedRef,
  MutableRefObject,
} from 'react';
import { styled } from '@linaria/react';
import { noop, stripTags, urlify } from '../../common/utils';

type SmartTextareaProps = HTMLAttributes<HTMLParagraphElement> & {
  name?: string;
  placeholder?: string;
  isEditing: boolean;
  onKeyUp?: React.KeyboardEventHandler;
  onChange?: React.FormEventHandler;
  children?: React.ReactNode;
};

export const SmartTextarea = forwardRef<HTMLParagraphElement, SmartTextareaProps>(
  (
    {
      name,
      placeholder,
      isEditing,
      className,
      style = {},
      onKeyUp = noop,
      onChange = noop,
      ...props
    },
    ref: ForwardedRef<HTMLParagraphElement>,
  ): ReactElement => {
    const inputRef: Ref<HTMLInputElement> = useRef(null);

    if (props.children && typeof props.children === 'string') {
      props.dangerouslySetInnerHTML = {
        __html: isEditing ? stripTags(props.children) : urlify(stripTags(props.children)),
      };
      props.children = undefined;
    }

    useLayoutEffect(() => {
      const editableParagraph = ref as MutableRefObject<HTMLParagraphElement>;

      if (inputRef.current && editableParagraph?.current) {
        inputRef.current.value = stripTags(editableParagraph?.current.innerHTML);
      }
    }, [inputRef, ref]);

    const handleKeyUp = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const sanitizedValue = stripTags(target.innerHTML);
        target.value = sanitizedValue;

        if (inputRef.current) {
          inputRef.current.value = sanitizedValue;
        }
        onKeyUp(event);
      },
      [inputRef, onKeyUp],
    );

    const { width, minWidth, maxWidth, height, minHeight, maxHeight, resize } = style;

    return (
      <StyledContainer className={className} style={style}>
        <input ref={inputRef} type="hidden" name={name} />
        <StyledNoteText
          ref={ref}
          contentEditable={isEditing}
          onKeyUp={handleKeyUp}
          style={{
            width,
            minWidth,
            maxWidth,
            height,
            minHeight,
            maxHeight,
            resize,
          }}
          {...props}
        ></StyledNoteText>
        {Boolean(placeholder) && <StyledPlaceholder>{placeholder}</StyledPlaceholder>}
      </StyledContainer>
    );
  },
);

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  margin: 0;
  padding: 0;

  input[type='hidden'] {
    position: absolute;
  }

  p ~ p {
    opacity: 0;
  }

  p:empty ~ p {
    opacity: 1;
  }
`;

const StyledPlaceholder = styled.p`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: calc(var(--fontBigSize) / 2) var(--fontBigSize);
  margin: 0;
  font-family: 'Helvetica';
  font-size: var(--fontRegularSize);
  color: var(--textTertiaryColor);
  box-sizing: border-box;
  opacity: 1;
  pointer-events: none;
  transition: opacity 0.1s ease-in-out;
`;

const StyledNoteText = styled.p`
  position: relative;
  max-width: 100%;
  flex: 1;
  font-family: 'Helvetica';
  font-size: var(--fontRegularSize);
  white-space: pre-wrap;
  word-break: break-word;
  padding: calc(var(--fontBigSize) / 2) var(--fontBigSize);
  margin: 0;
  box-sizing: border-box;
  border: none;
  outline: none;
  z-index: 2;

  &[contenteditable='true'] {
    overflow: auto;
  }

  & a {
    color: inherit;
  }
`;
