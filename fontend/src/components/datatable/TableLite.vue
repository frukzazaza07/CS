<template>
  <div style="text-align: left">
    <div class="ml-2 form-inline mb-1">
      <label class="text-secondary">SearchBy: &nbsp;</label>
      <input class="form-control form-control-sm" v-model="searchTerm" />
    </div>
    <!-- :has-checkbox="true"
    :is-fixed-first-column="true"
    :is-loading="table.isLoading"
    :is-re-search="table.isReSearch"
    :columns="table.columns"
    :rows="table.rows"
    :rowClasses="table.rowClasses"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    :messages="table.messages"
    @do-search="doSearch"
    @is-finished="tableLoadingFinish"
    @return-checked-rows="updateCheckedRows" -->
    <vue3-table-lite
      :has-checkbox="true"
      :is-static-mode="true"
      :is-loading="table.isLoading"
      :columns="table.columns"
      :rows="table.rows"
      :total="table.totalRecordCount"
      :sortable="table.sortable"
      :messages="table.messages"
      :pageOptions="table.pageOptions"
      @return-checked-rows="updateCheckedRows"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, ref, computed, watch } from "vue";
import vue3TableLite from "vue3-table-lite";
// https://linmasahiro.github.io/vue3-table-lite/
export default defineComponent({
  name: "TableLite",
  components: { vue3TableLite },
  props: {
    dataColumns: Object,
    searchRequest: Function,
  },
  setup(props) {
    const searchTerm = ref(""); // Search text

    // Fake data
    const data = reactive({
      rows: [],
    });

    /**
     * Get server data request
     */

    const updateCheckedRows = (rowsKey) => {
      console.log(rowsKey);
    };

    // Table config
    const table = reactive({
      isLoading: true,
      columns: props.dataColumns,
      rows: computed(() => {
        return data.rows;
      }),
      totalRecordCount: computed(() => {
        return table.rows.length;
      }),
      sortable: {
        order: "id",
        sort: "asc",
      },
      messages: {
        pagingInfo: "Showing {0}-{1} of {2}",
        pageSizeChangeLabel: "show count: ",
        gotoPageLabel: " select page: ",
        noDataAvailable: "No data",
      },
      pageOptions: [
        { value: 10, text: 10 },
        { value: 25, text: 25 },
        { value: 50, text: 50 },
        { value: 100, text: 100 },
        { value: 500, text: 500 },
        {
          value: computed(() => {
            return table.rows.length;
          }),
          text: "All",
        },
      ],
    });

    /**
     * Use vue.js watch to watch your state's change
     */
    watch(
      () => searchTerm.value,
      (val) => {
        table.isLoading = true;
        props.searchRequest(val).then((newData) => {
          data.rows = newData;
          table.isLoading = false;
        });
      }
    );

    // Get data on first rendering
    props.searchRequest("").then((newData) => {
      data.rows = newData;
      table.isLoading = false;
    });

    return {
      searchTerm,
      table,
      updateCheckedRows,
    };
  },
});
</script>

<style>
@import "../../styles/tableLite/main.css";
</style>
