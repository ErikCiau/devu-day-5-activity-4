<template>
  <section class="my-10 rounded-xl shadow-xl max-w-xl w-full mx-auto p-4">
    <header>
      <span class="text-[#625B71] font-medium text-xl">
        <h2>Edit account #{{ $route.params.id }}</h2>
      </span>
    </header>
    <div class="my-5">
      <form @submit.prevent="handlerAddAccount" class="flex flex-col gap-4">
        <div class="flex flex-row gap-1">
          <div class="animate input-control">
            <label for="firstname">First name</label>
            <input v-model="accountBalance.beneficiary.firstname" name="firstname" type="text" id="firstname">
          </div>
          <div class="animate input-control">
            <label for="lastname">Last name</label>
            <input v-model="accountBalance.beneficiary.lastname" name="lastname" type="text" id="lastname">
          </div>
        </div>
        <div class="flex flex-row gap-1">
          <div class="animate input-control">
            <label for="amount">Monto</label>
            <input v-model="accountBalance.balance.cents" name="amount" type="number" id="amount">
          </div>
        </div>
        <button
          class="animate outline p-4 rounded bg-[#625B71] text-xl text-white w-full text-center hover:scale-95 active:scale-100 disabled:bg-opacity-30 disabled:hover:scale-100 disabled:active:scale-100"
          type="submit">Enviar
        </button>
      </form>
    </div>
  </section>

  <section class="my-10 rounded-xl shadow-xl max-w-xl w-full mx-auto p-4">
    <header>
      <span class="text-[#625B71] font-medium text-xl flex justify-between items-center">
        <h2>Response</h2>
        <router-link to="/" class="button animate bg-[#625B71]">
          <Home class="stroke-white" />
        </router-link>
      </span>
    </header>
    <div class="my-5 font-mono">
      <pre>{{ JSON.stringify(response || {}, null, 2).trimStart() }}</pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import Home from '../components/svgs/Home.vue';
import { Iaccount } from '../interfaces/api.interfaces';
import { useAccount } from '../services/accounts.service';

const accountBalance = reactive({
  id: null as null | string,
  beneficiary: {
    firstname: '',
    lastname: ''
  },
  balance: {
    cents: 0,
  }
})
const { updateAccount, getAccountById } = useAccount()
const { params } = useRoute()
const response = ref<Partial<Iaccount>>({})

onMounted(async () => {
  const { beneficiary, balance, id } = await getAccountById(params.id as string)
  accountBalance.id = id
  accountBalance.beneficiary = beneficiary
  accountBalance.balance.cents = balance.cents
})

const handlerAddAccount = async () => {
  try {
    response.value = await updateAccount(params.id as string, accountBalance)
    console.log({ response })
  } catch (error) {
    throw error
  }
}

</script>

