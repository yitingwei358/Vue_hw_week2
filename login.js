import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
const api = "https://vue3-course-api.hexschool.io/v2/";
const path = "j437437";

createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post(`${api}admin/signin`, this.user)
        .then((res) => {
          alert(res.data.message);
          //取出token存到cookie
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          //登入成功進到後台商品頁面
          window.location = "product.html";
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
}).mount("#app");
