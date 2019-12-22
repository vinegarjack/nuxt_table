<template>
  <div>
    <h1>{{user.name}}</h1>
    <template v-if="!isEdit">
      <div>
        <strong>Name:</strong> {{ user.name }}
      </div>
      <div>
        <strong>Username:</strong> {{ user.username }}
      </div>
      <div>
        <strong>Emal:</strong> <a :href="`mailto:${user.email}`">{{ user.email }}</a>
      </div>
      <div>
        <strong>Phone:</strong> <a :href="`tel:${user.phone}`">{{ user.phone }}</a>
      </div>
      <div>
        <strong>Website:</strong> <a :href="user.website" target="_blank">{{ user.website }}</a>
      </div>
      <div>
        <strong> Address:</strong> street - {{ user.address.street }}
      </div>
      <div>
         suite - {{ user.address.suite }}
      </div>
      <div>
         city - {{ user.address.city }}
      </div>
      <div>
        zipcode - {{ user.address.zipcode }}
      </div>
      <button @click.prevent="onEdit">Edit</button>
    </template>
    <template v-else>
      <input v-model="localUser.name" type="text" placeholder="Name">
    </template>
    <pre>
      {{ user }}
    </pre>

  </div>

</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: "User",
        data: () => ({
            isEdit: false
        }),
        async asyncData ({ $axios, params }) {
            let user = {}
            try {
                user = await $axios.$get(`/users/${params.id}`)
            } catch (e) {
                console.log(e.response)
            }
            const localUser = { ...user }
            return { user, localUser }
        }

    }
</script>

<style scoped>
div {
  text-align: center;
}
</style>
