<template>
  <div class="container">
    <div>
      <table>
        <thead>
          <th @click.prevent="sortUsersBy('name')" >Name</th>
          <th @click.prevent="sortUsersBy('username')" >Username</th>
          <th @click.prevent="sortUsersBy('email')" >Email</th>
          <th @click.prevent="sortUsersBy('website')" >Website</th>
        </thead>
        <tbody>
          <tr v-for="user of myUsers" :key="user.id" >
            <td>
              <nuxt-link :to="{ name: 'user', params: { lang: 'en', id: user.id } }">
                {{user.name}}
              </nuxt-link>
            </td>
            <td> {{user.username}}</td>
            <td> {{user.email}}</td>
            <td> {{user.website}}</td>
            <button @click.prevent="onDelete(user.id)">
              Del
            </button>
          </tr>
        </tbody>
      </table>
      <button @click.prevent="onAdd">
        Add User
      </button>
    </div>
  </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
      data: () => ({
        nameSort: 'asc'
      }),
      computed: mapGetters({
          myUsers: 'users/users'
      }),
      created (){
          this.loadUsers()
      },
      methods: {
          ...mapActions({
            loadUsers: 'users/loadUsers',
            deleteUser: 'users/deleteUser',
            sortUsers: 'users/sortUsers'
          }),
          async onDelete ( id ) {
              try {
                  if (window.confirm('Delete this user?')) {
                      await this.deleteUser(id)
                  }
              } catch (e) {
                  // eslint-disable-next-line no-console
                  console.log(e)
              }
          },
          async sortUsersBy (field){
              const orderField = field.concat('+', this.nameSort);
              console.log(orderField)
              //const elem.getAttr('data-order')
              //const orderField = field.append()
              try {
                  await this.sortUsers(orderField)
              }catch (e) {
                  // eslint-disable-next-line no-console
                  console.log(e)
              }
              if (this.nameSort === 'desc'){
                  this.nameSort = 'asc'
              }else{
                  this.nameSort = 'desc'
              }
              //console.log(this.nameSort)
          }
      }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
  table,th,td  {
    border: #3b8070 solid 1px;
  }
</style>
