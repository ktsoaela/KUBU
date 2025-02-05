function changeContent(page) {
    var contentDiv = document.getElementById('content');
  
    switch (page) {
      case 'home':
        contentDiv.innerHTML = `
          hello
        `;
        break;
      case 'about':
        contentDiv.innerHTML = `
          <h2>About Us</h2>
          <p>This is the about page content. Learn more about our purpose and team.</p>
          <p>We're passionate about creating engaging and informative SPAs.</p>
        `;
        break;
      case 'contact':
        contentDiv.innerHTML = `
          <h2>Contact Us</h2>
          <p>Feel free to reach out to us!</p>
          <form>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Your Name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required>
            <label for="message">Message:</label>
            <textarea id="message" name="message" placeholder="Your Message" rows="4" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        `;
        case 'papers':
        contentDiv.innerHTML = `
          <h2>Contact Us</h2>
          <p>Feel free to reach out to us!</p>
          <form>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Your Name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required>
            <label for="message">Message:</label>
            <textarea id="message" name="message" placeholder="Your Message" rows="4" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        `;
        break;
      default:
        contentDiv.innerHTML = '<h2>Page not found!</h2>';
    }
  }
  
  function handleSearch() {
    alert('Search functionality not implemented yet.');
  }
  
  window.onload = function() {
    const initialPage = window.location.hash.substring(1) || 'home';
    changeContent(initialPage);
  };
  
  window.onhashchange = function() {
    const page = window.location.hash.substring(1);
    changeContent(page);
  };