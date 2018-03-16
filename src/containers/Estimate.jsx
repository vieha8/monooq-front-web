import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {uiActions} from 'redux/modules/ui';
import {Colors} from 'variables';
import {media} from '../helpers/style/media-query';
import { requestActions } from "../redux/modules/request";

const EstimatePage = styled.div`
`;

const EstimateContainer = styled.div`
  max-width: 1048px;
  margin: 0 auto;
`;

const PageTitle = styled.div`
  font-size: 34px;
  line-height: 51px;
  letter-spacing: -0.5px;
  margin-bottom: 52px;
  ${media.phone`
    padding: 0 20px;
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 20px;
  `};
`;

const PageTitleSub = styled.div`
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 30px;
  ${media.phone`
    padding: 0 20px;
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 20px;
  `};
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const EstimateFormContainer = styled.div`
  width: 688px;
  ${media.phone`
    width: 100%;
  `};
`;

const EstimateSideContainer = styled.div`
  width: 327px;
  ${media.phone`
    padding: 0 20px;
    width: 100%;
  `};
`;

const SelectScheduleTerm = (props) => {

  const Label = styled.label`
    font-size: 16px;
    display: block;
    height: 24px;
    line-height: 24px;
    margin-bottom: 20px;
  `;

  const DateSelector = styled.div`
    ${media.phone`
      padding: 0 20px;
      width: 100%;
    `};
  `;

  const InputContainer = styled.div`
    position: relative;
    float: left;
    ${media.phone`
      width: 100%;
    `};
  `;

  const InputSchedule = styled.input`
    font-size: 14px;
    line-height: 21px;
    padding: 10px 14px;
    width: 170px;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid #bcbcbc;
    border-radius: 2px;
    color: #333333;
    background: #fafafa;

    :focus {
      border: 1px solid #f1979b;
      outline: 0;
    }
    ::before {
      font-family: "Fontawesome";
      content: "\f133";
      width: inherit;
    }
    :focus::before, :valid::before { display: none }

    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    ::-webkit-clear-button {
      -webkit-appearance: none;
    }
    ::-webkit-calendar-picker-indicator {
      color: transparent;
      position: relative;
      :hover {
        cursor: pointer;
      }
    }

    ${media.phone`
      width: 100%;
    `};
  `;

  const OpenSelector = styled.span`
    position: absolute;
    top: 10px;
    right: 3px;
    width: 25px;
    height: 25px;
    color: #bcbcbc;
    background: #fafafa;
    pointer-events: none;
  `;

  const FlowIcon = styled.div`
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    width: 18px;
    margin: 0 15px;
    color: #bcbcbc;
    ${media.phone`
      display: none;
    `};
  `;


  return (
    <div className={props.className}>
      <DateSelector>
        <Label>預かり開始日</Label>
        <InputContainer>
          <InputSchedule
            type='date'
            data-placeholder="日付を選ぶ"
            required
            aria-required="true"
            id="date-start"
            disabled={props.isSending}
            name="startDate"
            value={props.ui.startDate}
            onChange={props.handleChange}
          />
          <OpenSelector>
            <i className="far fa-calendar"/>
          </OpenSelector>
        </InputContainer>
      </DateSelector>

      <FlowIcon>
        <i className="fas fa-arrow-right"/>
      </FlowIcon>

      <DateSelector>
        <Label>預かり終了日</Label>
        <InputContainer>
          <InputSchedule
            type="date"
            data-placeholder="日付を選ぶ"
            required
            aria-required="true"
            id="date-end"
            disabled={props.isSending}
            name="endDate"
            value={props.ui.endDate}
            onChange={props.handleChange}
          />
          <OpenSelector>
            <i className="far fa-calendar"/>
          </OpenSelector>
        </InputContainer>
      </DateSelector>
    </div>
  );
};

const StyledSelectScheduleTerm = styled(SelectScheduleTerm)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 40px;
`;

const DescriptionText = styled.div`
  font-size: 12px;
  line-height: 18px;
  letter-spacing: .6px;
  color: #888787;
  margin-bottom: 21px;
  ${media.phone`
    padding: 0 20px;
    width: 100%;
  `};
`;

