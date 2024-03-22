// updateVersionAndYear.js

document.addEventListener('DOMContentLoaded', function () {
    // Update version number
    const versionElement = document.querySelector('.version');
    if (versionElement) {
      versionElement.textContent = 'Kubu v1'; // Replace with your actual version number
    }
  
    // Update current year
    const currentYearElement = document.querySelector('.current-year');
    if (currentYearElement) {
      const currentYear = new Date().getFullYear();
      currentYearElement.textContent = currentYear;
    }
  });
  