import React from 'react';
import { Link } from 'react-router-dom';
import Path from 'config/path';
import Header from 'components/atomic/containers/Header';
import { Height as HeaderHeight } from 'components/atomic/LV3/Header';
import styled, { css } from 'styled-components';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import DefaultContainer from 'components/atomic/containers/DefaultContainer';
import Footer from 'components/atomic/LV2/Footer';
import Logo from 'components/atomic/LV1/Logo';
import Button from 'components/atomic/LV1/Button';
import SearchInput from 'components/atomic/LV2/SearchInput';
import PickupSpaceList from 'components/atomic/LV3/PickupSpaceList';
import mainVisual from 'images/main_visual@2x.jpg';
import mainVisualSp from 'images/main_visual_sp@2x.jpg';
import topImage1 from 'images/top1@2x.png';
import topImage1Sp from 'images/top1_sp@2x.png';
import topImage2 from 'images/top2@2x.png';
import logoPickGo from 'images/logo-pickgo@2x.png';
import logoAppliv from 'images/logo-appliv@2x.png';
import logoAscii from 'images/logo-ascii@2x.png';
import logoBridge from 'images/logo-bridge@2x.png';
import logoCnet from 'images/logo-cnet@2x.png';
import logoLifehacker from 'images/logo-lifehacker@2x.png';
import logoTechcrunch from 'images/logo-techcrunch@2x.png';
import logoTechable from 'images/logo-techable@2x.png';
import logoGojo from 'images/logo-gojo@2x.png';
import { PickupFeatureSpaceList, PickupStaffSpaceList } from './pickup';

const TopPage = styled.div`
  min-width: ${Dimens.fixedWidthPc + 32}px;
  margin-top: -20px;
  background: ${Colors.lightGray2Bg};
  ${media.phone`
    min-width: auto;
  `};
`;

const TopView = styled.div`
  height: 540px;
  margin-top: ${HeaderHeight}px;
  background-image: url(${mainVisual});
  background-size: cover;
  color: ${Colors.white};
  background-repeat: no-repeat;
  ${media.phone`
    height: 400px;
    margin-top: -4px;
    background-image: url(${mainVisualSp});
    background-position: 0px 80px;
  `};
`;

const TopViewFilter = styled.div`
  height: 100%;
  padding-top: 120px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.4);
`;

const TopViewContainer = styled(DefaultContainer)``;

const CatchPhrase = styled.div`
  font-size: ${FontSizes.xxlarge}px;
  line-height: ${FontSizes.xxlarge * 1.5}px;
  font-weight: bold;
  text-align: left;
  width: 570px;
  height: 114px;
  margin-bottom: 10px;
  ${media.phone`
    font-size: ${FontSizes.medium1}px;
    line-height: ${FontSizes.medium1 * 1.75}px;
    width: 100%;
    height: auto;
  `};
`;

const SubCatchPhrase = styled.span`
  display: block;
  font-size: ${FontSizes.medium3}px;
  line-height: ${FontSizes.medium3 * 1.5}px;
  width: 480px;
  ${media.phone`
    font-size: ${FontSizes.medium}px;
    line-height: ${FontSizes.medium * 1.75}px;
    width: 100%;
  `};
`;

const ColoredContainer = styled.div`
  background-color: ${Colors.brandPrimary};
`;

const ColoredContainerGray = styled.div`
  background-color: ${Colors.lightGray1Bg};
`;

const MovieContainer = styled(DefaultContainer)`
  padding-top: 70px;
  padding-bottom: 70px;
  display: flex;
  ${media.phone`
    flex-direction: column;
  `};
`;

const MovieFrameWrapper = styled.div`
  ${media.phone`
    position: relative;
    width: 100%;
    padding-top: 56.25%;
  `};
`;

const MovieFrame = styled.iframe`
  height: 281px;
  width: 500px;
  border-radius: 4px;
  ${media.phone`
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  `};
`;

const MovieExplanContainer = styled.div`
  margin-left: 40px;
  color: ${Colors.white};
  ${media.phone`
    margin-left: 0;
    & br {
      display: none;
    }
  `};
`;

