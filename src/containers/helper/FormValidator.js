// @flow

class FormValidator {
  dispatch: Function;
  setUiState: Function;
  setErrorState: Function;
  modelName: string;

  initialize = (
    modelName: string,
    dispatch: Function,
    setUiState: Function,
    setErrorState: Function,
  ) => {
    this.modelName = modelName;
    this.dispatch = dispatch;
    this.setUiState = setUiState;
    this.setErrorState = setErrorState;
  };

  changeUiState = (propName: string, value: any, currentUi: Object) => {
    const nextModel = Object.assign({}, currentUi[this.modelName]);
    nextModel[propName] = value;

    const nextUi = {};
    nextUi[this.modelName] = nextModel;
    this.dispatch(this.setUiState(nextUi));
  };

  changeErrorState = (propName: string, errors: Array<string>, currentError: Object) => {
    const nextErrors = Object.assign({}, currentError.errors);
    nextErrors[propName] = errors;
    this.dispatch(this.setErrorState({ errors: nextErrors }));
  };
}

export default new FormValidator();
