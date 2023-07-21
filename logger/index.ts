class Logger {
  private getDateTime(): string {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;
    return dateTime;
  }
  log(type: string, message: string, service: string) {
    switch(type) {
      case "message":
        console.log(`${service} |`, `${"<" + (this.getDateTime()) + ">"}`, message);
        break;
      case "error":
        console.error(`${service} |`, `${"<" + (this.getDateTime()) + ">"}`, message);
        break;
    }
  }
}

export default new Logger();