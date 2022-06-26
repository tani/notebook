<template>
  <client-only>
    <div :class="classname">
      <slot />
    </div>
  </client-only>
</template>

<script setup>
const classname = 'mermaid-' + Math.random().toString(16).slice(2) 
onMounted(async () => {
  const m = await import('mermaid/dist/mermaid')
  m.initialize({ startOnLoad: false, theme: 'neutral' });
  m.init({}, '.' + classname); 
})
</script>
