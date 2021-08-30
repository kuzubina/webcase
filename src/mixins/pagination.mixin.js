export default {
  data() {
    return {
      options: [5, 10, 20, 40],
      perPage: 5,
      currentPage: 0,
    }
  },
  methods: {
    checkNumberPage() {
      this.currentPage = +this.$route.query.page - 1 || 0
    },
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
}
