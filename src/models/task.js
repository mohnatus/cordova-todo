export class TaskModel {
  constructor(data = {}) {
    this.title = data.title || '';
    this.description = data.description || '';
    this.time = data.time || null;
    this.checked = data.checked;
    this.editing = data.editing;
    this.notificationId = parseInt(data.notificationId) || '';
    this.expired = false;

    if (this.time) {
      if (this.time < Date.now()) {
        this.expired = true;
        this.removeNotification();
      }
    }
  }

  setTime(time) {
    this.time = time;
    if (time && time < Date.now()) {
      this.expired = true;
    } else {
      this.expired = false;
    }
  }

  removeNotification() {
    if (this.notificationId) {
      cordova.plugins.notification.local.cancel(this.notificationId);
    }
  }

  setNotification() {
    if (this.time) {
      const config = {
        id: this.notificationId,
        title: 'Есть дело: ' + this.title,
        text: this.description,
        group: 'todo',
        trigger: {
          at: new Date(this.time)
        },
        foreground: true
      };

      cordova.plugins.notification.local.schedule(config);
    }
  }

  dispose() {
    this.removeNotification();
    this.time = '';
  }

  getData() {
    return {
      title: this.title,
      description: this.description,
      time: this.time,
      notificationId: this.notificationId,
      checked: this.checked
    }
  }
}
