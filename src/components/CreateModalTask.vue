<template>
  <div>
    <b-modal id="add-task" class="mb-3" title="Добавить задачу" @ok="handleOk">
      <b-form-group label="Заголовок" label-for="title">
        <b-form-input
          id="title"
          v-model.trim="title"
          :state="!$v.title.$error ? null : false"
        ></b-form-input>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import paginationMixin from '@/mixins/pagination.mixin'
export default {
  name: 'CreateModalTask',
  mixins: [paginationMixin],
  data: () => ({
    title: '',
  }),
  validations: {
    title: { required, minLength: minLength(3) },
  },
  methods: {
    async handleOk(bvModalEvt) {
      if (this.$v.$invalid) {
        this.$v.$touch()
        bvModalEvt.preventDefault()
      }
      let fields = { title: this.title }
      await this.$store.dispatch('addTodos', [
        fields,
        this.currentPage * this.perPage,
        this.perPage,
      ])
      this.title = ''
      if (this.$route.query.page) {
        this.$router.replace({ query: null })
      }
    },
  },
}
</script>
