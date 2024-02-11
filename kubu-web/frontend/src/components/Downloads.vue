<template>
  <div class='download'>
    <h2>Downloads</h2>
    <p>Download Kubu CSS and related files.</p>
    <div class='download-links'>
      <div class='download-link'>
        <h3>Kubu CSS</h3>
        <a href='path_to_kubu_css_file'>Download</a>
      </div>
    </div>
    <h2>Versions</h2>
    <table class='table'>
      <thead>
        <tr>
          <th>Version</th>
          <th>Flavor Name</th>
          <th>Release Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='version in versions' :key='version.id'>
          <td>{{ version.version }}</td>
          <td>{{ version.flavorName }}</td>
          <td>{{ version.releaseDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Download',
  data () {
    return {
      versions: [
        {
          id: 1,
          version: '1.0',
          flavorName: 'Vanilla',
          releaseDate: '2023-01-01'
        },
        {
          id: 2,
          version: '1.1',
          flavorName: 'Chocolate',
          releaseDate: '2023-02-15'
        },
        {
          id: 3,
          version: '1.2',
          flavorName: 'Strawberry',
          releaseDate: '2023-04-10'
        }
      ]
    }
  }
}
</script>

<style scoped>
.download {
  padding: 20px;
}

.download-links {
  display: flex;
  flex-wrap: wrap;
}

.download-link {
  margin-right: 20px;
}

.download-link h3 {
  margin-bottom: 10px;
}

.download-link a {
  text-decoration: none;
  color: #007bff;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table th,
.table td {
  border: 1px solid #dee2e6;
  padding: 8px;
  text-align: left;
}

.table th {
  background-color: #f8f9fa;
  color: #343a40;
}
</style>
