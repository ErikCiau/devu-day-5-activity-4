<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Delete from '../components/svgs/Delete.vue'
import Pencil from '../components/svgs/Pencil.vue'
import Point from '../components/svgs/Point.vue'
import TableWrapper from '../components/TableWrapper.vue'
import { Iaccount } from '../interfaces/api.interfaces'
import { useAccount } from '../services/accounts.service'
import Plus from '../components/svgs/Plus.vue'
import Restart from '../components/svgs/Restart.vue'

const { getAccounts, getAccountById, deleteAccount, updatePartialAccount } = useAccount()

const accounts = ref<Iaccount[]>([])
const account = ref<Partial<Iaccount>>({})

onMounted(async () => {
  accounts.value = await getAccounts()
})

const displayContent = computed(() => accounts.value.map(({ id, balance, beneficiary, createdAt }) => ({
  id,
  beneficiary: `${beneficiary.firstname} ${beneficiary.lastname}`,
  balance: balance.display,
  createdAt: new Date(createdAt).toDateString()
}
)))

const handleSelectItem = async (id: string) => {
  account.value = await getAccountById(id)
}

const handleDeleteItem = async (id: string) => {
  await deleteAccount(id)
  accounts.value = await getAccounts()
}

const handleAmountToZero = async (id: string) => {
  try {
    const response = await updatePartialAccount(id, { amount: 0 })
    accounts.value = await getAccounts()
    console.log({ response })
  } catch (error) {
    console.log({ error })
  }
}

const restart = () => {
  account.value = {}
}

</script>
    
<template>
  <section class="my-10 rounded-xl shadow-xl max-w-5xl w-full mx-auto p-4">
    <header class="flex justify-between items-center">
      <span class="text-[#625B71] font-medium text-xl">
        <h2>Accounts</h2>
      </span>
      <router-link to="/add" class="button animate bg-[#625B71]">
        <Plus class="stroke-white" />
      </router-link>
    </header>
    <div class="mt-5">
      <TableWrapper :headers="['id', 'fullname', 'balance', 'date']" :body="displayContent" actions>
        <template #actions="{ item }">
          <div class="flex flex-row flex-nowrap gap-1 justify-center items-center">
            <button class="button animate bg-yellow-200" @click="handleSelectItem(item.id)">
              <Point />
            </button>
            <router-link :to="{ name: 'edit', params: { id: item.id } }" class="button animate bg-yellow-200">
              <Pencil />
            </router-link>
            <button class="button animate bg-yellow-500" @click="handleAmountToZero(item.id)">
              <Restart class="stroke-black" />
            </button>
            <button @click="handleDeleteItem(item.id)" class="button animate bg-red-500">
              <Delete />
            </button>
          </div>
        </template>
      </TableWrapper>
    </div>
  </section>
  <section class="my-10 rounded-xl shadow-xl max-w-5xl w-full mx-auto p-4">
    <header class="flex justify-between items-center">
      <span class="text-[#625B71] font-medium text-xl">
        <h2>Accounts selected</h2>
      </span>
      <button class="button animate bg-[#625B71]" @click="restart">
        <Restart class="stroke-white" />
      </button>
    </header>
    <code class="my-5 block">
        <pre>{{ JSON.stringify(account || {}, null, 2).trimStart() }}</pre>
      </code>
  </section>
</template>
