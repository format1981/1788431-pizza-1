<template>
  <ul class="cart-list sheet">
    <li
      v-for="(pizza, pizzaIndex) in pizzas"
      :key="pizzaIndex"
      class="cart-list__item"
      data-test="list-item"
    >
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          alt="Капричоза"
        />
        <div class="product__text">
          <h2 data-test="name">
            {{ pizza.pizzaName }}
          </h2>
          <ul>
            <li data-test="size">
              {{ pizza.humanize.size }}, {{ pizza.humanize.dough }}
            </li>
            <li data-test="sauce">
              Соус: {{ pizza.humanize.sauce }}
            </li>
            <li data-test="ingredients">
              Начинка: {{ pizza.humanize.ingredients }}
            </li>
          </ul>
        </div>
      </div>

      <ItemCounter
        additional-class="cart-list__counter"
        additional-button-class="counter__button--orange"
        :value="pizza.count"
        @change="onChange(pizza.id, $event)"
      />

      <div
        class="cart-list__price"
        data-test="price"
      >
        <b>{{ pizza.price * pizza.count }} ₽</b>
      </div>

      <div class="cart-list__button">
        <router-link
          class="cart-list__edit"
          :to="{
            name: 'Builder',
            params: { pizzaIdToEdit: pizza.id },
          }"
        >
          Изменить
        </router-link>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "CartPizzasList",
  components: {
    ItemCounter,
  },

  computed: {
    ...mapGetters("Cart", ["pizzas"]),
  },

  methods: {
    ...mapActions("Cart", ["changeCount"]),
    onChange(id, delta) {
      this.changeCount({ id, delta });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/cart-list.scss";
@import "~@/assets/scss/blocks/product.scss";
</style>
