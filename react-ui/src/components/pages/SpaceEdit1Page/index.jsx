import React, { Component } from 'react';
import { connect } from 'react-redux';
import Path from 'config/path';
import { ErrorMessages } from 'variables';
import fileType from 'helpers/file-type';
import { iskeyDownEnter, iskeyDownSpace } from 'helpers/keydown';
import { isImageDefault } from 'helpers/images';
import { convertSpaceImgUrl } from 'helpers/imgix';
import { uploadImage } from 'redux/helpers/firebase';
import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';
import BaseTemplate from 'components/templates/BaseTemplate';
import { withAuthRequire, withHandleBeforeUnload } from 'components/hooks';
import SpaceEdit1 from 'components/LV3/SpaceEdit/Step1';
import ModalToProfileEdit from 'components/LV3/ModalToProfileEdit';
import { isTrimmedEmpty, isBelowTrimmedLimit } from 'helpers/validations/string';
import { isFloat } from 'helpers/validations/number';

const ZENKAKU_SPACE_LITERAL = '　';
const SPACE_LITERAL = ' ';
const Validate = {
  Title: {
    Max: 200,
  },
  ImageSize: {
    Max: 31457280, // 30MB
  },
  Tatami: {
    Max: 1000,
    Min: 1,
  },
  Introduction: {
    Max: 5000,
  },
  TagCustom: {
    MaxText: 8,
    MaxArrayCount: 8,
    IncludeSpaceLiteralRegExp: new RegExp(`(${SPACE_LITERAL}|${ZENKAKU_SPACE_LITERAL})`),
  },
};

const TagList = [
  {
    text: '4畳以上',
    isChecked: false,
    options: { code: 1 },
  },
  {
    text: 'エレベータあり',
    isChecked: false,
    options: { code: 2 },
  },
  {
    text: '1階',
    isChecked: false,
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
    isChecked: false,
    options: { code: 6 },
  },
  {
    text: '平日対応可',
    isChecked: false,
    options: { code: 7 },
  },
  {
    text: '長期歓迎',
    isChecked: false,
    options: { code: 8 },
  },
];

const checkSizeType = sizeType => {
  return sizeType > 0 && sizeType < 4;
};

class SpaceEdit1Page extends Component {
  constructor(props) {
    super(props);
    const {
      images,
      status,
      title,
      introduction,
      sizeType,
      tatami,
      tags,
      tagList,
      tagCustomList,
    } = props.space;
    this.state = {
      images: images || [],
      status: status || 'open',
      title: title || '',
      introduction: introduction || '',
      sizeType: sizeType || 0,
      isSizeTypeOther: false,
      tatami: tatami || '',
      tags: tags || [],
      tagList: tagList || TagList,
      tagCustom: '',
      tagCustomList: tagCustomList || [],
      error: {},
      errorsTagCustomMax: [],
      isImageUploading: false,
      isOpenModalError: false,
      isUpdate: !!props.match.params.space_id,
    };
  }

  componentDidMount() {
    const { space, dispatch, match } = this.props;
    const { isUpdate, images, title, introduction, sizeType } = this.state;
    const spaceId = match.params.space_id;

    dispatch(spaceActions.clearSpace());

    if (isUpdate && (!space.id || parseInt(spaceId, 10) !== space.id)) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
      if (space.images && space.images.length === 1 && isImageDefault(space.images[0].imageUrl)) {
        this.setState({ images: [] });
      }
    }
    if (!isUpdate) {
      this.handleChangeUI('images', images);
      this.handleChangeUI('title', title);
      this.handleChangeUI('introduction', introduction);
      this.handleChangeUI('sizeType', sizeType);
    }

    if (!isUpdate && !this.props.space.postalCode) {
      dispatch(spaceActions.resetAddress());
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { user, space } = nextProps;

    if (!user.email || !user.phoneNumber) {
      return { isOpenModalError: true };
    }

    if ((space.id && !prevState.id) || space.id !== prevState.id) {
      const {
        title,
        status,
        introduction,
        sizeType,
        tatami,
        tags,
        tagList,
        tagCustomList,
        images,
        id,
      } = space;

      let newStateTagCustomList = tagCustomList;
      if (newStateTagCustomList === undefined) {
        const otherTags = tags.filter(v => v.isOfficial === false);
        newStateTagCustomList = otherTags.map(v => v.name);
      }

      let newStateTagList = tagList;
      if (newStateTagList === undefined) {
        const officialTags = tags.filter(v => v.isOfficial === true);
        newStateTagList = TagList.map(v => {
          const isChecked = officialTags.filter(t => v.text === t.name).length > 0;
          return { ...v, isChecked };
        });
      }

      return {
        title,
        status,
        introduction,
        sizeType,
        tatami,
        tagList: newStateTagList,
        tagCustomList: newStateTagCustomList,
        images,
        id,
        isSizeTypeOther: !checkSizeType(sizeType),
      };
    }
    return null;
  }

  handleChangeImage = async pickedImages => {
    this.setState({ isImageUploading: true });

    const { images: ImagesTmp } = this.state;
    const images = ImagesTmp || [];

    const nextImages = await Promise.all(
      pickedImages.map(async image => {
        if (image && image.size > Validate.ImageSize.Max) {
          return null;
        }

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
        const tmpUrl = convertSpaceImgUrl(
          await uploadImage(imagePath, image),
          'w=1200&h=800&fit=crop',
        );
        return { ...image, tmpUrl };
      }),
    ).catch(error => ({ error }));

    if (nextImages && nextImages.length > 0 && nextImages[0] !== null) {
      const setImage = [].concat(images, nextImages);
      this.setState({ images: setImage });
      this.handleChangeUI('imagesMaxSize', false);
    } else {
      this.handleChangeUI('imagesMaxSize', true);
    }

    this.setState({ isImageUploading: false });
  };

