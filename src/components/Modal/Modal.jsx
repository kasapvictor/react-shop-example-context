import PropTypes from 'prop-types';

import { Button } from '@app/components';
import { fontSizes } from '@app/theme';

import { ModalStyled, ModalBody, ModalClose, ModalBackground, ModalContainer } from './styled';

export const Modal = ({ onClose, children }) => {
  return (
    <ModalStyled>
      <ModalContainer>
        <ModalBody>{children}</ModalBody>
        <ModalClose onClick={onClose}>
          <Button variant="danger" size="small">
            <span className="material-icons" style={{ fontSize: fontSizes.large }}>
              close
            </span>
          </Button>
        </ModalClose>
      </ModalContainer>
      <ModalBackground onClick={onClose} />
    </ModalStyled>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};
