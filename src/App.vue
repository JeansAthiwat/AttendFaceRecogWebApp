<template>
  <div id="app">
    <nav class="navbar navbar-expand primary navbar-dark" style="background-color: #112e51">
      <a class="navbar-brand" href="#"></a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample02"
        aria-controls="navbarsExample02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample02">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Login Page</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/faceReg"
              >prep for CheckIn</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/addUser"
              >Add Student</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/statsPage"
              >Status Report</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
    <div>
    <router-view />
    </div>
    
  </div>
</template>

<style>
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2f465e;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}*/
</style>
