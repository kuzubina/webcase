<template>
  <div>
    <b-modal
      id="update-task"
      class="mb-3"
      title="Обновить задачу"
      @show="renderModal"
      @ok="handleOk"
    >
      <h6 class="text-center mb-2 error-msg" v-if="editStatus">
        Нет изменений
      </h6>
      <b-form-group label="Заголовок" label-for="title" class="mb-2">
        <b-form-input
          id="title"
          v-model="newTitle"
          :state="!$v.title.$error ? null : false"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Статус">
        <b-form-radio v-model="newStatus" :value="true">Закрыть</b-form-radio>
        <b-form-radio v-model="newStatus" :value="false">В работе</b-form-radio>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import paginationMixin from '@/mixins/pagination.mixin'
export default {
  name: 'UpdateModalTask',
  props: {
    currentTitle: {
      type: String,
      required: true,
    },
    currentId: {
      type: String,
      required: true,
    },
    currentStatus: {
      type: Boolean,
      default: () => false,
    },
  },
  mixins: [paginationMixin],
  data: () => ({
    newTitle: '',
    newStatus: false,
    editStatus: false,
  }),
  validations: {
    title: { required, minLength: minLength(3) },
  },
  methods: {
    renderModal() {
      this.newTitle = this.currentTitle
      this.newStatus = this.currentStatus
    },
    async handleOk(bvModalEvt) {
      // if (this.$v.$invalid) {
      //   this.$v.$touch()
      //   bvModalEvt.preventDefault()
      // }
      if (
        this.newTitle == this.currentTitle &&
        this.newStatus == this.currentStatus
      ) {
        bvModalEvt.preventDefault()
        this.editStatus = true
        return
      }
      this.editStatus = false
      let fields = {
        title: this.newTitle,
        status: this.newStatus,
        id: this.currentId,
        paginationOffset: 0,
        paginationLimit: this.perPage,
      }
      await this.$store.dispatch('updateTodos', fields)
    },
  },
}
</script>

<style>
.custom-control-label {
  margin-left: 10px;
}
.error-msg {
  color: red;
}
</style>