const InputEstimate = (props) => {
  const Label = styled.label`
    font-size: 16px;
    display: block;
    height: 24px;
    line-height: 24px;
    margin-bottom: 17px;
  `;
  const InputEstimatePrice = styled.input`
    height: 50px;
    width: 417px;
    border: 1px solid #BCBCBC;
    border-radius: 2px;
    background-color: #FAFAFA;
    padding: 15px 14px;
    margin-right: 10px;
    ${media.phone`
      width: 90%;
    `};
  `;
  return (
    <div className={props.className}>
      <Label>お見積料金</Label>
      <InputEstimatePrice
        name="price"
        value={props.ui.price}
        onChange={props.handleChange}
        type="number"
      />円
    </div>
  );
};

const StyledInputEstimate = styled(InputEstimate)`
  margin-bottom: 40px;
  ${media.phone`
    padding: 0 20px;
    width: 100%;
  `};
`;

const EstimateButton = styled.div`
  text-align: center;
  font-size: 16px;
  line-height: 16px;
  padding: 18px 0;
  margin-bottom: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  color: ${Colors.white};
  background: ${Colors.brandPrimary};
  :hover {
    background: ${Colors.brandTerciary};
  }
  :active {
    background: ${Colors.brandSecondary};
  }
`;

const Hint = (props) => {
  const Title = styled.div`
    font-size: 18px;
    line-height: 32px;
    margin-bottom: 16px;
    font-weight: 100;
  `;

  const Description = styled.div`
    font-size: 16px;
    line-height: 24px;
    font-weight: 100;
  `;

  return (
    <div className={props.className}>
      <Title>{props.hintTitle}</Title>
      <Description>{props.children}</Description>
    </div>
  );
};

const StyledHint = styled(Hint)`
  padding: 30px;
  background: rgba(232,190,93,0.1);
  ${media.phone`
    display: none;
  `};
`;

const EstimateButtonWrapper = styled.div`
  ${media.phone`
    padding: 0 46px;
    width: 100%;
  `};
`;

class Estimate extends React.Component {

  handleChange = ({target}) => {
    this.props.dispatch(uiActions.setUiState({
      [target.name]: target.value,
    }));
  };

  sendRequest = () => {
    const userId = this.props.user.ID;
    const roomId = this.props.match.params.message_room_id;
    const {startDate, endDate, price} = this.props.ui;
    this.props.dispatch(requestActions.estimate({
      userId, roomId, startDate, endDate, price
    }));
  };

  render() {
    return (
      <EstimatePage>
        <EstimateContainer>
          <PageTitle>見積りを送る</PageTitle>
          <FlexWrapper>
            <EstimateFormContainer>
              <PageTitleSub>スケジュールを入力</PageTitleSub>
              <StyledSelectScheduleTerm
                {...this.props}
                handleChange={this.handleChange}
              />
              <PageTitleSub>このリクエストの見積もり料金</PageTitleSub>
              <DescriptionText>
                ユーザーから連絡があったの荷物量・予定を元に最終的な見積もり料金を決めましょう。
                想定していたよりも荷物が多い場合や少ない場合、預けてくれる期間が長い場合の割引きなどユーザーの相談に合わせて料金を変更しましょう。
              </DescriptionText>
              <StyledInputEstimate
                {...this.props}
                handleChange={this.handleChange}
              />
              <EstimateButtonWrapper>
                <EstimateButton onClick={this.sendRequest}>見積もりを送信する</EstimateButton>
              </EstimateButtonWrapper>
            </EstimateFormContainer>

            <EstimateSideContainer>
              <StyledHint
                hintTitle="お見積りのヒント"
              >
                メッセージの相談内容を元に最終的な見積りを相手に提示しましょう。<br/><br/>思っていたより荷物が少なかったり、期間が短い場合はちょっぴり値下げすると喜ばれます。
              </StyledHint>
            </EstimateSideContainer>
          </FlexWrapper>
        </EstimateContainer>
      </EstimatePage>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Estimate);
