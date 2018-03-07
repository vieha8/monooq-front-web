import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import authRequired from 'components/Auth';
import { createRoom, messagesActions } from 'redux/modules/messages';
import UserMenu from 'components/Menu/UserMenu';
import Button from 'material-ui/Button';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import Page, { ContentContainer } from 'components/Page';

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SubTitle = styled.div`
  color: #333333;
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 25px;
  ${media.phone`
    display: none;
  `};
`;

const RecordContent = (props) => {
  const record = props.record;

  let descriptionText = `ホストは${record.hostUserName}さん`;
  if(record.status == `canceled`) descriptionText = `キャンセル手数料を引いた返金`;

  let statusText = `決済完了`;
  if(record.status == `canceled`) statusText = `キャンセル`;

  const Description = styled.div`
    margin-bottom: 4px;
  `;
  const DetailWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  `;
  const StatusContainer = styled.span`
    margin-left: 20px;
  `;
  const PriceLabel = styled.div`
    font-weight: bold;
  `;
  return (
    <div className={props.className}>
      <Description>{descriptionText}</Description>
      <DetailWrapper>
        <div>{record.update}<StatusContainer>{statusText}</StatusContainer></div>
        <PriceLabel>{record.price}円</PriceLabel>
      </DetailWrapper>
    </div>
  );
}

const StyledRecordContent = styled(RecordContent)`
  padding: 20px 10px;
  border-bottom: 1px solid #bcbcbc;
  color: #333333;
  font-size: 14px;
  line-height: 28px;
  ${media.phone`
    padding: 20px 20px;
  `};
`;

class Payments extends React.Component {
  constructor(props) {
    super(props);
    const userId = this.props.userId;
    this.props.dispatch(messagesActions.fetchRoomsStart(userId));
  }

  createSampleRecord = () => {
    return [
      {
        id: "001",
        hostUserName: "YUKI HASHIDA",
        update: "2018.01.12",
        status: "paid",
        price: "12000",
      },
      {
        id: "002",
        hostUserName: "SYUNSUKE KOBASHI",
        update: "2018.01.12",
        status: "paid",
        price: "2000",
      },
      {
        id: "003",
        hostUserName: "YUKI HASHIDA",
        update: "2018.01.12",
        status: "canceled",
        price: "5000",
      },
    ];
  };

  render() {
    const { history } = this.props;
    return (
      <Page title="支払い履歴" >
        <Fragment>
          <UserMenu messageCount={99} scheduleCount={9}/>
          <ContentContainer>
            <SubTitle>支払いの詳細</SubTitle>
            {this.createSampleRecord().map((v)=>{
              return(
                <StyledRecordContent record={v}/>
              )
            })}
          </ContentContainer>
        </Fragment>
      </Page>
    );
  }
}

const styles = theme => ({
  root: {
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
  },
});

const mapStateToProps = state => ({
  rooms: state.messages.rooms,
  isLoading: state.messages.isLoading,
  userId: state.auth.user.id,
});

export default compose(withStyles(styles), authRequired, connect(mapStateToProps))(Payments);
