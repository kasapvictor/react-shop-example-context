import PropTypes from 'prop-types';

import { Container } from '@app/layouts';

import { FooterStyled } from './styled';

export const Footer = ({ children }) => {
  return (
    <FooterStyled>
      <Container>{children}</Container>
    </FooterStyled>
  );
};

Footer.propTypes = {
  children: PropTypes.node,
};
