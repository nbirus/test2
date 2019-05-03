<template>
  <div class="page">
    
    <div class="header">
      <h3>Style Guide</h3>
    </div>

    <div class="body">

      <div class="section-nav">
        <ul>
          <li v-for="section in sections" :key="section.name + 'i'">
            <span v-html="section.name"></span>
          </li>
        </ul>
      </div>

      <ul class="sections">

        <li class="section">

          <h2>Color</h2>

          <h4 class="section-header">Neutrals</h4>

        </li>

        <li class="section" v-for="section in sections" :key="section.name">
          

        </li>

      </ul>

    </div>

  </div>
</template>

<script>
import StateHandler from '@/components/presentation/state/StateHandler'
export default {
  name: 'style-guide',
  data() {
    return {
      sections: [

        {
          name: 'Color',
          component: StateHandler,
        }

      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/component';
.page {
  min-height: 100vh;
  padding: 3rem;
}
.header {
  max-width: 1100px;
  margin: 0 auto;
}
.body {
  display: flex;
  max-width: 1100px;
  margin: 0 auto;
}
.section-nav {
  flex: 0 0 300px;
  border-right: solid thin $n3;
}
.sections {
  display: block;
  flex: 0 1 100%;
}
.section {
  display: block;
  // padding: 0; margin: 0;
}

.section-header {
  border-bottom: solid thin $n3;
  color: $text-light;
  padding-bottom: .25rem;
}

</style>
