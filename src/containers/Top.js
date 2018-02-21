import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import SearchIcon from 'material-ui-icons/Search';

import styled from 'styled-components';
import { Colors } from '../variables';

const IMAGE_URL = 'https://picsum.photos/1280/800?image=1012';

const TopPage = styled.div`
  margin-top: -20px;
  background: ${Colors.lightGray};
`;

const TopView = styled.div`
  padding: 196px 116px 0 116px;
  height: 800px;
  margin-top: -64px;
  background-image: url(${IMAGE_URL});
  background-size: cover;
  color: rgb(255, 255, 255);
  box-sizing: border-box;
`;

const Monooq = styled.span`
  display: inline-block;
  font-family: sans-serif;
  font-size: 20px;
  width: 561px;
  font-weight: 100;
`;

const CatchPhrase = styled.div`
  font-size: 34px;
  font-family: sans-serif;
  line-height: 57px;
  text-align: left;
  width: 556px;
  height: 114px;
`;

const SubCatchPhrase = styled.span`
  display: inline-block;
  font-family: sans-serif;
  font-size: 26px;
  width: 561px;
  font-weight: 100;
  line-height: 42px;
  margin-top: 9px;
`;

const SearchInput = styled.input`
  margin: 0;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 20px;
  display: inline-block;
  vertical-align: middle;
  background: #fff;
  height: 60px;
  width: 507px;
  line-height: 20px;
  box-sizing: border-box;
  font-size: 14px;
  font-family: sans-serif;
`;

const ToHostRegist = styled.a`
  font-family: sans-serif;
  font-size: 18px;
  color: rgb(255, 255, 255);
  line-height: 42px;
  margin-left: 175px;
`;

const TopHr = styled.hr`
  margin: 0;
  height: 60px;
  border: 0;
  background: rgb(232, 82, 88);
`;

const DefaultView = styled.div`
  padding: 80px 116px;
  background-size: cover;
  color: rgb(51, 51, 51);
  box-sizing: border-box;
  ${props =>
    props.isReason
      ? `
        background: #fff;
    `
      : ''};
`;

const HilightCopy = styled.span`
  display: block;
  font-family: sans-serif;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 9px;
  color: rgb(232, 82, 88);
`;

const DefaultTitle = styled.span`
  display: inline-block;
  font-family: sans-serif;
  font-size: 38px;
  line-height: 51px;
  margin-bottom: 80px;
`;

const ExplainTitle = styled.span`
  display: block;
  font-family: sans-serif;
  font-size: 22px;
`;

const ExplainDescription = styled.span`
  display: block;
  font-family: sans-serif;
  font-size: 16px;
  line-height: 32px;
  font-weight: 100;
`;

const ExplainSection = ({ title, description, isRight = false }) => {
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

class Top extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      isDisableSearchButton: true,
    };
  }

  handleChange = event => {
    if (event.target.value === '') {
      this.setState({ isDisableSearchButton: true });
    } else {
      this.setState({ isDisableSearchButton: false });
    }
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <TopPage>
        <TopView>
          <div className={classes.contents}>
            <Hidden xsDown>
              <Monooq>monooQ</Monooq>
              <CatchPhrase>
                個人間だからできる、<br />荷物を預けるための新しい方法。
              </CatchPhrase>
              <SubCatchPhrase>
                モノオクは余った個人のスペースを活用して、荷物を預けることができるサービスです。
              </SubCatchPhrase>
            </Hidden>
            <Hidden smUp>
              <Typography type="title" component="h1" style={{ fontWeight: 'bold' }}>
                モノがあふれていませんか?
              </Typography>
            </Hidden>
            <div className={classes.search}>
              <SearchInput
                id="location"
                placeholder="近くの場所を検索してみよう！　例）東京都港区?"
                value={this.state.location}
                onChange={this.handleChange}
                margin="normal"
              />
              <Button
                className={classes.button}
                fab
                color="primary"
                mini
                component={Link}
                to={'/search/' + this.state.location}
                disabled={this.state.isDisableSearchButton}
              >
                <SearchIcon />
              </Button>
            </div>
            <ToHostRegist component={Link} href={'/edit/profile/1'}>
              ホスト登録はこちら
            </ToHostRegist>
          </div>
        </TopView>
        <TopHr />
        <DefaultView isReason>
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
        <DefaultView>
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
        </DefaultView>
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
  search: {
    marginTop: 20,
    marginBottom: '40px',
  },
  button: {
    left: '-50px',
  },
});

export default withStyles(styles)(Top);
