import styled from '@emotion/styled';

import { colors } from '@app/theme';
import { COLOR_NAME } from '@app/constants';

export const PosterStyled = styled.img({
  width: '100%',
  maxWidth: '100%',
  minHeight: 250,
  flexBasis: '60%',
  objectFit: 'cover',
  backgroundColor: colors[COLOR_NAME.GRAY02],
});
