import PropTypes from 'prop-types';
import { Button } from './Button.styled';

const ButtonLoadMore = ({ textButton, handlerOnClick }) => {
  return (
    <Button type="button" onClick={handlerOnClick}>
      {textButton}
    </Button>
  );
};

ButtonLoadMore.propTypes = {
  textButton: PropTypes.string,
  handlerOnClick: PropTypes.func,
};

export default ButtonLoadMore;
