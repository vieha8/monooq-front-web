import React from 'react';
import { Link } from 'react-router-dom';
import Path from 'config/path';
import Button from 'material-ui/Button';
import SearchIcon from 'material-ui-icons/Search';

import styled from 'styled-components';
import { FontSizes, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import { Footer, DefaultContainer } from 'components/Shared';

import mainVisual from 'images/main_visual@2x.jpg';
import mainVisualSp from 'images/main_visual_sp@2x.jpg';
import topImage1 from 'images/top1@2x.png';
import topImage1Sp from 'images/top1_sp@2x.png';
import topImage2 from 'images/top2@2x.png';
import logoPickgo from 'images/logo-pickgo@2x.png';
import logoAppliv from 'images/logo-appliv@2x.png';
import logoAscii from 'images/logo-ascii@2x.png';
import logoBridge from 'images/logo-bridge@2x.png';
import logoCnet from 'images/logo-cnet@2x.png';
import logoLifehacker from 'images/logo-lifehacker@2x.png';
import logoTechcrunch from 'images/logo-techcrunch@2x.png';
import logoTechable from 'images/logo-techable@2x.png';

const TopPage = styled.div`
  min-width: 1048px;
  margin-top: -20px;
  background: ${Colors.lightGray2Bg};
  ${media.phone`
    min-width: 0;
  `};
`;

const TopView = styled.div`
  height: 800px;
  background-image: url(${mainVisual});
  background-size: cover;
  color: rgb(255, 255, 255);
  background-repeat: no-repeat;
  ${media.phone`
    height: 480px;
    margin-top: -64px;
    background-image: url(${mainVisualSp});
    background-size: contain;
    background-position: 0 56px;
  `};
`;

const TopViewFilter = styled.div`
  height: 100%;
  padding-top: 196px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.4);
  ${media.phone`
    padding-top: 108px;
  `};
`;

const TopViewContainer = styled(DefaultContainer)``;

const CatchPhrase = styled.div`
  font-size: ${FontSizes.xxlarge}px;
  font-weight: bold;
  line-height: 56px;
  text-align: left;
  width: 570px;
  height: 114px;
  margin-bottom: 10px;
  ${media.phone`
    font-size: 1.3em;
    line-height: 1.8em;
    width: 100%;
    height: auto;
  `};
`;

const SubCatchPhrase = styled.span`
  display: block;
  font-size: 26px;
  width: 480px;
  font-weight: 100;
  line-height: 40px;
  ${media.phone`
    font-size: 1.1em;
    line-height: 30px;
    width: 100%;
  `};
`;

const SubCatchPhraseWide = SubCatchPhrase.extend`
  width: 540px;
`;

const SearchWrapper = styled.div`
  width: 507px;
  position: relative;
  margin-top: 20px;
  margin-bottom: 40px;
  overflow: hidden;
  ${media.phone`
    width: 84vw;
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
    width: 84vw;
  `};
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled(Button)`
  &&& {
    position: absolute;
    top: 0;
    right: -10px;
    height: 100%;
    padding: 0;
    background-color: transparent;
    box-shadow: none;
    ${media.phone`
      right: -20px;
    `};
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  && {
    height: 32px;
    width: 32px;
    color: ${Colors.brandPrimary};
    ${props =>
      props.disabled
        ? `
          color: ${Colors.darkGray2};
        `
        : ''};
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

const ColoredContainer = styled.div`
  background-color: ${Colors.brandPrimary};
`;

const ColoredContainerGray = styled.div`
  background-color: ${Colors.lightGray1Bg};
`

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

const HostReasonContainer = styled(StyledDefaultContainer)`
  background-image: url(${topImage2});
  background-repeat: no-repeat;
  background-position: left;
  padding: 80px 10% 80px 600px;
  background-size: 500px 947px;
  box-sizing: border-box;
  ${media.phone`
    background-image: none;
    padding: 40px 0;
  `};
`;

const ForSafeContainer = styled(StyledDefaultContainer)``;

const PickgoContainer = styled(StyledDefaultContainer)`
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

const ExplainContainerLeft = styled.div`
  width: 48%;
  ${media.phone`
    width: 100%;
  `};
`;

const ExplainContainerRight = styled.div`
  width: 100%;
`;

const ExplainSection = ({ title, description, isLeft }) => {
  const Root = styled.div`
    margin-bottom: 40px;
  `;

  const ExplainTitle = styled.span`
    display: block;
    font-size: 22px;
    margin-bottom: 10px;
  `;

  const ExplainDescription = styled.span`
    display: block;
    font-size: ${FontSizes.medium}px;
    line-height: 32px;
    font-weight: 100;
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
    padding: 9px 20px;
    vertical-align: middle;
  `};
`;

const ForSafeSection = ({ iconClass, title, description, buttonText, onClick }) => {
  const StyledContainer = styled.div`
    width: 32%;
    font-weight: 100;
    ${media.phone`
      width: 100%;
      margin-bottom: 30px;
    `};
  `;
  const StyledTitle = styled.div`
    height: 60px;
    font-size: 22px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;
  const Description = styled.div`
    height: 54%;
    font-size: 16px;
    line-height: 32px;
    margin-bottom: 30px;
    ${media.phone`
      height: auto;
    `};
  `;
  const style = {
    titleIcon: {
      marginRight: '20px',
      fontSize: '60px',
    },
  };
  return (
    <StyledContainer>
      <StyledTitle>
        <span className="fa-layers fa-fw fa-2x" style={style.titleIcon}>
          <i className="fas fa-circle" style={{ color: '#E85258' }} />
          <i className={iconClass} style={{ color: '#fff' }} data-fa-transform="shrink-6" />
        </span>
        <span>{title}</span>
      </StyledTitle>
      <Description>{description}</Description>
      <ForSafeSectionButton onClick={onClick}>{buttonText}</ForSafeSectionButton>
    </StyledContainer>
  );
};

const ForSafeSectionList = (props) => {
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

const PickgoWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const LinkToPickGo = styled.a`
  font-size: 18px;
  color: rgb(255, 255, 255);
  line-height: 42px;
  text-decoration: underline;
`;

const PickGoSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 294px;
  color: #333333;
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

const PickGoDescription = styled.div`
  font-size: ${FontSizes.small}px;
  line-height: 27px;
`;

const LineupTitle = styled.div`
  font-size: 22px;
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
  img {
    height: 100%;
  }
`;

const MediaLineup = () => (
  <MediaLineupContainer>
    <LineupTitle>メディア掲載</LineupTitle>
    <LineupList>
      <LineupItem>
        <a href="https://japan.cnet.com/" target="_blank" rel="noopener noreferrer" ><img src={logoCnet} alt="CNET Japan" /></a>
      </LineupItem>
      <LineupItem>
        <a href="http://ascii.jp/" target="_blank" rel="noopener noreferrer" ><img src={logoAscii} alt="ASCII.jp" /></a>
      </LineupItem>
      <LineupItem>
        <a href="http://thebridge.jp/" target="_blank" rel="noopener noreferrer" ><img src={logoBridge} alt="THE BRIDGE" /></a>
      </LineupItem>
      <LineupItem>
        <a href="https://mag.app-liv.jp/" target="_blank" rel="noopener noreferrer" ><img src={logoAppliv} alt="Appliv" /></a>
      </LineupItem>
      <LineupItem>
        <a href="https://www.lifehacker.jp/" target="_blank" rel="noopener noreferrer" ><img src={logoLifehacker} alt="lifehacker" /></a>
      </LineupItem>
      <LineupItem>
        <a href="https://jp.techcrunch.com/" target="_blank" rel="noopener noreferrer" ><img src={logoTechcrunch} alt="TechCrunch" /></a>
      </LineupItem>
      <LineupItem>
        <a href="https://techable.jp" target="_blank" rel="noopener noreferrer" ><img src={logoTechable} alt="TECHABLE" /></a>
      </LineupItem>
    </LineupList>
  </MediaLineupContainer>
);

export default props => (
  <TopPage>
    <TopView>
      <TopViewFilter>
        <TopViewContainer>
          <CatchPhrase>
            個人間だからできる、<br />荷物を置くための新しい方法。
          </CatchPhrase>
          <SubCatchPhrase>
            モノオクは空きスペースを活用できる、物置きシェアサービスです。
          </SubCatchPhrase>
          <SearchWrapper>
            <SearchInput
              id="location"
              placeholder="近くのスペースを検索してみよう！　例）東京都港区"
              value={props.locationText}
              onChange={props.handleChangeLocation}
              margin="normal"
            />
            <SearchButton
              color="primary"
              mini
              component={Link}
              to={`${Path.search()}?location=${props.locationText}`}
              disabled={props.searchButtonDisabled}
            >
              <StyledSearchIcon disabled={props.searchButtonDisabled} />
            </SearchButton>
          </SearchWrapper>

          <ToHostRegistContainer>
            <ToHostRegist component={Link} href={Path.createSpaceInfo()}>
              ホスト登録はこちら
            </ToHostRegist>
          </ToHostRegistContainer>
        </TopViewContainer>
      </TopViewFilter>
    </TopView>
    <ColoredContainer>
      <MovieContainer>
        <MovieFrameWrapper>
          <MovieFrame src="https://www.youtube.com/embed/t0t50WBDwzc?showinfo=0&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen />
        </MovieFrameWrapper>
        <MovieExplanContainer>
          <MovieExplanTitle>
            モノオクは、<br />
            荷物の置き場所に困っている人と、<br />
            余ったスペースを活用したい人をつなぎます。
          </MovieExplanTitle>
          <MovieExplanText>
            1分でわかるサービスの流れ。<br />
            誰でもかんたんに物置きスペースを探せて、気軽にホストになる<br />
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
          description="ホストから提示される金額のみをお支払い。余計な費用なしに荷物を置くことがができます。※配送は別途"
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
          description="3ヶ月や半年などの契約期間の縛りはありません。ホストと相談して必要な期間だけ期間だけ荷物を置くことができます。"
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
    </ColoredContainerGray>
    <ForSafeContainer>
      <HilightCopy>みんなでもっと便利に物置きシェアができる世の中へ。</HilightCopy>
      <DefaultTitle>安心して物置きのシェアをするために</DefaultTitle>
      <ForSafeSectionList history={props.history} />
    </ForSafeContainer>
    <ColoredContainer>
      <PickgoContainer>
        <PickgoWrapper>
          <CatchPhrase>
            荷物の配送だって<br />もっと便利に安くできる。
          </CatchPhrase>
          <PickGoSection>
            <PickGoMedia src={logoPickgo} />
            <PickGoDescription>
              サービス対象エリア<br />東京／神奈川／千葉／埼玉／大阪／兵庫／京都
            </PickGoDescription>
          </PickGoSection>
          <SubCatchPhraseWide>
            Pickgoを使えば、引っ越しが5000円から。モノオクから簡単に配送依頼ができます。
          </SubCatchPhraseWide>
          <LinkToPickGo component={Link} href={'http://pickgo.town/'}>
            Pickgoのサイトを見る
          </LinkToPickGo>
        </PickgoWrapper>
      </PickgoContainer>
    </ColoredContainer>
    <MediaLineup />
    <Footer />
  </TopPage>
);
