import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import SearchIcon from 'material-ui-icons/Search';

import styled from 'styled-components';
import { FontSizes, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import { uiActions } from 'redux/modules/ui';
import { Footer } from 'components/Shared';

import mainVisual from 'images/main_visual.jpg';
import topImage1 from 'images/top1.png';
import topImage2 from 'images/top2.png';

const TopPage = styled.div`
  margin-top: -20px;
  background: ${Colors.lightGray};
`;

const TopView = styled.div`
  height: 800px;
  margin-top: -64px;
  background-image: url(${mainVisual});
  background-size: cover;
  color: rgb(255, 255, 255);
`;

const TopViewFilter = styled.div`
  height: 100%;
  padding: 196px 116px 0 116px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.4);
  ${media.phone`
    padding: 196px 10px 0 10px;
  `};
`;

const Monooq = styled.span`
  display: inline-block;
  font-size: 20px;
  margin-bottom: 8px;
`;

const CatchPhrase = styled.div`
  font-size: ${FontSizes.xxlarge}px;
  font-weight: bold;
  line-height: 56px;
  text-align: left;
  width: 570px;
  height: 114px;
  margin-bottom: 10px;
  ${media.phone`
    font-size: 28px;
    line-height: 48px;
    width: 100%;
    height: inherit;
  `};
`;

const SubCatchPhrase = styled.span`
  display: block;
  font-size: 26px;
  width: 561px;
  font-weight: 100;
  line-height: 40px;
  ${media.phone`
    font-size: 24px;
    line-height: 30px;
    width: 100%;
  `};
`;

const SearchWrapper = styled.div`
  width: 507px;
  position: relative;
  margin-top: 20px;
  margin-bottom: 40px;
  ${media.phone`
    width: calc(100vw - 20px);
  `};
`;

const SearchInput = styled.input`
  margin: 0;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 20px 60px 20px 20px;
  display: inline-block;
  vertical-align: middle;
  background: #fff;
  height: 60px;
  width: 507px;
  line-height: 20px;
  box-sizing: border-box;
  font-size: ${FontSizes.small}px;
  ${media.phone`
    width: calc(100vw - 20px);
  `};
`;

const SearchButton = styled(Button)`
  &&& {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    box-shadow: none;
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  && {
    height: 32px;
    width: 32px;
    color: ${Colors.buttonPink};
  }
`;

const ToHostRegistContainer = styled.div`
  width: 507px;
  display: flex;
  justify-content: center;
  ${media.phone`
    text-align: center;
    width: 100%;
  `};
`;

const ToHostRegist = styled.a`
  font-size: 18px;
  line-height: 42px;
  color: ${Colors.white};
  text-decoration: underline;
  ${media.phone`
    margin: 0;
  `};
`;

const TopHr = styled.hr`
  margin: 0;
  height: 60px;
  border: 0;
  background: #e85258;
`;

const DefaultView = styled.div`
  padding: 80px 116px;
  ${media.phone`
    padding: 80px 10px;
  `};
  color: rgb(51, 51, 51);
  box-sizing: border-box;
  ${props =>
    props.isReasonUser
      ? `
        background: #fff;
        background-image: url(${topImage1});
        background-repeat: no-repeat;
        background-position: right;
        background-position-y: 388px;
        background-size: 714px 490px;
    `
      : ''};
  ${media.phone`
    ${props =>
      props.isReasonUser
        ? `
          background: #fff;
          background-image: inherit;
      `
        : ''};
  `};
  ${props =>
    props.isReasonHost
      ? `
        background-image: url(${topImage2});
        background-repeat: no-repeat;
        background-position: left;
        padding: 80px 116px 80px 656px;
        background-size: 500px 947px;
    `
      : ''};
  ${props =>
    props.isForSafe
      ? `
        background: #fff;
    `
      : ''};
  ${props =>
    props.isPickGo
      ? `
        background: #E85258;
        color: #fff;
        display: flex;
    `
      : ''};
  ${media.phone`
    ${props =>
      props.isPickGo
        ? `
          display: block;
      `
        : ''};
  `};
`;

const HilightCopy = styled.span`
  display: block;
  font-size: ${FontSizes.small}px;
  line-height: 21px;
  margin-bottom: 9px;
  color: rgb(232, 82, 88);
`;

const DefaultTitle = styled.span`
  display: inline-block;
  font-size: ${FontSizes.xxlarge}px;
  line-height: 51px;
  margin-bottom: 80px;
  ${media.phone`
    font-size: 28px;
    margin-bottom: 40px;
  `};
`;

const ExplainTitle = styled.span`
  display: block;
  font-size: 22px;
`;

const ExplainDescription = styled.span`
  display: block;
  font-size: ${FontSizes.medium}px;
  line-height: 32px;
  font-weight: 100;
`;

const ExplainSection = ({ title, description }) => {
  const style = {
    root: {
      width: '417px',
      marginBottom: '40px',
    },
    title: {
      marginBottom: '10px',
    },
  };

  return (
    <div className="explain-section" style={style.root}>
      <ExplainTitle style={style.title}>{title}</ExplainTitle>
      <ExplainDescription>{description}</ExplainDescription>
    </div>
  );
};

const ToHostRegistButton = styled.button`
  display: inline-block;
  background: ${Colors.buttonPink};
  font-size: ${FontSizes.medium}px;
  color: ${Colors.white};
  border-radius: 3px;
  width: 264px;
  height: 50px;
  box-sizing: border-box;
  &:hover {
    background: ${Colors.buttonPinkHover};
  }
  cursor: pointer;
  border: none;
  outline: none;

  ${media.phone`
    display: table-cell;
    padding: 9px 20px;
    vertical-align: middle;
  `};
`;

const ForSafeSectionButton = styled.button`
  display: inline-block;
  color: ${Colors.buttonPink};
  font-size: ${FontSizes.medium}px;
  background: ${Colors.white};
  border-radius: 3px;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  &:hover {
    background: ${Colors.buttonPinkHover};
    color: ${Colors.white};
  }
  cursor: pointer;
  border: 1px solid;
  outline: none;

  ${media.phone`
    display: table-cell;
    padding: 9px 20px;
    vertical-align: middle;
  `};
`;

const ForSafeSection = ({ iconClass, title, description, buttonText }) => {
  const StyledContainer = styled.div`
    width: 327px;
    font-weight: 100;
    ${media.phone`
      margin-bottom: 30px;
    `};
  `;
  const style = {
    title: {
      height: '60px',
      lineHeight: '60px',
      fontSize: '22px',
      marginBottom: '20px',
    },
    titleIcon: {
      marginRight: '20px',
      fontSize: '60px',
    },
    description: {
      fontSize: '16px',
      lineHeight: '32px',
      marginBottom: '30px',
    },
  };
  return (
    <StyledContainer>
      <div style={style.title}>
        <span className="fa-layers fa-fw fa-2x" style={style.titleIcon}>
          <i className="fas fa-circle" style={{ color: '#E85258' }} />
          <i className={iconClass} style={{ color: '#fff' }} data-fa-transform="shrink-6" />
        </span>
        <span>{title}</span>
      </div>
      <div style={style.description}>{description}</div>
      <ForSafeSectionButton>{buttonText}</ForSafeSectionButton>
    </StyledContainer>
  );
};

const ForSafeSectionList = () => {
  const StyledContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    ${media.phone`
      justify-content: center;
    `};
  `;

  return (
    <StyledContainer className="for-safe-section-list">
      <ForSafeSection
        iconClass="far fa-heart"
        title="はじめての方へ"
        description="モノオクは物置きの場所を探して、ホストにメッセージで荷物を預かってもらえるか交渉をします。サービスの使い方がよくわからない、お困りの方はこちら。"
        buttonText="使い方について"
      />
      <ForSafeSection
        iconClass="far fa-bookmark"
        title="荷物に対する保険"
        description="モノオクで取引された荷物には最大10万円までの補償があります。もし預かった荷物を破損・紛失してしまった場合も最大100000円までの補償が受けられるので安心です。"
        buttonText="保険について"
      />
      <ForSafeSection
        iconClass="far fa-handshake"
        title="ルールとマナー"
        description="モノオクは個人間の物置きシェアサービスです。トラブルや揉め事がないようにルールを設けています。みんなが安心して使えるようにマナーを大切にしましょう。"
        buttonText="ルールとマナーについて"
      />
    </StyledContainer>
  );
};

const LinkToPickGo = styled.a`
  font-size: 18px;
  color: rgb(255, 255, 255);
  line-height: 42px;
  text-decoration: underline;
`;

const PickGoSection = styled.div`
  width: 294px;
  color: #333333;
  text-align: center;
  margin-left: 181px;
  margin-top: 87px;
  ${media.phone`
    margin: 30px auto;
  `};
`;

const PickGoMedia = styled.img`
  margin: 0 15.5px;
  margin-bottom: 20px;
`;

const PickGoDescription = styled.div`
  font-size: ${FontSizes.small}px;
  line-height: 27px;
`;

const LineUpNewsMedia = () => {
  const style = {
    title: {
      fontFamily: 'sans-serif',
      fontSize: '22px',
      marginBottom: '40px',
    },
    list: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  };
  return (
    <div style={style.root}>
      <div style={style.title}>メディア掲載</div>
      <div style={style.list}>
        <img src="http://placehold.jp/114x26.png" />
        <img src="http://placehold.jp/114x26.png" />
        <img src="http://placehold.jp/114x26.png" />
        <img src="http://placehold.jp/114x26.png" />
        <img src="http://placehold.jp/114x26.png" />
        <img src="http://placehold.jp/114x26.png" />
      </div>
    </div>
  );
};

class Top extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(
      uiActions.setUiState({
        locationText: '',
        searchButtonDisabled: false,
      }),
    );
  }

  handleChange = event => {
    if (event.target.value === '') {
      this.props.dispatch(
        uiActions.setUiState({
          searchButtonDisabled: false,
          locationText: '',
        }),
      );
    } else {
      this.props.dispatch(
        uiActions.setUiState({
          searchButtonDisabled: true,
          locationText: event.target.value,
        }),
      );
    }
  };

  render() {
    const { classes, ui } = this.props;
    return (
      <TopPage>
        <TopView>
          <TopViewFilter className={classes.contents}>
            <Monooq>monooQ</Monooq>
            <CatchPhrase>
              個人間だからできる、<br />荷物を預けるための新しい方法。
            </CatchPhrase>
            <SubCatchPhrase>
              モノオクは余った個人のスペースを活用して、荷物を預けることができるサービスです。
            </SubCatchPhrase>
            <SearchWrapper>
              <SearchInput
                id="location"
                placeholder="近くの場所を検索してみよう！　例）東京都港区?"
                value={ui.locationText}
                onChange={this.handleChange}
                margin="normal"
              />
              <SearchButton
                className={classes.button}
                fab
                color="primary"
                mini
                component={Link}
                to={`/search/${ui.locationText}`}
                disabled={!ui.searchButtonDisabled}
              >
                <StyledSearchIcon />
              </SearchButton>
            </SearchWrapper>
            <ToHostRegistContainer>
              <ToHostRegist component={Link} href={'/edit/profile/1'}>
                ホスト登録はこちら
              </ToHostRegist>
            </ToHostRegistContainer>
          </TopViewFilter>
        </TopView>
        <TopHr />
        <DefaultView isReasonUser>
          <HilightCopy>小さいモノから大きなモノまで。</HilightCopy>
          <DefaultTitle>モノオクで荷物を預ける理由</DefaultTitle>
          <ExplainSection
            title="安心の料金"
            description="ホストから提示される金額のみをお支払い。余計な費用なしに荷物を預けることができます。※配送料金は別途"
          />
          <ExplainSection
            title="面倒な手続きが不要"
            description="面倒くさい申込書の記入や内覧の必要はありません。必要なのはメッセージや荷物写真のやりとりだけです。"
          />
          <ExplainSection
            title="拠点数が多い"
            description="モノオクだからできる日本全国に広がる拠点数。あなたのお部屋や引越し先のご近所でも見つかるはず。"
          />
          <ExplainSection
            title="1ヶ月だけでもOK"
            description="3ヶ月や半年などの契約期間の縛りはありません。ホストと相談して必要な期間だけ預けることができます。"
          />
          <ExplainSection
            title="交渉が可能"
            description="もう少し延長できませんか？荷物の搬入を手伝ってくれませんか？など、ホストと気軽に交渉することが可能です。"
          />
        </DefaultView>
        <DefaultView isReasonHost>
          <HilightCopy>余っているスペースはありませんか？</HilightCopy>
          <DefaultTitle>モノオクでホストをする理由</DefaultTitle>
          <ExplainSection
            title="新しい副収入につなげる"
            description="余っているスペースとスキマ時間で、新しいおこづかいが生まれます。"
          />
          <ExplainSection
            title="余ったスペースが活用できる"
            description="使っていないクローゼットや押入れ・空き部屋はありませんか？モノオクならどんな場所でも活用できます。"
          />
          <ExplainSection
            title="かんたんに誰でもできる"
            description="荷物をたいせつに預かって、最後は持ち主まで返す。これだけで喜んでくれる人がいます。"
          />
          <ExplainSection
            title="誰かの役にたつ"
            description="引っ越しやリフォーム、片付けなど荷物を預けられる場所を探すのは意外と大変なんです。困っている誰かの力になってくれませんか？"
          />
          <ToHostRegistButton>ホスト登録はこちら</ToHostRegistButton>
        </DefaultView>
        <DefaultView isForSafe>
          <HilightCopy>みんなでもっと便利に物置きシェアができる世の中へ。</HilightCopy>
          <DefaultTitle>安心して物置きのシェアをするために</DefaultTitle>
          <ForSafeSectionList />
        </DefaultView>
        <DefaultView isPickGo>
          <div>
            <CatchPhrase>
              荷物の配送だって<br />もっと便利に安くできる。
            </CatchPhrase>
            <SubCatchPhrase>
              Pickgoを使えば、引っ越しが5000円から。<br />モノオクから簡単に配送依頼ができます。
            </SubCatchPhrase>
            <LinkToPickGo component={Link} href={'#'}>
              Pickgoのサイトを見る
            </LinkToPickGo>
          </div>
          <PickGoSection>
            <PickGoMedia src="http://placehold.jp/163x42.png" />
            <PickGoDescription>
              サービス対象エリア<br />東京／神奈川／千葉／埼玉／大阪／兵庫／京都
            </PickGoDescription>
          </PickGoSection>
        </DefaultView>
        <DefaultView>
          <LineUpNewsMedia />
        </DefaultView>
        <Footer />
      </TopPage>
    );
  }
}

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(withStyles(styles)(Top));
