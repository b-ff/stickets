import { styled } from '@linaria/react';
import React, { HTMLAttributes } from 'react';

type ErrorCatcherProps = HTMLAttributes<HTMLElement>;

type ErrorCatcherState = {
  error: Error | null;
};

export class ErrorCatcherContainer extends React.Component<ErrorCatcherProps, ErrorCatcherState> {
  constructor(props: ErrorCatcherProps) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidCatch(error: Error) {
    console.error(error);
    this.setState({ error });
  }

  clearError() {
    this.setState({ error: null });
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    return (
      <StyledErrorCatcherContainer>
        {children}
        {Boolean(error) && (
          <StyledErrorContainer>
            <StyledErrorBlur />
            <StyledErrorMessage>
              <StyledErrorHeading>
                An error occured. Extension may work unstable now.
              </StyledErrorHeading>
              <StyledErrorDescription>
                Application may work unstable now. We highly recommend to re-open it so you could
                happily work further. If problem repeats — please let us know. We really want you to
                be happy. Here&apos;s what happend:
              </StyledErrorDescription>
              <StyledErrorDetails>
                {error && error.message ? error.message : `${error}`}
              </StyledErrorDetails>
              <StyledErrorButton onClick={() => this.clearError()}>
                I understand, that application could be unstable. Proceed.
              </StyledErrorButton>
            </StyledErrorMessage>
          </StyledErrorContainer>
        )}
      </StyledErrorCatcherContainer>
    );
  }
}

const StyledErrorCatcherContainer = styled.section`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  --errorPadding: calc(var(--fontBigSize) * 2);
`;

const StyledErrorContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: auto;
`;

const StyledErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: var(--errorPadding);
  box-sizing: border-box;
  text-align: center;
  background-color: rgba(255, 0, 0, 0.5);
  border-radius: 5px;
`;

const StyledErrorBlur = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  backdrop-filter: blur(3px);
  z-index: -1;
`;

const StyledErrorHeading = styled.h2`
  font-size: var(--fontBigSize);
  margin: 0 0 var(--fontBigSize);
`;

const StyledErrorDescription = styled.p`
  font-size: var(--fontSmallSize);
  margin: 0 0 var(--fontBigSize);
`;

const StyledErrorDetails = styled.p`
  font-size: var(--fontSmallSize);
  margin: 0 0 var(--fontBigSize);
  padding: var(--fontSmallSize);
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`;

const StyledErrorButton = styled.button`
  margin: 0;
  padding: var(--fontSmallSize);
  font-size: var(--fontRegularSize);
  background-color: #fff;
  color: rgb(255, 0, 0);
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;
