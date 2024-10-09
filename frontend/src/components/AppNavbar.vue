<template>
    <nav class="bg-blue-clr p-4 w-full flex justify-between items-center border-b-2 border-[#70aecd]">
      <div class=" logo text-2xl text-white-clr font-Potta-One">Conflit</div>
      <ul class=" nav-links font-OPTIAuvantGothic-Bold text-white-clr gap-20 ">
        <li>
          <a  href="/" :class="{ active: isActive('scrapping') }" @click="setActive('scrapping')"
              class="no-underline text-white-clr text-xm font-OPTIAuvantGothic-Bold"
          >Scrapping</a>
        </li>
        <li>
          <a href="/Annotation" :class="{ active: isActive('annotation') }" @click="setActive('annotation')"
             class="no-underline text-white-clr text-xm font-OPTIAuvantGothic-Bold"
          >Annotation</a>
        </li>
        <li>
          <a href="/pretraitement" :class="{ active: isActive('pretraitement') }" @click="setActive('pretraitement')"
             class="no-underline text-white-clr text-xm font-OPTIAuvantGothic-Bold"
          >Prétraitement</a>
        </li>
        <li>
          <a href="/choixCorpus" :class="{ active: isActive('statistiques') }" @click="setActive('statistiques')"
             class="no-underline text-white-clr text-xm font-OPTIAuvantGothic-Bold"
          >Statistiques</a>
        </li>
        <li>
          <a href="/Parametre">
             <img src="../assets/icons/parametres.png" alt="Paramètres" class="h-6 w-6 mr-6"/>
          </a>
       </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'AppNavbar',
    data() {
      return {
        activeLink: '', 
      };
    },
    methods: {
      setActive(link) {
        this.activeLink = link;
      },
      isActive(link) {
        return this.activeLink === link;
      },
    },
  };
  </script>
  
  <style scoped>
  /* @import url('https://fonts.googleapis.com/css2?family=Potta+One&display=swap');*/ 
  @font-face {
  font-family: 'OPTIAuvantGothic-Bold';
  src: url('../assets/fonts/OPTIAuvantGothic-Bold.otf') format('truetype');
  }

  .logo {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6), /* 3D effect */
                 0 0 1px rgba(255, 255, 255, 0.5); /* Slight white line */
  }
  
  .nav-links {
    list-style: none;
    display: flex;
    /*font-family: 'Potta One', cursive; /* Apply Potta One font */
  
    gap: 5rem; /* Add space between links */
  }

  .nav-links a {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5), /* 3D effect */
                 0 0 1px rgba(255, 255, 255, 0.5); /* Slight white line */
    position: relative;
   }
  .nav-links a:hover,
  .nav-links a.active {
    color: #FBFBF3;
  }
  
  .nav-links a.active::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: #FBFBF3;
    position: absolute;
    bottom: -5px; /* Adjust the distance from the text */
    left: 0;
  
  }
  </style>