const MovieExplanTitle = styled.div`
  margin: 30px 0;
  font-size: ${FontSizes.medium2}px;
  line-height: ${FontSizes.medium2 * 1.5}px;
  font-weight: bold;
`;

const MovieExplanText = styled.div`
  font-size: ${FontSizes.medium}px;
  line-height: ${FontSizes.medium * 2}px;
`;

const StyledDefaultContainer = styled(DefaultContainer)`
  padding-top: 80px;
  padding-bottom: 80px;
  color: ${Colors.darkGray1};
  ${media.phone`
    padding-top: 40px;
    padding-bottom: 40px;
  `};
`;

const UserReasonContainer = styled(StyledDefaultContainer)`
  background-image: url(${topImage1});
  background-repeat: no-repeat;
  background-position: right;
  background-position-y: 388px;
  background-size: 50%;
  ${media.phone`
      background-image: url(${topImage1Sp});
      background-position: right 0 bottom 30px;
      background-size: contain;
      padding-bottom: 40vh;
  `};
`;

const HostReasonBackground = styled.div`
  background-image: url(${topImage2});
  background-repeat: no-repeat;
  background-position: left;
  background-size: auto 100%;
  ${media.phone`
    background-image: none;
  `};
`;

const HostReasonContainer = styled(StyledDefaultContainer)`
  padding: 80px 0 80px 600px;
  box-sizing: border-box;
  ${media.phone`
    padding: 40px 0;
  `};
`;

const ForSafeContainer = styled(StyledDefaultContainer)``;

const PickGoContainer = styled(StyledDefaultContainer)`
  display: flex;
  color: ${Colors.white};
`;

const MediaLineupContainer = styled(StyledDefaultContainer)`
  padding-top: 40px;
  padding-bottom: 40px;
`;

const HilightCopy = styled.span`
  display: block;
  font-size: ${FontSizes.small}px;
  line-height: ${FontSizes.small * 1.5}px;
  margin-bottom: 8px;
  color: ${Colors.brandPrimary};
`;

const DefaultTitle = styled.span`
  display: inline-block;
  font-size: ${FontSizes.xxlarge}px;
  line-height: ${FontSizes.xxlarge * 1.5}px;
  margin-bottom: 80px;
  ${media.phone`
    font-size: ${FontSizes.medium2}px;
    line-height: ${FontSizes.medium2 * 1.5}px;
    margin-bottom: 40px;
  `};
`;

const ExplainContainerLeft = styled.div`
  width: 48%;
  ${media.phone`
    width: 100%;
  `};
`;

const ExplainContainerRight = styled.div`
  width: 100%;
`;

const ExplainSection = ({ title, description }) => {
  const Root = styled.div`
    margin-bottom: 40px;
  `;

  const ExplainTitle = styled.span`
    display: block;
    font-size: ${FontSizes.medium1}px;
    line-height: ${FontSizes.medium1 * 1.5}px;
    margin-bottom: 10px;
  `;

  const ExplainDescription = styled.span`
    display: block;
    font-size: ${FontSizes.medium}px;
    line-height: ${FontSizes.medium * 2}px;
    ${media.phone`
      width: 84vw;
    `};
  `;

  return (
    <Root>
      <ExplainTitle>{title}</ExplainTitle>
      <ExplainDescription>{description}</ExplainDescription>
    </Root>
  );
};

const ToHostRegistButton = styled.button`
  display: inline-block;
  background: ${Colors.brandPrimary};
  font-size: ${FontSizes.medium}px;
  color: ${Colors.white};
  border-radius: 6px;
  width: 264px;
  height: 50px;
  box-sizing: border-box;
  &:hover {
    background: ${Colors.brandTerciary};
  }
  cursor: pointer;
  border: none;
  outline: none;

  ${media.phone`
    width: 84vw;
  `};
`;

const ForSafeSectionButton = styled.button`
  display: inline-block;
  color: ${Colors.brandPrimary};
  font-size: ${FontSizes.medium}px;
  background: ${Colors.white};
  border-radius: 6px;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  &:hover {
    background: ${Colors.brandTerciary};
    color: ${Colors.white};
  }
  cursor: pointer;
  border: 1px solid;
  outline: none;

  ${media.phone`
    display: table-cell;
    padding: 10px 20px;
    vertical-align: middle;
  `};
`;

