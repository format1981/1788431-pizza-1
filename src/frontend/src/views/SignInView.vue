<template>
  <div class="sign-form">
    <a
      href="#"
      class="close close--white"
    >
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">
        Авторизуйтесь на сайте
      </h1>
    </div>
    <form>
      <div class="sign-form__input">
        <label class="input">
          <AppInput
            ref="email"
            v-model="email"
            type="email"
            name="email"
            class="input"
            placeholder="E-mail"
            :error-text="validations.email.error"
            data-test="signin-email"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <AppInput
            v-model="password"
            type="password"
            name="password"
            class="input"
            placeholder="Пароль"
            :error-text="validations.password.error"
            data-test="signin-password"
          />
        </label>
      </div>
      <button
        class="button"
        data-test="signin-button"
        @click.prevent="onSubmit"
      >
        Авторизоваться
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { validator } from "@/common/mixins";
import AppInput from "@/common/components/AppInput";

export default {
  name: "SignInView",
  components: { AppInput },
  mixins: [validator],
  data: () => ({
    email: "",
    password: "",
    validations: {
      email: {
        error: "",
        rules: ["required", "email"],
      },

      password: {
        error: "",
        rules: ["required"],
      },
    },
  }),

  watch: {
    email() {
      this.$clearValidationErrors();
    },

    password() {
      this.$clearValidationErrors();
    },
  },

  mounted() {
    this.$refs.email.$refs.input.focus();
  },

  methods: {
    ...mapActions("Auth", ["login"]),
    async onSubmit() {
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        return;
      }
      await this.login({ email: this.email, password: this.password });
      await this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/button.scss";
@import "~@/assets/scss/blocks/title.scss";
</style>
