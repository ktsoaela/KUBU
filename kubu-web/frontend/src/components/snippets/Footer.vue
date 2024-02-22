<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-2">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Components</a></li>
            <li><a href="#">Icons</a></li>
            <li><a href="#">Showcases</a></li>
            <li><a href="#">Downloads</a></li>
          </ul>
        </div>
        <div class="col-2">
          <h3>Resources</h3>
          <ul>
            <li><a href="#">Github</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div class="col-2">
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Disclaimer</a></li>
            <li><a href="#">DMCA</a></li>
          </ul>
        </div>
        <div class="col-2">
          <h3>Connect</h3>
          <ul>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>
        <div class="col-2">
          <h3>Contact</h3>
          <ul>
            <li>Email: info@example.com</li>
            <li>Phone: +1234567890</li>
            <li>Address: 123 Street, City, Country</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
footer {
  position: relative;
  bottom: 0px;
  width: 100%;
  background-color: #f8f8f8;
  padding: 30px 0;
  border-top: 1px solid #ddd;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.col-2 {
  width: calc(20% - 20px);
  margin-right: 20px;
}

.footer h3 {
  margin-bottom: 10px;
}

.footer ul {
  list-style-type: none;
  padding: 0;
}

.footer ul li {
  margin-bottom: 8px;
}

.footer ul li a {
  text-decoration: none;
  color: #333;
}

.footer ul li a:hover {
  color: #007bff;
}
</style>
