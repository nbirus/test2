import Slack from 'slack'
const slack = new Slack(process.env.VUE_APP_SLACK_HOOK);

export function sendSlack(message, user = 'No User Given') {
  slack.send({
    text: `${user}: ${message}`,
    channel: '#test',
    username: 'UI Feedback Bot'
  });
}
