<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <b-alert v-model="showDismissibleAlert" variant="danger">
          Что-то пошло не так! Попробуйте еще раз!
        </b-alert>
        <form
          @submit.prevent="autorization"
          class="card bg-light border-3 mb-3 p-5"
        >
          <h4 class="mb-4 text-center">
            <b>Войти</b>
          </h4>
          <b-form-input
            v-model.trim="email"
            placeholder="E-mail"
            type="email"
            :state="!$v.email.$error ? null : false"
          ></b-form-input>
          <small class="mb-3 text-left">Введите корректный e-mail</small>
          <b-form-input
            v-model.trim="password"
            placeholder="Пароль"
            type="password"
            :state="!$v.password.$error ? null : false"
          ></b-form-input>
          <small class="mb-3 text-left">Мин. 3 Макс. 30 символов</small>
          <b-button variant="outline-primary" type="submit">Войти</b-button>
        </form>
        <div class="text-center">
          <router-link to="/registration" class="text-center"
            >Регистрация</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { email, required, minLength, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
  name: 'Autorization',
  data: () => ({
    firstName: '',
    secondName: '',
    email: '',
    password: '',
    showDismissibleAlert: false,
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(3), maxLength: maxLength(30) },
  },
  methods: {
    async autorization() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      let field = {
        email: this.email,
        password: this.password,
        first_name: this.firstName,
        last_name: this.secondName,
      }
      try {
        await axios.post('/auth/', field)
        localStorage.setItem('auth', true)
        this.$router.push('/')
      } catch (err) {
        this.showDismissibleAlert = true
        setTimeout(() => {
          this.showDismissibleAlert = false
        }, 2000)
      }
    },
  },
}
</script>
