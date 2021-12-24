import * as chalk from 'chalk';

export enum MessageType {
  SUCCESS,
  ERROR,
  INFO,
}

export function printMsg(msg: string, messageType?: MessageType): void {
  let chalkFunc: chalk.Chalk;
  switch (messageType) {
    case MessageType.SUCCESS:
      chalkFunc = chalk.green;
      break;
    case MessageType.ERROR:
      chalkFunc = chalk.red;
      break;
    default:
      chalkFunc = chalk.white;
      break;
  }
  console.log(chalkFunc(msg));
}
