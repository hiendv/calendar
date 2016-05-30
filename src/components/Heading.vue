<template>
  <header class="header">
    <div class="clearfix">
      <a class="brand" href="/">{{ name }}</a>
      <nav class="site-nav">
        <ul class="site-nav-list">
          <li class="nav-list-item active"><a class="nav-list-link" href="#">{{ user.name }}</a></li>
          <li class="nav-list-item"><a href="#" rel="nofollow" class="nav-list-link download-link">Add a note</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
  export default {
    data () {
      return {
        name: 'Calendar',
        user: {
          name: 'Hiển Đào Vinh'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/variables";
  .header {
    padding: 2rem;
    background-color: #fff;
    a {
      color: $color4;
      text-decoration: none;
    }
    .brand {
      display: block;
      float: left;
      text-transform: uppercase;
      font-weight: bold;
    }
    .site-nav {
      float: right;
      .site-nav-list {
        list-style: none;
        padding: 0;
        margin: 0;
        .nav-list-item {
          display: inline-block;
          margin-bottom: 0;
          margin-left: 1rem;
          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
  }
</style>
