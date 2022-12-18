<script lang="ts" setup>
import { ref } from "vue";
import { useModal } from "../composables/modal";
import { useUsers } from "../stores/users";
import { NewUser } from "../users";
import UserForm from "./UserForm.vue"

const usersStore = useUsers()
const modal = useModal()
const error = ref('')

async function handleSignin (newUser: NewUser) {
  const body = JSON.stringify(newUser);
    usersStore.authenticate();
    modal.hideModal();
}
</script>

<template>
  <UserForm @submit="handleSignin" :error="error" />
</template>