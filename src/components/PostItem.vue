<template>
  <tr class="post">
    <td>{{data.id}}</td>
    <td>{{data.title}}</td>
    <td><button @click="changeModal" class="btn btn-primary">Change</button> <button @click="deletePost" class="btn btn-danger">Delete</button></td>
        <b-modal title="Change post" v-model="modal" @ok="changePost">
      <input placeholder="Title" type="text" class="my-form" v-model="data.title"><br>
      <textarea placeholder="Text body" style="height:260px;" class="my-form" v-model="data.body"></textarea>
  </b-modal>

  </tr>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props:["data", "index"],
  name: 'PostItem',
  data () {
    return {
      modal: false
      //msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    changePost(evt){
      evt.preventDefault()
      this.$store.dispatch("updatePost",{data:this.data,index:this.index}).then(()=>{
        this.modal = false
      })
    },
    deletePost(){
       this.$store.dispatch("removePost",{index: this.index, data:this.data})
    },
    changeModal() {
      this.modal = true
    }
  },
  created(){
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-form{
  margin-bottom:30px;
  width:100%;
}
</style>
