import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
const api = "https://vue3-course-api.hexschool.io/v2/";
const path = "j437437";

createApp({
  data() {
    return {
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    // 驗證登入狀態，成功的話執行 getData()，失敗的話回到登入頁面
    checkAdmin() {
      axios
        .post(`${api}/api/user/check`)
        .then((res) => {
          console.log(res.data);
          this.getData();
        })
        .catch((err) => {
          console.dir(err);
          alert("請重新登入");
          window.location = "login.html";
        });
    },
    getData() {
      axios
        .get(`${api}/api/${path}/admin/products`)
        .then((res) => {
          console.log(res.data.products);
          this.products = res.data.products;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    openProduct(item) {
      this.tempProduct = item;
    },
  },
  mounted() {
    //從cookie取出token並讓axios發請求時都預設載入
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },
}).mount("#app");
