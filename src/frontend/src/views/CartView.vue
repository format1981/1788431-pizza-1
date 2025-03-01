<template>
  <form class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">
            Корзина
          </h1>
        </div>

        <div
          v-if="!pizzasCount"
          class="sheet cart__empty"
          data-test="cart-message"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <template v-if="pizzasCount">
          <PizzasList data-test="cart-pizza-list" />
        </template>

        <Misc />

        <div class="cart__form">
          <div class="cart-form">
            <label
              class="cart-form__select"
              style="margin-bottom: 20px"
            >
              <span class="cart-form__label">Получение заказа:</span>

              <select
                v-model="address"
                name="address"
                class="select"
                data-test="cart-address"
              >
                <option value="self">Заберу сам</option>
                <option value="new">Новый адрес</option>
                <option
                  v-for="addr in addresses"
                  :key="addr.id"
                  :value="addr.id"
                >
                  {{ addr.name }}
                </option>
              </select>
            </label>

            <label
              class="input input--big-label"
              style="margin-bottom: 20px"
            >
              <span>Контактный телефон:</span>
              <input
                v-model="phone"
                type="text"
                name="tel"
                placeholder="+7 999-999-99-99"
              />
            </label>

            <div
              v-if="address === 'new'"
              class="cart-form__address"
              data-test="cart-address-form"
            >
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input
                    v-model="tempAddress.street"
                    type="text"
                    name="street"
                    data-test="cart-address-street"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input
                    v-model="tempAddress.building"
                    type="text"
                    name="house"
                    data-test="cart-address-building"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input
                    v-model="tempAddress.flat"
                    type="text"
                    name="apartment"
                    data-test="cart-address-flat"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link
          to="/"
          class="button button--border button--arrow"
        >
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b data-test="cart-price">Итого: {{ totalPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button
          :disabled="!totalPrice"
          class="button"
          :class="{ 'button--disabled': !totalPrice }"
          data-test="cart-order-button"
          @click.prevent="onOrderClick"
        >
          Оформить заказ
        </button>
      </div>
    </section>
  </form>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import PizzasList from "@/modules/cart/components/CartPizzasList";
import Misc from "@/modules/cart/components/CartMiscList";

export default {
  name: "CartView",
  components: {
    PizzasList,
    Misc,
  },

  data() {
    return {
      address: "self",
      tempAddress: {},
      phone: "",
    };
  },

  computed: {
    ...mapGetters("Cart", [
      "pizzasCount",
      "totalPrice",
      "pizzasForOrder",
      "miscForOrder",
    ]),

    ...mapGetters("Addresses", { getAddressById: "getById" }),
    ...mapState("Addresses", {
      addresses: (state) => state.addresses,
    }),

    ...mapState("Auth", {
      isAuthenticated: (state) => state.isAuthenticated,
      user: (state) => state.user,
    }),
  },

  async created() {
    await this.fetchMiscData();
    if (this.isAuthenticated) {
      await this.fetchAddresses();
    }
  },

  methods: {
    ...mapActions("Cart", ["fetchMiscData", "makeOrder", "resetCart"]),
    ...mapActions("Addresses", { fetchAddresses: "fetch" }),
    ...mapActions("Orders", { createOrder: "create" }),
    ...mapActions("App", ["showThanx"]),
    async onOrderClick() {
      let address;
      if (this.address === "self") {
        address = null;
      } else if (this.address === "new") {
        address = this.tempAddress;
      } else {
        address = this.getAddressById(this.address);
      }

      const userId = this.user ? this.user.id : null;

      await this.createOrder({
        userId: userId,
        phone: this.phone,
        address: address,
        pizzas: this.pizzasForOrder,
        misc: this.miscForOrder,
      });
      this.showThanx();
      this.resetCart();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/cart.scss";
@import "~@/assets/scss/blocks/cart-form.scss";
@import "~@/assets/scss/blocks/select.scss";
@import "~@/assets/scss/blocks/input.scss";
@import "~@/assets/scss/blocks/footer.scss";
@import "~@/assets/scss/blocks/button.scss";
@import "~@/assets/scss/blocks/title.scss";
</style>
