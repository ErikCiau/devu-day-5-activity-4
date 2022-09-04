<template>
  <section class="my-10 rounded-xl shadow-xl max-w-xl w-full mx-auto p-4">
    <header>
      <span class="text-[#625B71] font-medium text-xl">
        <h2>Add account</h2>
      </span>
    </header>
    <div class="my-5">
      <form @submit.prevent="handlerAddAccount" class="flex flex-col gap-4">
        <div class="flex flex-row gap-1">
          <div class="animate input-control">
            <label for="amount">Monto</label>
            <input v-model="amount" name="amount" type="number" id="amount">
          </div>
        </div>
        <button :disabled="amount <= 0"
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
import { ref } from 'vue';
import { Iaccount, Ibalance } from '../interfaces/api.interfaces';
import { useAccount } from '../services/accounts.service';
import Home from '../components/svgs/Home.vue';

const amount = ref<number>(0)
const { addAccount } = useAccount()
const response = ref<Partial<Iaccount>>({})

const handlerAddAccount = async () => {
  console.log("click")
  const balance: Partial<Ibalance> = { cents: amount.value, }
  try {
    response.value = await addAccount(balance)
  } catch (error) {
    throw error
  }
}

</script>