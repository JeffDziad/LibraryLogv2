import LogSession from "src/models/LogSession";

export default class ReadingLog {
  constructor() {
    this.readingSessions = [];
    this.currentSession = null;
  }
  startSession() {
    this.currentSession = new LogSession();
  }
}
