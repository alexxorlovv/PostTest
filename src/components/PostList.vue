<template>
<div class="container">
<div class="row  justify-content-center">
  <div class="col">
    <br><br>
    <h1>POSTS <button class="btn btn-primary" v-b-modal.add>Add</button></h1>
    <table class="table">
      <thead class="thead">
      <tr>
        <td>ID</td>
        <td>Title</td>
        <td>Actions</td>
      </tr> </thead>
      <tbody>
        <tr v-if="posts.length === 0"><td colspan="3">Нет записей</td></tr>
        <PostItem   v-for="(post,index) in posts" :data="post" :index="index" :key="index"></PostItem>
      </tbody>

    </table>
  </div></div>

    <b-modal id="add" title="Add post" v-model="modal" @ok="add">
      <input placeholder="Title" type="text" class="my-form" v-model="post.title"><br>
      <textarea placeholder="Text body" style="height:260px;" class="my-form" v-model="post.body"></textarea>
  </b-modal>


  </div>
</template>

<script>
import PostItem from "./PostItem";
import { mapState } from 'vuex';
export default {
  name: 'PostList',
  data () {
    return {
      post: {
        title:"",
        body: ""
      },
      modal: false
    }
  },
  computed: mapState({
    // стрелочные функции позволяют писать код очень лаконично
    posts: state => state.posts.posts,
  }),

  methods: {
    add(evt){
      evt.preventDefault()
      this.$store.dispatch("addPost",{data:this.post}).then(()=>{
        this.handleSubmit()
      })

    },
    handleSubmit () {
      this.post.title = ""
      this.post.body = ""
      this.modal = false
    }
  },
  created(){
    this.$store.dispatch("getPosts")
  },
  components: {PostItem}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.thead {
  background:gray;
  color:white;
}
.post{

}

.my-form{
  margin-bottom:30px;
  width:100%;
}
</style>
