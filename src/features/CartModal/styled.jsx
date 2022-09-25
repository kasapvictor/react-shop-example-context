import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { colors, spacing } from '@app/theme';
import { COLOR_NAME, INTERVAL_3 } from '@app/constants';

const show = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const hide = keyframes`
  from { opacity: 1 }
  to { opacity: 0 }
`;

export const CartModalWrapper = styled.div(({ isOpen }) => ({
  animation: isOpen ? `${show} 0.${INTERVAL_3}s ease-in-out` : `${hide} 0.${INTERVAL_3}s ease-in-out`,
}));

export const CartModalContainer = styled.div();

export const CartModalHeader = styled.div({
  marginBottom: spacing.medium,
  padding: spacing.medium,
  backgroundColor: colors[COLOR_NAME.WARNING02],
  color: colors[COLOR_NAME.BLACK],
});

export const CartModalFooter = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: spacing.medium,
  backgroundColor: colors[COLOR_NAME.BLACK],
  color: colors[COLOR_NAME.WHITE],
});

export const CartModalBody = styled.div({
  padding: spacing.medium,
});
