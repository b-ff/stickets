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
} from "react";
import { styled } from "@linaria/react";
import { noop, stripTags } from "../../common/utils";
import DOMPurify from "dompurify";

type SmartTextareaProps = HTMLAttributes<HTMLParagraphElement> & {
  name?: string;
  placeholder?: string;
  isEditing: boolean;
  onKeyUp?: React.KeyboardEventHandler;
  onChange?: React.FormEventHandler;
  children?: React.ReactNode;
};

export const SmartTextarea = forwardRef<
  HTMLParagraphElement,
  SmartTextareaProps
>(
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
    ref: ForwardedRef<HTMLParagraphElement>
  ): ReactElement => {
    const inputRef: Ref<HTMLInputElement> = useRef(null);

    if (typeof props.children === "string") {
      props.dangerouslySetInnerHTML = {
        __html: DOMPurify.sanitize(props.children, {
          ADD_ATTR: ["target"],
        }),
      };
      props.children = undefined;
    }

    useLayoutEffect(() => {
      const editableParagraph = ref as MutableRefObject<HTMLParagraphElement>;

      if (inputRef.current && editableParagraph?.current) {
        inputRef.current.value = stripTags(
          editableParagraph?.current.innerHTML
        );
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
      [inputRef, onKeyUp]
    );

    const { width, minWidth, maxWidth, height, minHeight, maxHeight, resize } =
      style;

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
        {Boolean(placeholder) && (
          <StyledPlaceholder>{placeholder}</StyledPlaceholder>
        )}
      </StyledContainer>
    );
  }
);

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  margin: 0;
  padding: 0;

  input[type="hidden"] {
    position: absolute;
  }

  p ~ p {
    opacity: 0;
  }

  p:empty ~ p {
    opacity: 0.5;
  }
`;

const StyledPlaceholder = styled.p`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 5px;
  margin: 0;
  font-size: 14px;
  box-sizing: border-box;
  opacity: 0.5;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
`;

const StyledNoteText = styled.p`
  position: relative;
  max-width: 100%;
  flex: 1;
  font-size: 14px;
  white-space: pre-wrap;
  word-break: break-word;
  padding: 5px;
  margin: 0;
  box-sizing: border-box;
  border-radius: 3px;
  z-index: 2;
  background-color: red;

  &[contenteditable="true"] {
    overflow: auto;
    background-color: var(--inputPrimaryColor);
    outline: 1px solid var(--borderPrimaryColor);
  }

  & a {
    color: inherit;
  }
`;
