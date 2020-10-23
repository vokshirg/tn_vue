<template lang="pug">
  q-dialog(v-model='prompt' persistent='')
    q-card(style='min-width: 350px')
      q-card-section
        .text-h6 Your address
      q-card-section.q-pt-none
        q-input(dense='' v-model='address' autofocus='' @keyup.enter='client_form_show = false')
      q-card-actions.text-primary(align='right')
        q-btn(flat='' label='Cancel' v-close-popup='')
          q-btn(flat='' label='Add address' v-close-popup='')

</template>

<script>
export default {
  name: "clientForm"
}
</script>

<style scoped>

</style>