<template>

 <div class="container">
    <div class="row">
      <div class="col" style="background-color: #f2f2f2;">Column 1</div>
      <div class="col" style="background-color: #ddd;">Column 2</div>
      <div class="col" style="background-color: #f2f2f2;">Column 3</div>
      <div class="col">    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Molestie nunc non blandit massa enim nec dui nunc mattis. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis. Enim tortor at auctor urna nunc id. Suspendisse sed nisi lacus sed viverra tellus in. Maecenas ultricies mi eget mauris pharetra et ultrices neque ornare. Nullam ac tortor vitae purus faucibus ornare suspendisse. Non enim praesent elementum facilisis leo vel fringilla est. Pretium nibh ipsum consequat nisl vel pretium lectus quam id. At quis risus sed vulputate odio ut eni    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Molestie nunc non blandit massa enim nec dui nunc mattis. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis. Enim tortor at auctor urna nunc id. Suspendisse sed nisi lacus sed viverra tellus in. Maecenas ultricies mi eget mauris pharetra et ultrices neque ornare. Nullam ac tortor vitae purus faucibus ornare suspendisse. Non enim praesent elementum facilisis leo vel fringilla est. Pretium nibh ipsum consequat nisl vel pretium lectus quam id. At quis risus sed vulputate odio ut enim. Sit amet aliquam id diam. Viverra adipiscing at in tellus integer. Feugiat sed lectus vestibulum mattis ullamcorper.um mattis ullamcorper.</div>
    </div>

    <div class="row">
      <div class="col" style="background-color: #ddd;">Column 4</div>
      <div class="col" style="background-color: #f2f2f2;">Column 5</div>
      <div class="col" style="background-color: #ddd;">Column 6</div>
      <div class="col">    <img src="https://unsplash.it/640/425" /></div>
    </div>
  </div>
</template>

<script>

</script>

<style>
 .mid-section{
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
 }

 .rw {
    display: flex;
    justify-content:space-evenly;
    row-gap: 0px;
  }

  .c-5 {
    width: 1%;
  }

   /* Reset some default styles */
   * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* Container to hold the grid */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    /* Define the grid */
    .row {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10px; /* Adjust for column padding */
    }

    /* Define column styles */
    .col {
      flex: 1;
      padding: 10px; /* Adjust as needed */
    }

    /* Media query for small screens */
    @media (max-width: 767px) {
      .col {
        flex: 0 0 100%; /* Take up full width */
      }
    }

    /* Media query for medium screens */
    @media (min-width: 768px) and (max-width: 991px) {
      .col {
        flex: 0 0 50%; /* Take up half width */
      }
    }

    /* Media query for large screens */
    @media (min-width: 992px) {
      .col {
        flex: 0 0 33.333%; /* Take up one-third width */
      }
    }
</style>
