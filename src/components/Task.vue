<template>
  <div class="task" :class="{ 'task--checked': task.checked }">
    <div class="task-editor" v-if="task.editing">
      <div class="task-editor__title">
        <input
          class="task-editor__control"
          type="text"
          v-model="task.title"
          placeholder="Заголовок"
        />
      </div>

      <div class="task-editor__description">
        <textarea
          class="task-editor__control"
          type="text"
          placeholder="Описание"
          v-model="task.description"
        ></textarea>
      </div>
    </div>

    <div class="task-view" v-else>
      <div class="task__checked">
        <label>
          <input type="checkbox" :checked="task.checked" @change="toggle" />
          <span>&check;</span>
        </label>
      </div>

      <h2 class="task__title">{{ task.title }}</h2>

      <div v-if="task.description" class="task__description">
        {{ task.description }}
      </div>
    </div>

    <div class="task__remove">
      <button type="button" @click="remove">
        &times;
      </button>
    </div>

    <div class="task__action">
      <button v-if="task.editing" type="button" @click="save">
        Сохранить
      </button>

      <button v-if="!task.editing" type="button" @click="task.editing = true">
        Изменить
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.task {
  width: 100%;
  background: var(--accent-color-light);
  color: var(--main-color);
  border-radius: 8px;
  padding: 0px 10px 16px;
  margin-bottom: 2rem;

  position: relative;

  &__remove {
    position: absolute;
    top: -18px;
    right: -5px;
    padding: 4px;
    background: var(--main-color);
    border-radius: 4px;

    button {
      width: 36px;
      height: 36px;
      font-size: 24px;
      background: var(--accent-color);
      color: var(--main-color);
      border-radius: 4px;
    }
  }

  &__action {
    button {
      height: 36px;
      font-size: 0.75rem;
      padding: 5px 15px;
      background: var(--main-color);
      color: var(--accent-color);
      border-radius: 4px;
      width: 100%;
      margin-top: 16px;
    }
  }

  &-editor {
    padding-top: 35px;
    position: relative;

    &__title,
    &__description {
      .task-editor__control {
        margin-bottom: 1rem;
        width: 100%;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 4px;
        font-size: 1rem;
        font-family: inherit;
        background: var(--main-color);
        color: var(--accent-color);

        &::placeholder {
          color: var(--accent-color);
          opacity: 0.7;
        }

        &,
        &:hover {
          border: none;
          outline: none;
        }
      }
    }

    &__title {
    }

    &__description {
      .task-editor__control {
        padding-top: 15px;
        padding-bottom: 15px;
        height: 100px;
      }
    }

    &__save {
      padding: 5px 15px;
      height: 36px;
      background-color: var(--main-color);
      color: var(--accent-color);
      font-size: 0.85rem;
    }
  }

  &-view {
    padding-top: 35px;
  }

  .task__checked {
    position: absolute;
    left: -5px;
    top: -15px;

    background: var(--main-color);
    padding: 4px;
    border-radius: 4px;

    input {
      display: none;
    }

    label {
      input + span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 2px;
        border: 2px solid var(--accent-color);
        font-size: 0;
      }

      input:checked + span {
        font-size: 24px;
        line-height: 1;
        color: var(--accent-color);
      }
    }

    input {
      background: var(--main-color);
      color: var(--accent-color);
      font-size: 24px;
      margin-right: 12px;
    }
  }

  .task__title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.75em;
  }
}
</style>

<script>
export default {
  props: ['task'],
  methods: {
    toggle() {
      this.task.checked = !this.task.checked;
      this.$emit('change');
    },
    save() {
      if (!this.task.title) return;

      this.task.editing = false;
      this.$emit('change');
    },
    remove() {
      this.$emit('remove');
    }
  }
};
</script>
