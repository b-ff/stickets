import React, { forwardRef, useCallback, useLayoutEffect, useRef } from "react";
import { styled } from "@linaria/react";
import { noop, stripTags } from "../../common/utils";
import DOMPurify from "dompurify";

export const SmartTextarea = forwardRef(
  (
    {
      name,
      placeholder,
      isEditing,
      style = {},
      className,
      onKeyUp = noop,
      onChange = noop,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef();

    if (typeof props.children === "string") {
      props.dangerouslySetInnerHTML = {
        __html: DOMPurify.sanitize(props.children, {
          ADD_ATTR: ["target"],
        }),
      };
      props.children = undefined;
    }

    useLayoutEffect(() => {
      if (inputRef.current && ref?.current) {
        inputRef.current.value = stripTags(ref.current.innerHTML);
      }
    }, [inputRef, ref]);

    const handleKeyUp = useCallback(
      (event) => {
        const sanitizedValue = stripTags(event.target.innerHTML);
        inputRef.current.value = sanitizedValue;
        event.target.value = sanitizedValue;
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

  &[contenteditable="true"] {
    overflow: auto;
    background-color: var(--inputPrimaryColor);
    outline: 1px solid var(--borderPrimaryColor);
  }

  & a {
    color: inherit;
  }
`;
