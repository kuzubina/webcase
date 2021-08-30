<template>
  <div class="container-fluid bg-info text-white pt-4 pb-4">
    <div class="row">
      <div class="col-3 d-flex justify-content-start align-items-center">
        <h3>Dashboard</h3>
      </div>
      <div class="col-6 d-flex justify-content-center align-items-center">
        <form @submit.prevent="searchTodos()" style="width: 100%">
          <b-form-input placeholder="Поиск" v-model="search"></b-form-input>
          <b-button
            variant="outline-light"
            size="sm"
            class="clear-btn"
            @click="clearSearch"
            v-show="search.length"
            ><b-icon icon="x" style="color: #000000;"></b-icon
          ></b-button>
        </form>
      </div>
      <div class="col-3 d-flex justify-content-end">
        <b-button variant="dark" @click="logout"
          >Выход <b-icon icon="box-arrow-right" style="color: #ffffff;"></b-icon
        ></b-button>
      </div>
    </div>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
export default {
  name: 'NavBar',
  mixins: [paginationMixin],
  data: () => ({
    search: '',
  }),
  methods: {
    logout() {
      localStorage.removeItem('auth')
      this.$router.push('/login')
    },
    async searchTodos() {
      await this.$store.dispatch('searchTodos', this.search)
    },
    async clearSearch() {
      this.$router.replace({ query: null })
      await this.$store.dispatch('fetchTodos', [
        this.currentPage * this.perPage,
        this.perPage,
      ])
      this.search = ''
    },
  },
}
</script>

<style scoped>
form {
  position: relative;
}
.clear-btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  transition: all 0.2s;
}
</style>