  handleDeleteImage = deleteTargetIndex => {
    const { images } = this.state;
    const nextImages = Object.assign([], images);
    nextImages.splice(deleteTargetIndex, 1);
    this.setState({ images: nextImages });
    this.handleChangeUI('images', nextImages);
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
      sizeType,
      tatami,
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
          status,
          introduction,
          sizeType: parseInt(sizeType, 10) || 0,
          tatami: checkSizeType(sizeType) ? parseFloat(tatami) : 0,
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
        this.setState({ tagCustom: '', errorsTagCustomMax: [] });
      }
    }
  };

  onKeyDownButtonNext = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.onClickNext();
    }
  };

  handleChangeUI = (propName, value) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'title':
        if (isTrimmedEmpty(value)) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (value.length > Validate.Title.Max) {
          errors.push(ErrorMessages.LengthMax('タイトル', Validate.Title.Max));
        }
        break;
      case 'introduction':
        if (isTrimmedEmpty(value)) {
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
      case 'imagesMaxSize':
        if (value) {
          errors.push(ErrorMessages.OverSizeSpaceImage('30MB'));
        }
        break;
      case 'sizeType':
        if (!value || value === 0) {
          errors.push(ErrorMessages.PleaseSelect);
        } else if (checkSizeType(value)) {
          state.isSizeTypeOther = false;
        } else {
          state.tatami = '';
          state.isSizeTypeOther = true;
        }
        break;
      case 'tatami':
        if (!isTrimmedEmpty(Number.toString(value))) {
          if (!isFloat(value)) {
            errors.push(ErrorMessages.PriceFloat('畳数'));
          } else {
            if (value < Validate.Tatami.Min) {
              errors.push(ErrorMessages.TatamiMin(Validate.Tatami.Min));
            }
            if (value > Validate.Tatami.Max) {
              errors.push(ErrorMessages.TatamiMax(Validate.Tatami.Max));
            }
          }
        }
        break;
      case 'tagCustom':
        if (value && value.length > Validate.TagCustom.MaxText) {
          errors.push(ErrorMessages.LengthMax('設備・条件', Validate.TagCustom.MaxText));
        } else if (Validate.TagCustom.IncludeSpaceLiteralRegExp.test(value)) {
          errors.push(ErrorMessages.TagCustomIncludesSpaceLiteral);
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
    const { title, introduction, images, sizeType, tatami } = this.state;

    return (
      !isTrimmedEmpty(title) &&
      isBelowTrimmedLimit(title, Validate.Title.Max) &&
      !isTrimmedEmpty(introduction) &&
      isBelowTrimmedLimit(introduction, Validate.Introduction.Max) &&
      images &&
      images.length > 0 &&
      (isImageDefault(images[0].ImageUrl) ? images.length > 1 : true) &&
      sizeType &&
      sizeType > 0 &&
      (!tatami ||
        (tatami &&
          isFloat(tatami) &&
          tatami >= Validate.Tatami.Min &&
          tatami <= Validate.Tatami.Max))
    );
  };

  validateTagCustom = () => {
    const { tagCustom } = this.state;

    return (
      !isTrimmedEmpty(tagCustom) &&
      isBelowTrimmedLimit(tagCustom, Validate.TagCustom.MaxText) &&
      !Validate.TagCustom.IncludeSpaceLiteralRegExp.test(tagCustom)
    );
  };

  getModalText = () => {
    return (
      <p>
        スペースを登録するにはプロフィールの登録が必要です。
        <br />
        <br />
        プロフィールをご登録いただくことで、取引時に荷物保管に関する保険が適用されます。
        <br />
        また、プロフィールの内容を充実させることで借り手に安心感を与えることができるため、成約率UPにも繋がります。
        <br />
      </p>
    );
  };

  render() {
    const {
      images,
      title,
      status,
      introduction,
      sizeType,
      isSizeTypeOther,
      tatami,
      error,
      errorsTagCustomMax,
      isImageUploading,
      isOpenModalError,
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
      <BaseTemplate maxWidth={540}>
        <SpaceEdit1
          edit={isUpdate}
          errors={error}
          errorsTagCustomMax={errorsTagCustomMax}
          status={status}
          onChangeStatus={v => this.handleChangeUI('status', v)}
          title={title}
          onChangeTitle={v => this.handleChangeUI('title', v)}
          images={ImagesRender.map(image => ({
            url: image.imageUrl || image.tmpUrl,
          }))}
          onChangeImage={this.handleChangeImage}
          onClickDeleteImage={this.handleDeleteImage}
          isImageUploading={isImageUploading}
          introduction={introduction}
          onChangeIntroduction={v => this.handleChangeUI('introduction', v)}
          breadth={sizeType}
          onChangeBreadth={v => this.handleChangeUI('sizeType', v)}
          isSizeTypeOther={isSizeTypeOther}
          tatami={tatami || ''}
          onChangeTatami={v => this.handleChangeUI('tatami', v)}
          onClickNext={this.onClickNext}
          onKeyDownButtonNext={this.onKeyDownButtonNext}
          buttonNextDisabled={isOpenModalError || !this.validate()}
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
        {isOpenModalError && (
          <ModalToProfileEdit header="プロフィールをご登録ください" content={this.getModalText()} />
        )}
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => ({
  space: state.ui.space || {},
  user: state.auth.user,
});

export default withAuthRequire(withHandleBeforeUnload(connect(mapStateToProps)(SpaceEdit1Page)));
