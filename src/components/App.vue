<template>
  <div class="app">
    <div class="app-header">
      <h1>Список дел</h1>
    </div>

    <button class="app__add-item" type="button" @click="addItem">
      Новое дело
    </button>

    <div v-if="items.length == 0" class="empty-message">
      Список пуст
    </div>

    <div class="list">
      <Task
        v-for="item in items"
        :key="item.id"
        :task="item"
        v-on:remove="removeItem(item)"
        v-on:change="saveData()"
      >
      </Task>
    </div>

    <button
      v-if="items.length > 1"
      class="app__add-item"
      type="button"
      @click="addItem"
    >
      Новое дело
    </button>
  </div>
</template>

<style lang="scss">
.app {
  padding: 25px 10px;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    h1 {
      margin: 0;
      padding: 0;
      text-align: center;
      margin-bottom: 25px;
      text-transform: uppercase;
    }
  }

  &__add-item {
    height: 36px;
    margin-bottom: 48px;
    width: 100%;
    background: var(--accent-color-light);
    color: var(--main-color);
    font-size: 1rem;
    font-weight: bold;
  }

  .empty-message {
    text-align: center;
  }

  .list {
    margin-bottom: 24px;
  }
}
</style>

<script>
import Task from './Task.vue';
import {TaskModel} from '../models/task';

const localStorageKey = 'tasks-list-data';

export default {
  components: { Task },
  created() {
    let items = localStorage.getItem(localStorageKey);
    if (items) {
      this.items = JSON.parse(items).map((item) => new TaskModel(item));
    }
  },
  data() {
    return {
      items: [],
      active: null
    };
  },
  methods: {
    addItem() {

      this.items.push(new TaskModel());
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      });

      this.saveData();
    },
    removeItemFromList(item) {
      let index = this.items.indexOf(item);
      this.items.splice(index, 1);
    },
    removeItem(item) {
      navigator.notification.confirm(
        `Дело ${item.title} будет удалено навсегда`,
        (buttonIndex) => {
          if (buttonIndex == 1) {
            this.removeItemFromList(item);
            item.dispose();

            this.saveData();
          }
        },
        'Подтвердите удаление',
        ['Удалить', 'Отменить']
      );
    },
    saveData() {
      let items = JSON.stringify(this.items.map(i => i.getData()));
      localStorage.setItem(localStorageKey, items);
    }
  }
};
</script>
