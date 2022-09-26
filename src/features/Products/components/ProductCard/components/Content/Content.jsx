import PropTypes from 'prop-types';

import { ContentStyled } from './styled';

export const Content = ({ children }) => {
  return <ContentStyled>{children}</ContentStyled>;
};

Content.propTypes = {
  children: PropTypes.node,
};
