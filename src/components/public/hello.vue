<template>
  <section class="hello">
  </section>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
  },
  created() {
    let storage = window.localStorage;
    let category = storage.category
    //0为系统管理员 1.院区管理员 2. 医生本人
    if (category === '0') {
      this.$router.push('/balanceMy');
    } else if (category === '1') {
      this.$router.push('/hosBalanceMy');
    } else if(category === '2'){
      this.$router.push('/docBalanceMy');
    }else{
      return false;
    }
  },
  methods: {

  }
}

</script>
