import { shallowMount } from "@vue/test-utils";
import PriceCounter from "@/modules/builder/components/PriceCounter.vue";
import { generateMockStore } from "@/store/mocks";
import { fillPizzaData } from "@/common/testHelpers";
import pizza from "@/static/pizza";
import Vue from "vue";

describe("PriceCounter.vue", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = shallowMount(PriceCounter, options);
  };

  beforeEach(() => {
    actions = {
      /*Builder: {
        saveSizeId: jest.fn(),
      },*/
    };
    store = generateMockStore(actions);
    fillPizzaData(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render price", () => {
    createComponent({ store });
    expect(wrapper.find("p").text()).toBe("Итого: 350 ₽");
  });

  it("should change price size change", async () => {
    createComponent({ store });
    store.commit("Builder/setSizeId", pizza.sizes[2].id);
    await Vue.nextTick();
    expect(wrapper.find("p").text()).toBe("Итого: 1050 ₽");
  });

  it("should change price ingredient change", async () => {
    createComponent({ store });
    store.dispatch("Builder/changeIngredient", { ingredientId: 1, delta: 1 });
    await Vue.nextTick();
    expect(wrapper.find("p").text()).toBe("Итого: 383 ₽");
  });
});
