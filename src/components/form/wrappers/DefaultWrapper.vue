<script>
// renderless pass through function
export default {
  name: 'default-wrapper',
  render() {
    return this.$h.get(this.$slots, 'default.0', () => {})
  }
}
</script>
