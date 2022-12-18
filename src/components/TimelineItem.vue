<script setup lang="ts">
import { TimelinePost } from '../posts'

defineProps<{
  post: TimelinePost
}>()
</script>

<template>
  <a>{{ post.title }}</a>
  <div>{{ post.created.toFormat("d MMM") }}</div>
</template>