export default class LogSession {
  constructor(startTime, pagesToRead) {
    this.startTime = startTime;
    this.pagesToRead = pagesToRead;
    this.pagesRead = 0;
    this.active = true;
    this.logEntries = [];
  }
}
