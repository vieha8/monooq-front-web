import React, { Component, Fragment } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import Path from 'config/path';

import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';

import ContentPageMenu from 'components/hocs/ContentPageMenu';
import SpaceEdit1 from 'components/LV3/SpaceEdit/Step1';

import { ErrorMessages, FormValues } from 'variables';

import { uploadImage } from 'redux/helpers/firebase';
import { iskeyDownEnter, iskeyDownSpace } from 'helpers/keydown';
import { isImageDefault } from 'helpers/images';
import fileType from 'helpers/file-type';
import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';

const Validate = {
  Title: {
    Max: 200,
  },
  Introduction: {
    Max: 5000,
  },
  TagCustom: {
    MaxText: 8,
    MaxArrayCount: 8,
  },
};

const TagList = [
  {
    text: '4畳以上',
    isChecked: true,
    options: { code: 1 },
  },
  {
    text: 'エレベータあり',
    isChecked: true,
    options: { code: 2 },
  },
  {
    text: '1階',
    isChecked: true,
    options: { code: 3 },
  },
  {
    text: '駐車スペースあり',
    isChecked: false,
    options: { code: 4 },
  },
  {
    text: '換気可',
    isChecked: false,
    options: { code: 5 },
  },
  {
    text: '出し入れ可',
    isChecked: true,
    options: { code: 6 },
  },
  {
    text: '平日対応可',
    isChecked: true,
    options: { code: 7 },
  },
  {
    text: '長期歓迎',
    isChecked: true,
    options: { code: 8 },
  },
];

const TagCustomList = ['4畳以上', '1階', 'ダンボール1箱〜', '1階', '常時換気'];

