import { computed, ComputedRef, ref } from 'vue';
import { useStore } from 'vuex';

interface LoadMore {
  currentPage: number;
  pageSize: number
}

export default function (actionName: string, total: ComputedRef<number>, params: LoadMore = { currentPage: 2, pageSize: 5 }) {
  const store = useStore()
  const currentPage = ref(params.currentPage)
  const requestParams = computed(() => {
    return {
      currentPage: currentPage.value,
      pageSize: params.pageSize
    }
  })
  const loadMorePage = () => {
    store.dispatch(actionName, requestParams.value).then(() => {
      currentPage.value++
    })
  }
  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.pageSize) < currentPage.value
  })

  return {
    loadMorePage,
    isLastPage,
    currentPage
  }

}