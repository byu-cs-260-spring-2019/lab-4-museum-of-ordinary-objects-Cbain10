var app = new Vue({
  el: '#admin',
  data: {
    items: [],
    findTitle: "",
    findItem: null,
    title: "",
    description: "",
    selected:  "",
    addItem: null,
    photos: [
      {name: 'baseball', id: 1, path: '/images/baseball.jpg'},
      {name: 'car', id: 2, path: '/images/car.jpg'},
      {name: 'glasses', id: 3, path: '/images/glasses.jpg'},
      {name: 'paintbrush', id: 4, path: '/images/paintbrush.jpg'},
      {name: 'pen', id: 5, path: '/images/pen.jpg'},
      {name: 'scissors', id: 6, path: '/images/scissors.jpg'},
      {name: 'shovel', id: 7, path: '/images/shovel.jpg'},
      {name: 'slinky', id: 8, path: '/images/slinky.jpg'},
    ],
  },
  created() {
    this.getItems();
  },
  methods: {
    async addNewItem(){
      try {
        console.log(this.title);
        console.log(this.selected);
        console.log(this.selected.path);
        let result = await axios.post('/api/items', {
          title: this.title,
          path: this.selected.path,
          description: this.description
        });


        this.addItem = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        let response = await axios.delete("/api/items/" + item.id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        let response = await axios.put("/api/items/" + item.id, {
          title: this.findItem.title,
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },

  },
  computed: {
    suggestions() {
      return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    }
  },
});