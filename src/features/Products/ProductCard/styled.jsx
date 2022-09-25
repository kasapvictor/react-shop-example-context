import styled from '@emotion/styled';

import { colors, spacing } from '@app/theme';

export const ProductCardStyled = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: 460,
  border: '1px solid',
  borderColor: colors.gray02,
  borderRadius: '8px',
  overflow: 'hidden',
  position: 'relative',
});

export const ProductHeaderStyled = styled.div({
  paddingBottom: spacing.small,

  '& *': {
    lineHeight: '1.2',
  },
});

export const BodyStyled = styled.div({
  flexGrow: 1,
});

export const FooterStyled = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: 45,
});
