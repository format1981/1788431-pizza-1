<template>
  <form
    method="post"
    class="address-form address-form--opened sheet"
  >
    <div class="address-form__header">
      <b>Адрес №1</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <AppInput
          ref="name"
          v-model="addressDraft.name"
          name="name"
          class="input"
          placeholder="Название адреса*"
          :error-text="validations.name.error"
          data-test="address-name"
        />
      </div>
      <div class="address-form__input">
        <AppInput
          ref="street"
          v-model="addressDraft.street"
          name="street"
          class="input"
          placeholder="Введите название улицы*"
          :error-text="validations.street.error"
          data-test="address-street"
        />
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <AppInput
          ref="building"
          v-model="addressDraft.building"
          name="building"
          class="input"
          placeholder="Дом*"
          :error-text="validations.building.error"
          data-test="address-building"
        />
      </div>
      <div class="address-form__input address-form__input--size--small">
        <AppInput
          ref="flat"
          v-model="addressDraft.flat"
          name="addr-apartment"
          class="input"
          placeholder="Квартира"
          data-test="address-flat"
        />
      </div>
      <div class="address-form__input">
        <AppInput
          ref="comment"
          v-model="addressDraft.comment"
          name="comment"
          class="input"
          placeholder="Введите комментарий"
          data-test="address-comment"
        />
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        v-if="addressDraft.id"
        type="button"
        class="button button--transparent"
        data-test="address-delete"
        @click="onDeleteAddressClick(addressDraft)"
      >
        Удалить
      </button>
      <button
        type="submit"
        class="button"
        data-test="address-save"
        @click.prevent="onSaveAddressClick(addressDraft)"
      >
        Сохранить
      </button>
    </div>
  </form>
</template>

<script>
import { validator } from "@/common/mixins";
import { mapActions } from "vuex";

export default {
  name: "UserDataAddressForm",
  mixins: [validator],
  props: {
    address: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      validations: {
        name: {
          error: "",
          rules: ["required"],
        },

        street: {
          error: "",
          rules: ["required"],
        },

        building: {
          error: "",
          rules: ["required"],
        },
      },

      addressDraft: { ...this.address },
    };
  },

  watch: {
    "address.name"() {
      this.$clearValidationErrors();
    },

    "address.street"() {
      this.$clearValidationErrors();
    },

    "address.building"() {
      this.$clearValidationErrors();
    },
  },

  methods: {
    ...mapActions("Addresses", ["delete"]),
    async onDeleteAddressClick(address) {
      await this.delete(address);
      this.$notifier.success("Адрес удален");
    },

    async onSaveAddressClick(address) {
      if (
        !this.$validateFields(
          {
            name: address.name,
            street: address.street,
            building: address.building,
          },
          this.validations
        )
      ) {
        return;
      }
      this.$emit("save", address);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/address-form.scss";
@import "~@/assets/scss/blocks/button.scss";
</style>
