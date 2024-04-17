document.addEventListener('DOMContentLoaded', function() {
  // Event listener for the sidebar toggle
  document.getElementById('sidebarToggle').addEventListener('click', function(event) {
      openNav();
      event.stopPropagation(); // Prevent clicking the button from immediately closing the sidebar
  });

  console.log("hello");

  // Function to open the sidebar
  function openNav() {
      document.getElementById("sidebar").style.width = "250px";
      document.getElementById("main-content").style.marginRight = "250px";
      // Attach event listener to close the sidebar when clicking on the main content
      document.getElementById('main-content').addEventListener('click', closeNav, { once: true });
  }

  // Function to close the sidebar
  function closeNav() {
      document.getElementById("sidebar").style.width = "0";
      document.getElementById("main-content").style.marginRight = "0";
  }

   // Attach an event listener to the close button
   document.querySelector('.closebtn').addEventListener('click', closeNav);
});
