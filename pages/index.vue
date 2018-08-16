<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        blank
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <p>{{ message }}</p>
        <p>{{ host }}</p>
        <button v-on:click="reverseMessage">Reverse Message</button>
      </div>
      <!-- <div>
  <ul> 
  <li v-for = "(item, index) in init" :key = "index"> 
  {{item.id}}: {{item.name}} 
  </li> 
  </ul>         
      </div> -->
  <div id="form">
    <div>
      <input type="text"
        v-model="newItem"
        @keyup.enter="addItem">
      <button  @click="addItem">
        Add Item
      </button>
    </div>
    <ul class="itemList">
      <li v-for="(item,index) in items" :key = "index">
        {{ item.name }} -
        <button @click="deleteItem(item)">
          Remove
        </button>
      </li>
    </ul>
  </div>      
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import {mapGetters} from 'vuex'
import db from '~/plugins/firebaseInit'

export default {
  components: {
    AppLogo
  },
  data: function() {
    return {
      message: 'HareKrishna',
      host : (process.server ? 'server' : 'client'),
        items: [],
        newItem: ''      
    }
  },  
    firestore() {
      return {
        items: db.collection('items'),
      }
    },
  methods: {
  reverseMessage: function () {
    this.message = this.message.split('').reverse().join('')
    },
      addItem: function() {
        this.$firestore.items.add(
          {
            name: this.newItem,
            timestamp: new Date()
          }
        );
        this.newItem = '';
      },
      deleteItem: function(item) {
        this.$firestore.items.doc(item['.key']).delete();
      }    
  },
 computed: { 
  ... mapGetters ({ 
  init: 'getItems' 
  }) 
  }   
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

