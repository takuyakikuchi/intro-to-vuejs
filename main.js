// ------------------- Product --------------------
Vue.component("product", {
  template: `
  <div>
    <div class="card md:flex">

      <img class="card__img w-64 shadow-md rounded-sm" 
          :src="variables[displayItem].img" 
          :class="{'card__img--inactive': !variables[displayItem].hasStock}">
      </img>

      <div class="card__info py-4 px-6 w-full flex flex-col justify-between">

        <div class="product-info">
          <p class="text-2xl">{{ name }}</p>

          <div class="flex">
            <div v-for="(color, index) in colors" 
                :style="{ backgroundColor: color }"
                class="w-8 h-8 m-1"
                @mouseover="changeItem(index)">
            </div>
          </div>

          <ul v-for="material in materials">
            <li class="text-sm">{{ material }}</li>
          </ul>

        </div>  

        <div class="cart-button">
          <button class="bg-blue-500 hover:bg-blue-700
                        text-white font-bold
                        py-2 px-4
                        rounded-full
                        self-end"
                  @click="addToCart"
                  :disabled="!variables[displayItem].hasStock"
                  :class="{'button--disabled': !variables[displayItem].hasStock}"
          >
            <span v-if="variables[displayItem].hasStock">Add to Cart</span>
            <span v-else>Sold out</span> 
          </button>
        </div>
      </div>
    </div>

    <product-review></product-review>
  </div>
  `,
  data() {
    return {
      name: "Vue-Mastery Socks",
      materials: ["80% cotton", "20% polyester", "Gender-neutral"],
      variables: [
        {
          img:
            "https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
          hasStock: true,
          color: "#344861",
        },
        {
          img:
            "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
          hasStock: false,
          color: "#339E68",
        },
      ],
      displayItem: 0,
    };
  },
  computed: {
    colors() {
      return this.variables.map((item) => item.color);
    },
  },
  methods: {
    changeItem(index) {
      this.displayItem = index;
    },
    addToCart() {
      this.$emit("add-to-cart", this.variables[this.displayItem].color);
    },
  },
});

// ------------------- Product Review --------------------
Vue.component("product-review", {
  template: `
    <div class="w-full h-full
                border-t mt-8 p-4
    ">
      <ul v-for="review in reviews">
        <li>{{ review.rating }} <i class="fas fa-star"></i> {{ review.review }} ({{ review.name }})</{{></li>
      </ul>
    </div>
  `,
  data() {
    return {
      reviews: [
        {
          name: "TK",
          review: "This is a sample review",
          rating: 5,
        },
      ],
    };
  },
});

// ------------------- Cart--------------------
Vue.component("cart", {
  props: {
    cart: {
      type: Array,
    },
  },
  template: `
    <div class="rounded-sm
                bg-blue-500 hover:bg-blue-700
                text-white font-bold
                w-16 h-8 m-2
                flex justify-center
    ">
      <span class="py-1"><i class="fas fa-shopping-cart"></i> {{cart.length}}</span>
    </div>
  `,
});

const app = new Vue({
  el: "#app",
  data: {
    cart: [],
  },
  methods: {
    updateCart(color) {
      this.cart.push(color);
    },
  },
});
