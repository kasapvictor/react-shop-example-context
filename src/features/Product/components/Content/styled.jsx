import styled from '@emotion/styled';

import { colors, spacing } from '@app/theme';
import { COLOR_NAME } from '@app/constants';

const tagStyles = {
  display: 'block',
  height: 40,
  padding: spacing.xsmall,
  borderRadius: spacing.xxsmall,
};

export const ProductDetailsHeader = styled.div({
  position: 'relative',
});

export const ProductMeta = styled.div({
  display: 'flex',
  gap: spacing.small,
  paddingBottom: spacing.medium,
});

export const ProductDetailsBody = styled.div({
  display: 'flex',
  paddingTop: spacing.xlarge,
});

export const ProductPrice = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: spacing.large,
});

export const ProductDetails = styled.div({
  width: '100%',
  maxWidth: 480,
  position: 'relative',
  paddingLeft: spacing.large,
});

export const ProductImage = styled.img({
  width: 300,
  height: 300,
  overflow: 'hidden',
  borderRadius: spacing.medium,
});

export const ProductTag = styled.span({
  ...tagStyles,
  backgroundColor: colors[COLOR_NAME.ERROR],
  color: colors[COLOR_NAME.WHITE],
});

export const ProductTagRare = styled.span({
  ...tagStyles,
  backgroundColor: colors[COLOR_NAME.WARNING01],
  color: colors[COLOR_NAME.BLACK],
});
