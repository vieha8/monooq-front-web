const request = require('request');
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

function sendSlackMessage(message) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const options = {
    url: 'https://slack.com/api/chat.postMessage',
    method: 'POST',
    headers,
    json: true,
    form: {
      token: 'xoxp-111674345059-220713006950-338723670577-501fa7fe4cdd23cc593fc63d808b6656',
      channel: 'messages',
      username: 'service',
      text: message,
    },
  };

  request(options, () => {});
}

exports.noticeSlack = {
  // createRoom: functions.firestore
  //   .document('rooms/{roomId}')
  //   .onCreate((event) => {
  //     const data = event.data.data();
  //     data.roomId = event.params.roomId;
  //     sendSlackMessage(JSON.stringify(data));
  //   }),
  createMessage: functions.firestore
    .document('rooms/{roomId}/messages/{messageId}')
    .onCreate(event => {
      const data = event.data.data();
      data.roomId = event.params.roomId;
      data.messageId = event.params.messageId;
      let body = '*New Message*\n';
      body += `Room Id:${data.roomId}\n`;
      body += `Message Id:${data.messageId}\n`;
      body += `Message Type:${data.messageType}\n`;
      if (data.text) {
        body += `Text:${data.text}\n`;
      }
      if (data.image) {
        body += `Image:${data.image}\n`;
      }
      if (data.requestId) {
        body += `RequestId:${data.requestId}\n`;
      }
      if (data.price) {
        body += '見積り詳細\n';
        body += `料金:${data.price}\n`;
        body += `利用開始日:${data.startDate}\n`;
        body += `利用終了日:${data.endDate}\n`;
      }
      sendSlackMessage(body);
    }),
};
