import PropTypes from 'prop-types';

export const Content = ({ product }) => {
  // eslint-disable-next-line no-console
  console.log('product', product);
  return <>Content</>;
};

Content.propTypes = {
  product: PropTypes.any,
};
