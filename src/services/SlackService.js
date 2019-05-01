import Slack from 'slack'
const slack = new Slack(process.env.VUE_APP_SLACK_HOOK);

/**
 * Post a message to the developer slack channel
 * @param {string} message
 * @param {string} user
 */
export function sendSlack(message, user = 'No User Given') {
  slack.send({
    text: `${user}: ${message}`,
    channel: '#test',
    username: 'UI Feedback Bot'
  });
}
