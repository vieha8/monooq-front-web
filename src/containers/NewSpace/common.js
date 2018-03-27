import FormValidator from 'containers/helper/FormValidator';
import { errorActions } from '../../redux/modules/error';
import { uiActions } from '../../redux/modules/ui';
import { spaceActions } from '../../redux/modules/space';

//TODO HOCにした方がクリーン

export const mapStateToProps = state => {
  if (!state.ui.space.id && state.space.space) {
    const { space } = state.space;
    state.ui.space = {
      id: space.ID,
      title: space.Title,
      type: space.Type,
      introduction: space.Introduction,
      address: space.Address,
      images: space.Images,
      about: space.About,
      isFurniture: space.IsFurniture,
      receiptType: space.ReceiptType,
      receiptAbout: space.ReceiptAbout,
      sizeType: space.SizeType,
      priceFull: space.PriceFull,
      priceHalf: space.PriceHalf,
      priceQuarter: space.PriceQuarter,
    };
  }
  return {
    isLoading: state.space.isLoading,
    ui: state.ui,
    space: state.space,
    error: state.error,
    user: state.auth.user,
  };
};

export const init = props => {
  if (props.space && (props.space.space || {}).ID && props.match.params.space_id) {
    const spaceId = parseInt(props.match.params.space_id, 10);
    props.dispatch(
      uiActions.setUiState({
        spaceId,
        isEdit: true,
      }),
    );
    props.dispatch(spaceActions.fetchSpace({ spaceId, isSelfOnly: true }));
  }

  props.dispatch(
    uiActions.setUiState({
      buttonDisabled: true,
    }),
  );

  FormValidator.initialize(
    'space',
    props.dispatch,
    uiActions.setUiState,
    errorActions.setErrorState,
  );
};
