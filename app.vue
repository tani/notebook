<template>
  <div id="root">
    <header>
      <h1>Notepad</h1>
      <small>
      </small>
    </header>
    <main>
      <NuxtPage />
    </main>
    <nav>
      <h4>Recent Updated</h4>
      <ul>
        <li>test</li>
      </ul>
    </nav>
    <footer>
      <p style="text-align:center">
        Unless specified otherwise, all the code and the documentation
        on this site is in CC-BY-SA 4.0. <br/> &copy; 2022 TANIGUCHI Masaya
      </p>
    </footer>
  </div>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Klee+One:wght@400;600&display=swap');

html, body, #__nuxt, #root {
  box-sizing: border-box;
  margin: 0;
  min-height: 100vh;
  font-family: 'Klee One', cursive;
  background: #fcfcfc;
}

#root {
  margin: 0 auto;
  width: max(80%, 1200px);
  padding: 10px;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 100px 1fr 120px;
}

#root > * {
  padding: 20px;
  border: solid 3px #777;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  border-bottom-right-radius: 225px 15px;
  border-bottom-left-radius:15px 255px;  
}

code {
  font-family: 'Klee One', monospace;
  font-weight: 600;
}

header {
  grid-column: 1 / 3;
  grid-row: 1;
}

nav {
  grid-column: 1;
  grid-row: 2;
}

main { 
  grid-column: 2;
  grid-row: 2;
}

footer {
  grid-column: 1 / 3;
  grid-row: 3;
}
</style>
