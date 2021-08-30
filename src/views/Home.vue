<template>
  <div>
    <NavBar />
    <div class="container-fluid pt-3">
      <div class="row mb-3">
        <div class="col d-flex justify-content-start align-items-center">
          <h3>Задачи ({{ getTodosCount }})</h3>
        </div>
        <div class="col d-flex justify-content-end align-items-center">
          <b-button variant="outline-primary" v-b-modal.add-task
            >Создать</b-button
          >
        </div>
      </div>
      <div class="row">
        <div class="col d-flex justify-content-end pb-3">
          <span class="mr-1">Отображать на странице по </span>
          <b-form-select
            v-model="perPage"
            :options="options"
            @change="updateListTodos"
          ></b-form-select>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <h6>Закрытые</h6>
          <div class="row-body">
            <div v-for="item in getTodos" :key="item._id">
              <b-card
                v-if="item.completed"
                :title="item.title"
                tag="article"
                class="mb-2"
              >
                <b-card-text>
                  Дата: {{ dateFormat(item.created) }}
                </b-card-text>
                <div class="d-flex">
                  <div class="mr-1">
                    <b-button
                      size="sm"
                      variant="primary"
                      v-b-tooltip.hover
                      title="Подробнее"
                      v-b-modal.update-task
                      @click="
                        setCurrentTodos(item.title, item.completed, item._id)
                      "
                      ><b-icon icon="eye" style="color: #ffffff;"></b-icon
                    ></b-button>
                  </div>
                  <div class="mr-1">
                    <b-button
                      size="sm"
                      variant="danger"
                      v-b-tooltip.hover
                      title="Удалить"
                      @click="deleteTodos(item._id)"
                      ><b-icon icon="x" style="color: #ffffff;"></b-icon
                    ></b-button>
                  </div>
                </div>
              </b-card>
            </div>
            <div v-if="checkStatus(true) == 0" class="card empty-card">
              В этой категории нет задач
            </div>
          </div>
        </div>
        <div class="col-4">
          <h6>В работе</h6>
          <div class="row-body">
            <div v-for="item in getTodos" :key="item._id">
              <b-card
                v-if="!item.completed"
                :title="item.title"
                tag="article"
                class="mb-2"
              >
                <b-card-text>
                  Дата: {{ dateFormat(item.created) }}
                </b-card-text>
                <div class="d-flex">
                  <div class="mr-1">
                    <b-button
                      size="sm"
                      variant="primary"
                      v-b-tooltip.hover
                      title="Подробнее"
                      v-b-modal.update-task
                      @click="
                        setCurrentTodos(item.title, item.status, item._id)
                      "
                      ><b-icon icon="eye" style="color: #ffffff;"></b-icon
                    ></b-button>
                  </div>
                  <div class="mr-1">
                    <b-button
                      size="sm"
                      variant="danger"
                      v-b-tooltip.hover
                      title="Удалить"
                      @click="deleteTodos(item._id)"
                      ><b-icon icon="x" style="color: #ffffff;"></b-icon
                    ></b-button>
                  </div>
                </div>
              </b-card>
            </div>
            <div v-if="checkStatus(false) == 0" class="card empty-card">
              В этой категории нет задач
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="getTodosCount > perPage">
        <div class="col d-flex justify-content-center pt-5 pb-5">
          <b-pagination-nav
            :link-gen="linkGen"
            :number-of-pages="Math.ceil(getTodosCount / perPage)"
            @click.native="updateListTodos"
            use-router
          ></b-pagination-nav>
        </div>
      </div>
    </div>
    <CreateModalTask />
    <UpdateModalTask
      :currentTitle="currentTitle"
      :currentStatus="currentStatus"
      :currentId="currentId"
    />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import CreateModalTask from '@/components/CreateModalTask'
import UpdateModalTask from '@/components/UpdateModalTask'
import paginationMixin from '@/mixins/pagination.mixin'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: { NavBar, CreateModalTask, UpdateModalTask },
  mixins: [paginationMixin],
  data: () => ({
    currentTitle: '',
    currentStatus: false,
    currentId: '',
  }),
  computed: {
    ...mapGetters(['getTodos', 'getTodosCount']),
  },
  async mounted() {
    await this.updateListTodos()
  },
  methods: {
    async updateListTodos() {
      this.checkNumberPage()
      await this.$store.dispatch('fetchTodos', [
        this.currentPage * this.perPage,
        this.perPage,
      ])
    },
    async deleteTodos(id) {
      await this.$store.dispatch('deleteTodos', [
        id,
        this.currentPage * this.perPage,
        this.perPage,
      ])
    },
    checkStatus(value) {
      if (this.getTodos) {
        return this.getTodos.filter((el) => el.completed == value).length
      }
    },
    setCurrentTodos(title, status, id) {
      this.currentTitle = title
      this.currentStatus = status
      this.currentId = id
    },
    dateFormat(date) {
      let days = new Date(date).toLocaleDateString()
      let time = new Date(date).toLocaleTimeString().slice(0, -3)
      return `${days} (${time})`
    },
  },
}
</script>

<style scoped>
.row-body {
  background: #f6f6f6;
  border-radius: 5px;
  padding: 10px;
}
.mr-1 {
  margin-right: 1rem;
}
.empty-card {
  background: #ffffff;
  padding: 0.5rem;
  border-radius: 5px;
}
</style>
