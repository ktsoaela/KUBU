<template>
  <div class='main-container mx-auto'>
    <h2 class='text-3xl font-semibold mb-6'>Showcase</h2>
    <div class='grid grid-cols-3 gap-6'>
      <div
        v-for='item in showcaseItems'
        :key='item.id'
        class='rounded-lg overflow-hidden shadow-md'
      >
        <img
          :src='item.image'
          alt='Showcase'
          class='w-full h-48 object-cover'
        />
        <div class='p-4'>
          <h3 class='text-xl font-semibold mb-2'>{{ item.title }}</h3>
          <p class='text-gray-700'>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Showcase',
  data () {
    return {
      showcaseItems: [
        {
          id: 1,
          title: 'Project 1',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        //   image: require('@/assets/project1.jpg'),
        },
        {
          id: 2,
          title: 'Project 2',
          description:
            'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        //   image: require('@/assets/project2.jpg'),
        },
        {
          id: 3,
          title: 'Project 3',
          description:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        //   image: require('@/assets/project3.jpg'),
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Add Kubu CSS styles here to match the design */
/* .container {
  padding: 20px;
}

.grid {
  display: grid;
}

.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.rounded-lg {
  border-radius: 0.5rem;
}

.overflow-hidden {
  overflow: hidden;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-3xl {
  font-size: 1.875rem;
}

.text-xl {
  font-size: 1.25rem;
}

.font-semibold {
  font-weight: 600;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.p-4 {
  padding: 1rem;
}

.text-gray-700 {
  color: #4a5568;
}

.object-cover {
  object-fit: cover;
} */
</style>
