<template>
  <header class="header">
    <div class="clearfix">
      <a class="brand" href="/">{{ name }}</a>
      <nav class="site-nav">
        <ul class="site-nav-list">
          <li class="nav-list-item active"><a class="nav-list-link" href="#">{{ user.name }}</a></li>
          <li class="nav-list-item">
            <a href="#" rel="nofollow" class="nav-list-link btn-link">
              <span class="ion-plus"></span> New
            </a>
          </li>
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
    background-color: $color3;
    a {
      color: $color1;
      text-decoration: none;
    }
    .brand {
      display: block;
      float: left;
      text-transform: uppercase;
      font-weight: bold;
    }
    .btn-link {
      display: inline-block;
      padding: .5em 1em;
      border-radius: 4px;
      font-size: .8em;
      background-color: darken($color3, 7%);
      &:hover {
        transition: background-color .3s linear;
        background-color: darken($color3, 15%);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07);
      }
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