const ForSafeSection = ({ iconClass, title, description, buttonText, onClick }) => {
  const StyledContainer = styled.div`
    width: 32%;
    ${media.phone`
      width: 100%;
      margin-bottom: 30px;
    `};
  `;
  const StyledTitle = styled.div`
    height: 60px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;
  const Description = styled.div`
    height: 54%;
    font-size: ${FontSizes.medium}px;
    line-height: ${FontSizes.medium * 2}px;
    margin-bottom: 30px;
    ${media.phone`
      height: auto;
    `};
  `;
  const TitleIcon = styled.span`
    margin-right: 20px;
    font-size: 60px;
  `;
  const CircleIcon = styled.i`
    && {
      color: ${Colors.brandPrimary};
    }
  `;
  const InnerIcon = styled.i`
    && {
      color: ${Colors.white};
    }
  `;
  const TitleText = styled.span`
    font-size: ${FontSizes.medium1}px;
  `;

  return (
    <StyledContainer>
      <StyledTitle>
        <TitleIcon className="fa-layers fa-fw fa-2x">
          <CircleIcon className="fas fa-circle" />
          <InnerIcon className={iconClass} data-fa-transform="shrink-6" />
        </TitleIcon>
        <TitleText>{title}</TitleText>
      </StyledTitle>
      <Description>{description}</Description>
      <ForSafeSectionButton onClick={onClick}>{buttonText}</ForSafeSectionButton>
    </StyledContainer>
  );
};

const ForSafeSectionList = props => {
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
        description="まずは自分に合う物置きスペースを探し、メッセージで荷物を置かせてもらえるかホストに相談をします。サービスの使い方がよくわからない、お困りの方はこちら。"
        buttonText="使い方について"
        onClick={() => props.history.push(Path.about())}
      />
      <ForSafeSection
        iconClass="far fa-bookmark"
        title="荷物に対する保険"
        description="サービス内の記録であなたの荷物だと証明できる荷物には最大10万円までの補償があります。あなたがホストの時に、もし誰かの荷物を破損・紛失してしまっても同じ補償が受けられるので安心です。"
        buttonText="保険について"
        onClick={() => props.history.push(Path.insurance())}
      />
      <ForSafeSection
        iconClass="far fa-handshake"
        title="ルールとマナー"
        description="モノオクは個人間の物置きシェアサービスです。トラブルや揉め事がないようにルールを設けています。みんなが安心して使えるようにマナーを大切にしましょう。"
        buttonText="ルールとマナーについて"
        onClick={() => props.history.push(Path.rule())}
      />
    </StyledContainer>
  );
};

const PickGoWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SubCatchPhrasePickGo = styled(SubCatchPhrase)`
  margin-bottom: 20px;
`;

const LinkToPickGo = styled.a`
  font-size: ${FontSizes.large}px;
  line-height: ${FontSizes.medium * 2}px;
  color: ${Colors.white};
  text-decoration: underline;
  ${media.phone`
    font-size: ${FontSizes.medium}px;
  `};
`;

const PickGoSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 294px;
  color: ${Colors.darkGray1};
  text-align: center;
  margin-left: 181px;
  margin-top: 87px;
  ${media.phone`
    margin: 30px auto;
    position: relative;
    width: 84vw;
  `};
`;

const PickGoMedia = styled.img`
  height: 42px;
  margin: 0 15.5px;
  margin-bottom: 20px;
`;

const GojoMedia = styled.img`
  height: 65px;
  margin: 0 15.5px;
  margin-bottom: 20px;
`;

const PickGoDescription = styled.div`
  font-size: ${FontSizes.small}px;
  line-height: ${FontSizes.small * 2}px;
`;

const LineupTitle = styled.div`
  font-size: ${FontSizes.medium1}px;
  margin-bottom: 40px;
`;

const LineupList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
`;

const LineupItem = styled.li`
  height: 26px;
  margin-bottom: 20px;
  margin-right: 40px;
  ${media.phone`
    height: 16px;
    margin-right: 10px;
  `};
`;

const LineupImage = styled.img`
  height: 100%;
`;

function refSearchField(ref, props) {
  if (ref) {
    ref.addEventListener('keydown', props.onKeyDownSearchField);
  }
}

const MediaLineup = () => (
  <MediaLineupContainer>
    <LineupTitle>メディア掲載</LineupTitle>
    <LineupList>
      <LineupItem>
        <a href="https://japan.cnet.com/" target="_blank" rel="noopener noreferrer">
          <LineupImage src={logoCnet} alt="CNET Japan" />
        </a>
      </LineupItem>
      <LineupItem>
        <a href="http://ascii.jp/" target="_blank" rel="noopener noreferrer">
          <LineupImage src={logoAscii} alt="ASCII.jp" />
        </a>
      </LineupItem>
      <LineupItem>
        <a href="http://thebridge.jp/" target="_blank" rel="noopener noreferrer">
          <LineupImage src={logoBridge} alt="THE BRIDGE" />
        </a>
      </LineupItem>
      <LineupItem>
        <a href="https://mag.app-liv.jp/" target="_blank" rel="noopener noreferrer">
          <LineupImage src={logoAppliv} alt="Appliv" />
        </a>
      </LineupItem>
      <LineupItem>
        <a href="https://www.lifehacker.jp/" target="_blank" rel="noopener noreferrer">
          <LineupImage src={logoLifehacker} alt="lifehacker" />
        </a>
      </LineupItem>
      <LineupItem>
        <a href="https://jp.techcrunch.com/" target="_blank" rel="noopener noreferrer">
          <LineupImage src={logoTechcrunch} alt="TechCrunch" />
        </a>
      </LineupItem>
      <LineupItem>
        <a href="https://techable.jp" target="_blank" rel="noopener noreferrer">
          <LineupImage src={logoTechable} alt="TECHABLE" />
        </a>
      </LineupItem>
    </LineupList>
  </MediaLineupContainer>
);

const SearchInputContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
`;

const PickupContainer = styled.div`
  margin: ${Dimens.large}px 0;
`;

function shuffleArray(array) {
  const result = array;
  for (let i = array.length - 1; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    result[i] = array[rand];
    result[rand] = temp;
  }

  return result;
}

const displayPickupFeatureSpaceList = shuffleArray(PickupFeatureSpaceList);
const displayPickupStaffSpaceList = shuffleArray(PickupStaffSpaceList);

const PickupFeature = props => (
  <PickupContainer>
    <PickupSpaceList
      title="ピックアップスペース"
      spaceList={displayPickupFeatureSpaceList.slice(0, 4 + (props.moreFeature ? 4 : 0))}
      noMore={props.moreFeature}
      onClickMoreView={props.onClickMoreFeature}
    />
  </PickupContainer>
);

const PickupStaff = () => (
  <PickupContainer>
    <PickupSpaceList
      title="スタッフのおすすめ"
      spaceList={displayPickupStaffSpaceList.slice(0, 4)}
      noMore
      onClickMoreView={() => {}}
    />
  </PickupContainer>
);

const HubAndConciergeContents = props => {
  const StyledContainer = styled.div`
    margin: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    ${media.phone`
      justify-content: center;
      margin: 50px;
    `};
  `;

  return (
    <StyledContainer className="for-safe-section-list">
      <HubAndConciergeSection onClick={() => props.history.push(Path.conciergeRequest())} />
    </StyledContainer>
  );
};

const HubAndConciergeSection = ({ isHub, onClick }) => {
  const StyledContainer = styled.div`
    width: 40%;
    text-align: center;
    font-weight: bold;
    text-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    ${isHub
      ? css`
          color: ${Colors.hub};
        `
      : css`
          color: ${Colors.brandPrimary};
        `} ${media.phone`
      width: 100%;
      margin-bottom: 30px;
    `};
  `;

  const Title = styled.div`
    font-size: ${FontSizes.medium3}px;
  `;

  const Description = styled.div`
    margin-top: 40px;
    margin-bottom: 30px;
  `;

  const DescriptionMain = styled.div`
    margin-top: 10px;
    font-size: ${FontSizes.medium2}px;
  `;

  const DescriptionSub = styled.div`
    font-size: ${FontSizes.small}px;
  `;

  const PriceContainer = styled.div`
    margin: auto;
    padding: 20px;
    width: 60%;
    ${media.phone`
      width: 70%;
    `};
    ${isHub
      ? css`
          border: 1px solid ${Colors.hub};
        `
      : css`
          border: 1px solid ${Colors.brandPrimary};
        `} border-radius: 5px;
  `;

  const PriceSub = styled.div`
    font-size: ${FontSizes.small}px;
  `;

  const Price = styled.span`
    font-size: ${FontSizes.large}px;
  `;

  const PriceMain = styled.div`
    margin-top: 30px;
    margin-bottom: 30px;
  `;

  const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
  `;

  return (
    <StyledContainer>
      <Title>
        {isHub ? <Logo.Hub width={200} /> : <Logo.Base width={200} />}
        <br />
        {isHub ? 'Hub' : 'Concierge'}
      </Title>
      <Description>
        <DescriptionSub>
          {isHub ? '都内でお急ぎの方にオススメ' : 'なかなかスペースが見つからない方へ'}
        </DescriptionSub>
        <DescriptionMain>
          {isHub ? 'すぐにお荷物を預かります!' : 'あなたにぴったりなホストをご紹介!'}
        </DescriptionMain>
      </Description>
      <PriceContainer>
        <PriceSub>{isHub ? '1ヶ月の保管料金' : '全国のスペース対象'}</PriceSub>
        <PriceMain>{isHub ? <Price>7,000円〜</Price> : <Price>相談無料</Price>}</PriceMain>
        <PriceSub>
          {isHub ? '※配送料別途、保管スペースは世田谷区のみ' : 'お気軽にご相談ください'}
        </PriceSub>
      </PriceContainer>
      <ButtonContainer>
        <Button hub={isHub} onClick={onClick}>
          {isHub ? '申し込む' : '相談する'}
        </Button>
      </ButtonContainer>
    </StyledContainer>
  );
};

export default props => (
  <TopPage>
    <Header />
    <TopView>
      <TopViewFilter>
        <TopViewContainer>
          <CatchPhrase>
            個人間だからできる、
            <br />
            荷物を置くための新しい方法。
          </CatchPhrase>
          <SubCatchPhrase>
            モノオクは空きスペースを活用できる、物置きシェアサービスです。
          </SubCatchPhrase>

          <SearchInputContainer>
            <SearchInput
              placeholder="近くのスペースを検索してみよう！　例）東京都港区"
              locationText={props.locationText}
              onChange={props.handleChangeLocation}
              onRef={ref => refSearchField(ref, props)}
              searchDisabled={props.searchButtonDisabled}
              onClickSearchButton={props.onClickSearch}
            />
          </SearchInputContainer>
        </TopViewContainer>
      </TopViewFilter>
    </TopView>
    {PickupFeature(props)}
    {PickupStaff(props)}
    <HubAndConciergeContents history={props.history} />
    <ColoredContainer>
      <MovieContainer>
        <MovieFrameWrapper>
          <MovieFrame
            src="https://www.youtube.com/embed/t0t50WBDwzc?showinfo=0&rel=0"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          />
        </MovieFrameWrapper>
        <MovieExplanContainer>
          <MovieExplanTitle>
            モノオクは、
            <br />
            荷物の置き場所に困っている人と、
            <br />
            余ったスペースを活用したい人をつなぎます。
          </MovieExplanTitle>
          <MovieExplanText>
            1分でわかるサービスの流れ。
            <br />
            誰でもかんたんに物置きスペースを探せて、気軽にホストになる
            <br />
            ことができます。
          </MovieExplanText>
        </MovieExplanContainer>
      </MovieContainer>
    </ColoredContainer>
    <UserReasonContainer>
      <HilightCopy>小さいモノから大きなモノまで。</HilightCopy>
      <DefaultTitle>モノオクで物置きスペースを探す理由</DefaultTitle>

      <ExplainContainerLeft>
        <ExplainSection
          title="安心の料金"
          description="ホストから提示される金額のみをお支払い。余計な費用なしに荷物を置くことができます。※配送は別途"
          isLeft
        />
        <ExplainSection
          title="面倒な手続きが不要"
          description="面倒くさい申込書の記入や内覧の必要はありません。必要なのはメッセージや荷物写真のやりとりだけです。"
          isLeft
        />
        <ExplainSection
          title="拠点数が多い"
          description="モノオクだからできる日本全国に広がる拠点数。あなたのお部屋や引越し先のご近所でも見つかるはず。"
          isLeft
        />
        <ExplainSection
          title="1ヶ月だけでもOK"
          description="3ヶ月や半年などの契約期間の縛りはありません。ホストと相談して必要な期間だけ荷物を置くことができます。"
          isLeft
        />
        <ExplainSection
          title="交渉が可能"
          description="もう少し延長できませんか？荷物の搬入を手伝ってくれませんか？など、ホストと気軽に交渉することが可能です。"
          isLeft
        />
      </ExplainContainerLeft>
    </UserReasonContainer>
    <ColoredContainerGray>
      <HostReasonBackground>
        <HostReasonContainer>
          <HilightCopy>余っているスペースはありませんか？</HilightCopy>
          <DefaultTitle>モノオクでホストをする理由</DefaultTitle>
          <ExplainContainerRight>
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
              description="荷物を受け取ってスペースに置く、最後は持ち主まで返す。これだけで喜んでくれる人がいます。"
            />
            <ExplainSection
              title="誰かの役にたつ"
              description="引っ越しやリフォーム、片付けなど荷物を置ける場所を探すのは意外と大変なんです。困っている誰かの力になってくれませんか？"
            />
          </ExplainContainerRight>
          <ToHostRegistButton onClick={props.onClickSignup}>ホスト登録はこちら</ToHostRegistButton>
        </HostReasonContainer>
      </HostReasonBackground>
    </ColoredContainerGray>
    <ForSafeContainer>
      <HilightCopy>みんなでもっと便利に物置きシェアができる世の中へ。</HilightCopy>
      <DefaultTitle>安心して物置きのシェアをするために</DefaultTitle>
      <ForSafeSectionList history={props.history} />
    </ForSafeContainer>
    <ColoredContainer>
      <PickGoContainer>
        <PickGoWrapper>
          <CatchPhrase>
            荷物の配送だって
            <br />
            もっと便利に安くできる
          </CatchPhrase>
          <PickGoSection>
            <LinkToPickGo
              component={Link}
              href="https://pickgo.town/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PickGoMedia src={logoPickGo} />
            </LinkToPickGo>
            <PickGoDescription>
              サービス対象エリア
              <br />
              東京／神奈川／千葉／埼玉／大阪／兵庫／京都
            </PickGoDescription>
          </PickGoSection>
          <SubCatchPhrasePickGo>
            <LinkToPickGo
              component={Link}
              href="https://pickgo.town/"
              target="_blank"
              rel="noopener noreferrer"
            >
              PickGo
            </LinkToPickGo>
            を使えば、
            <br />
            引っ越しが 5,000円 から
          </SubCatchPhrasePickGo>
        </PickGoWrapper>
      </PickGoContainer>
      <PickGoContainer>
        <PickGoWrapper>
          <CatchPhrase>
            共同でスペースを利用するなら
            <br />
            Gojoで便利に
          </CatchPhrase>
          <PickGoSection>
            <LinkToPickGo
              component={Link}
              href="https://gojo.life/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GojoMedia src={logoGojo} />
            </LinkToPickGo>
          </PickGoSection>
          <SubCatchPhrasePickGo>
            <LinkToPickGo
              component={Link}
              href="https://gojo.life/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gojo
            </LinkToPickGo>
            を使えば、
            <br />
            チームやコミュニティの
            <br />
            お金の管理が簡単に
          </SubCatchPhrasePickGo>
        </PickGoWrapper>
      </PickGoContainer>
    </ColoredContainer>
    <MediaLineup />
    <Footer />
  </TopPage>
);