class SpaceEdit1Container extends Component {
  constructor(props) {
    super(props);

    const { dispatch, space } = this.props;

    const spaceId = props.match.params.space_id;
    this.state = {
      images: space.images || [],
      status: space.status || `${FormValues.statusVacancy}`,
      title: space.title || '',
      introduction: space.introduction || '',
      breadth: space.breadth || 0,
      error: {},
      errorsTagCustomMax: [],
      isImageUploading: false,
      errorModal: false,
      isNoProfile: false,
      isUpdate: false,
      tagList: TagList, // TODO: 【API連携】タグ
      tagCustom: '',
      tagCustomList: TagCustomList, // TODO: 【API連携】タグ
    };

    if (spaceId) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
      this.state.isUpdate = true;

      if (space.images && space.images.length === 1 && isImageDefault(space.images[0].imageUrl)) {
        this.state.images = [];
      }
    } else {
      dispatch(spaceActions.clearSpace());
    }
  }

  handleBeforeUnload = e => {
    e.preventDefault();
    e.returnValue = 'データが保存されませんが、よろしいですか?';
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);

    const { user } = this.props;
    const { isUpdate, breadth } = this.state;

    if (user.name === '') {
      this.setState({ errorModal: true, isNoProfile: true });
    } else if (!isUpdate) {
      const { title, introduction, images } = this.state;
      this.handleChangeUI('title', title);
      this.handleChangeUI('introduction', introduction);
      this.handleChangeUI('images', images);
    }
    this.handleChangeUI('breadth', breadth);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { space } = nextProps;
    if (space.id && !prevState.id) {
      const { title, status, introduction, breadth, tagCustom, images, id } = space;
      return { title, status, introduction, breadth, tagCustom, images, id };
    }
    return null;
  }

  handleChangeImage = async pickedImages => {
    this.setState({ isImageUploading: true });

    const { images: ImagesTmp } = this.state;
    const images = ImagesTmp || [];

    const nextImages = await Promise.all(
      pickedImages.map(async image => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(image);
        const ext = await new Promise(resolve => {
          fileReader.onload = () => {
            const imageType = fileType(fileReader.result);
            resolve(imageType.ext);
          };
        });
        const timeStamp = Date.now();
        const rand = Math.random()
          .toString(32)
          .substring(2);
        const imagePath = `/img/spaces/tmp/${rand}${timeStamp}.${ext}`;
        image.tmpUrl = await uploadImage(imagePath, image);
        return image;
      }),
    ).catch(error => ({ error }));

    const setImage = [].concat(images, nextImages);
    this.setState({ images: setImage, isImageUploading: false });
    this.handleChangeUI('images', setImage);
  };

  handleDeleteImage = deleteTargetIndex => {
    const { images } = this.state;
    const nextImages = Object.assign([], images);
    nextImages.splice(deleteTargetIndex, 1);
    this.setState({ images: nextImages });
    this.handleChangeUI('images', nextImages);
  };

  onClickProfileEdit = () => {
    const { history, dispatch, location } = this.props;
    dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
    history.push(Path.profileEdit());
  };

  onClickTag = (_, { code, checked }) => {
    const { tagList } = this.state;
    const res = tagList.map(tag => {
      if (tag.options.code !== code) {
        return tag;
      }
      return { ...tag, isChecked: checked };
    });
    this.setState({ tagList: res });
  };

  onClickTagCustomDelete = e => {
    const { tagCustomList } = this.state;
    const newArray = tagCustomList.filter(n => n !== e.target.innerHTML.replace('#', ''));
    this.setState({ tagCustomList: newArray });
  };

  onClickNext = () => {
    const { state } = this;
    const { dispatch, history, space } = this.props;
    const {
      images,
      title,
      status,
      introduction,
      breadth,
      tagList,
      tagCustomList,
      isUpdate,
    } = state;

    if (isUpdate) {
      if (images && images.length > 0 && isImageDefault(images[0].ImageUrl)) {
        // デフォルト画像が先頭に含まれる場合は削除する
        images.shift();
      }
    }

    dispatch(
      uiActions.setUiState({
        space: Object.assign(space, {
          images,
          title,
          status: parseInt(status, 10) || FormValues.statusVacancy,
          introduction,
          breadth: parseInt(breadth, 10) || 0,
          tagList,
          tagCustomList,
        }),
      }),
    );

    const nextPath = isUpdate ? Path.spaceEdit2(space.id) : Path.spaceCreate2();
    history.push(nextPath);
  };

  onKeyDownTag = e => {
    if (iskeyDownSpace(e)) {
      const { isTag } = this.state;
      this.handleChangeUI('isTag', !isTag);
    }
  };

  onKeyDownTagCustom = e => {
    if (iskeyDownEnter(e) && this.validateTagCustom()) {
      const { tagCustomList, errorsTagCustomMax } = this.state;
      let textError = '';

      if (tagCustomList && tagCustomList.length >= Validate.TagCustom.MaxArrayCount) {
        textError = ErrorMessages.TagCustomMax;
      } else if (tagCustomList.filter(n => n === e.target.value).length > 0) {
        textError = ErrorMessages.TagCustomSame;
      } else {
        const inputVal = e.target.value;
        this.setState(state => {
          return state.tagCustomList.push(inputVal);
        });
      }

      if (textError) {
        if (errorsTagCustomMax.length === 0) {
          this.setState(state => {
            return state.errorsTagCustomMax.push(textError);
          });
        }
      } else {
        this.setState({ errorsTagCustomMax: [] });
      }
    }
  };

  onKeyDownButtonNext = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.onClickNext();
    }
  };

  close = () => this.setState({ errorModal: false });

  handleChangeUI = (propName, value) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'title':
        if (!value || value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (value.length > Validate.Title.Max) {
          errors.push(ErrorMessages.LengthMax('タイトル', Validate.Title.Max));
        }
        break;
      case 'introduction':
        if (!value || value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (value.length > Validate.Introduction.Max) {
          errors.push(ErrorMessages.LengthMax('紹介文', Validate.Introduction.Max));
        }
        break;
      case 'images':
        if (!value || value.length === 0) {
          errors.push(ErrorMessages.MustSpaceImage);
        } else if (value.length === 1) {
          if (value[0].ImageUrl && isImageDefault(value[0].ImageUrl)) {
            errors.push(ErrorMessages.MustSpaceImage);
          }
        }
        break;
      case 'breadth':
        if (!value || value === 0) {
          errors.push(ErrorMessages.PleaseSelect);
        }
        break;
      case 'tagCustom':
        if (value && value.length > Validate.TagCustom.MaxText) {
          errors.push(ErrorMessages.LengthMax('条件タグ', Validate.TagCustom.MaxText));
        }
        break;
      default:
        break;
    }

    state[propName] = value;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  validate = () => {
    const { title, introduction, images, breadth } = this.state;

    return (
      title &&
      (title === undefined ? false : title.trim().length > 0) &&
      title.trim().length <= Validate.Title.Max &&
      introduction &&
      (introduction === undefined ? false : introduction.trim().length > 0) &&
      introduction.trim().length <= Validate.Introduction.Max &&
      images &&
      images.length > 0 &&
      (isImageDefault(images[0].ImageUrl) ? images.length > 1 : true) &&
      breadth &&
      breadth > 0
    );
  };

  validateTagCustom = () => {
    const { tagCustom } = this.state;

    return (
      tagCustom &&
      (tagCustom === undefined ? false : tagCustom.trim().length > 0) &&
      tagCustom.trim().length <= Validate.TagCustom.MaxText
    );
  };

  render() {
    const {
      images,
      title,
      status,
      introduction,
      breadth,
      error,
      errorsTagCustomMax,
      isImageUploading,
      errorModal,
      isNoProfile,
      isUpdate,
      tagList,
      tagCustom,
      tagCustomList,
    } = this.state;

    let ImagesRender = images;
    if (isUpdate) {
      if (images && images.length === 1 && isImageDefault(images[0].ImageUrl)) {
        ImagesRender = [];
      }
    }

    return (
      <Fragment>
        <SpaceEdit1
          edit={isUpdate}
          errors={error}
          errorsTagCustomMax={errorsTagCustomMax}
          status={status}
          onChangeStatus={v => this.handleChangeUI('status', v)}
          title={title}
          onChangeTitle={v => this.handleChangeUI('title', v)}
          images={ImagesRender.map(image => ({
            url: image.imageUrl || image.preview,
          }))}
          onChangeImage={this.handleChangeImage}
          onClickDeleteImage={this.handleDeleteImage}
          isImageUploading={isImageUploading}
          introduction={introduction}
          onChangeIntroduction={v => this.handleChangeUI('introduction', v)}
          breadth={breadth}
          onChangeBreadth={v => this.handleChangeUI('breadth', v)}
          onClickNext={this.onClickNext}
          onKeyDownButtonNext={this.onKeyDownButtonNext}
          buttonNextDisabled={isNoProfile || !this.validate()}
          tagList={tagList}
          onClickTag={this.onClickTag}
          onKeyDownTag={this.onKeyDownTag}
          tagCustom={tagCustom}
          onChangeTagCustom={v => this.handleChangeUI('tagCustom', v)}
          onKeyDownTagCustom={this.onKeyDownTagCustom}
          onClickInputTagcuttom
          tagCustomList={tagCustomList}
          onClickTagCustomDelete={this.onClickTagCustomDelete}
        />
        <Modal size="large" open={errorModal} onClose={this.close}>
          <Modal.Header>プロフィールをご登録ください</Modal.Header>
          <Modal.Content>
            <p>
              スペースを登録するにはプロフィールの登録が必要です。
              <br />
              <br />
              プロフィールをご登録いただくことで、取引時に荷物保管に関する保険が適用されます。
              <br />
              また、プロフィールの内容を充実させることで借り手に安心感を与えることができるため、成約率UPにも繋がります。
              <br />
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button className="brandPrimary" onClick={this.onClickProfileEdit}>
              登録画面へ進む
            </Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  space: state.ui.space || {},
  user: state.auth.user,
});

export default authRequired(
  ContentPageMenu(connect(mapStateToProps)(SpaceEdit1Container), {
    noFooter: true,
    maxWidth: 540,
  }),
);
