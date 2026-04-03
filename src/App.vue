<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="app-container">
    <NavBar />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

:root {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #0a0a12;
  min-height: 100vh;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: 
    radial-gradient(1px 1px at 20px 30px, white, transparent),
    radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.6), transparent),
    radial-gradient(1px 1px at 90px 40px, white, transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent),
    radial-gradient(1px 1px at 160px 120px, white, transparent),
    radial-gradient(1px 1px at 200px 50px, rgba(255,255,255,0.5), transparent),
    radial-gradient(1px 1px at 250px 180px, white, transparent),
    radial-gradient(1px 1px at 300px 90px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 350px 140px, white, transparent),
    radial-gradient(1px 1px at 400px 60px, rgba(255,255,255,0.6), transparent),
    radial-gradient(1px 1px at 450px 200px, white, transparent),
    radial-gradient(1px 1px at 500px 100px, rgba(255,255,255,0.7), transparent),
    radial-gradient(1px 1px at 550px 170px, white, transparent),
    radial-gradient(1px 1px at 600px 30px, rgba(255,255,255,0.5), transparent),
    radial-gradient(1px 1px at 650px 80px, white, transparent),
    radial-gradient(1px 1px at 700px 150px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 750px 40px, white, transparent),
    radial-gradient(1px 1px at 800px 190px, rgba(255,255,255,0.6), transparent),
    radial-gradient(1px 1px at 850px 110px, white, transparent),
    radial-gradient(1px 1px at 900px 70px, rgba(255,255,255,0.7), transparent),
    radial-gradient(1px 1px at 950px 160px, white, transparent),
    radial-gradient(1px 1px at 1000px 20px, rgba(255,255,255,0.5), transparent),
    radial-gradient(1px 1px at 1050px 130px, white, transparent),
    radial-gradient(1px 1px at 1100px 90px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 1150px 50px, white, transparent),
    radial-gradient(1px 1px at 1200px 180px, rgba(255,255,255,0.6), transparent),
    radial-gradient(1px 1px at 1250px 70px, white, transparent),
    radial-gradient(1px 1px at 1300px 140px, rgba(255,255,255,0.7), transparent),
    radial-gradient(1px 1px at 1350px 30px, white, transparent),
    radial-gradient(1.5px 1.5px at 100px 200px, rgba(255,215,0,0.4), transparent),
    radial-gradient(1.5px 1.5px at 500px 250px, rgba(255,215,0,0.3), transparent),
    radial-gradient(1.5px 1.5px at 900px 220px, rgba(255,215,0,0.4), transparent),
    radial-gradient(1.5px 1.5px at 1300px 180px, rgba(255,215,0,0.3), transparent),
    #0a0a12;
  background-repeat: repeat;
  background-size: 1400px 300px;
}

main {
  flex: 1;
}
</style>
