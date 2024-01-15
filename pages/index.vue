<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { NDataTable, NButton, NAvatar } from 'naive-ui'
import type { DataTableColumns, DataTableBaseColumn, DataTableFilterState } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useTicketsStore } from '~/stores/tickets'
import { ERouteName } from '~/shared/routes'
import VTitle from '~/components/ui/VTitle.vue'
import type { TTickets } from '~/types/tickets'

definePageMeta({
  name: ERouteName.PAGE_HOME,
  middleware: 'auth'
})

const ticketsStore = useTicketsStore()
const { tiketsSerialized } = storeToRefs(ticketsStore)
const isLoading = ref(false)
const router = useRouter()
const title = 'Тикеты'

useHead({
  title
})

nextTick(async () => {
  isLoading.value = true
  await ticketsStore.fetchTickets()
  isLoading.value = false
})

const addressColumn = reactive<DataTableBaseColumn>({
  title: 'Заголовок',
  key: 'header',
  width: '10rem',
  filterMultiple: false,
  filterOptionValue: null,
  sorter: 'default',
  filterOptions: [
    {
      label: 'green',
      value: 'green'
    },
    {
      label: 'indigo',
      value: 'indigo'
    }
  ],
  filter (value, row) {
    return !!~row.header.indexOf(value.toString())
  }
})

const createColumns = ({
  openApplication
}: {
  openApplication: (row: TTickets) => void
}): DataTableColumns<TTickets> => {
  return [
    {
      key: 'avatar',
      render (row: TTickets) {
        return h(
          NAvatar,
          {
            style: {
              width: '3rem',
              height: '3rem',
              borderRadius: '100%',
              cursor: 'pointer'
            },
            src: row.avatar,
            onClick: () => {
              router.push({
                name: ERouteName.PAGE_ADMIN_PROFILE_ID,
                params: {
                  id: row.id
                }
              })
            }
          }
        )
      }
    },
    {
      title: 'Дата',
      key: 'createdAt',
      width: '10rem'
    },
    {
      title: 'id',
      key: 'id',
      width: '5rem',
      sorter (rowA:any, rowB:any) {
        return rowA.id - rowB.id
      }
    },
    addressColumn,
    {
      title: 'Тикет',
      key: 'ticket',
      width: '100%'
    },
    {
      key: 'actions',
      width: '3rem',
      render (row: TTickets) {
        return h(
          NButton,
          {
            type: 'primary',
            size: 'small',
            onClick: () => {
              router.push({
                name: ERouteName.PAGE_ADMIN_TICKET_ID,
                params: {
                  id: row.id
                }
              })
            }
          },
          { default: () => 'Посмотреть' }
        )
      }
    }

  ]
}

const columns = createColumns({
  openApplication () {}
})

const handleUpdateFilter = (
  filters: DataTableFilterState,
  sourceColumn: DataTableBaseColumn
) => {
  addressColumn.filterOptionValue = filters[sourceColumn.key] as string
}

</script>

<template>
  <div>
    <VTitle>{{ title }}</VTitle>
    <div class="table">
      <NDataTable
        :loading="isLoading"
        :columns="columns"
        :data="tiketsSerialized"
        @update:filters="handleUpdateFilter"
      >
        <template #empty>
          Нет данных
        </template>
      </NDataTable>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table {
  margin-top: 1rem;
}
</style>
