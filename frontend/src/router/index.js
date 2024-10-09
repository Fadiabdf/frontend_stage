import { createRouter, createWebHistory } from 'vue-router';
import ValidationPage from '../pages/ValidationPage.vue';
import CommentDisplayPage from '../pages/CommentDisplayPage.vue';
import AnnotationPage from '../pages/AnnotationPage.vue';
import EmotionPage from '../pages/EmotionPage.vue';
import Parametre from '../pages/ParametrePage.vue';
import annotation_commentaire from '../components/annotation_commentaire.vue';
import AnnotationEmotion from '@/components/AnnotationEmotion.vue';
import ParaEmotion from '@/pages/ParaEmotion.vue';
import ResultatsRecherche  from '@/pages/ResultatsRecherche.vue';
import HomePage from '../pages/HomePage.vue'; 
//--------------------------------------------------------------------
import PreProcessing from '@/pages/PreProcessResults.vue'; 
import TextPreprocessing from '@/pages/TextPreprocessing.vue'; 
import ParametreCorpus from '@/pages/ParametreCorpus.vue'; 
import Statistique from '@/pages/StatisticPage.vue'
import Graph from '@/components/Graph.vue';
import CalculAnn from '@/pages/PageInfoKhi2Ann.vue';
import type from '@/pages/type_conflit.vue';
import PageTableau from '@/pages/PageTableau.vue';
import LanguageChart from '@/pages/Stat_langues.vue';
import CalculMots from '@/pages/PageInfoKhi2Mots.vue'
import store from '../store'
import Scripting from '@/pages/PageScripting.vue';
import ChoixCorpus from '@/pages/ChoixCorpus.vue';



const routes = [
  { path: '/ValidationPage', component: ValidationPage},
  { path: '/CommentDiplay', component: CommentDisplayPage},
  { path: '/Annotation', component: AnnotationPage},
  { path: '/EmotionPage', component: EmotionPage},
  { path: '/Parametre', component: Parametre},
  { path: '/annotation_commentaire', component: annotation_commentaire},
  { path: '/annotationEmotion', component: AnnotationEmotion},
  { path: '/ParaEmotion', component: ParaEmotion},
  { path: '/recherche', component: ResultatsRecherche },
  { path: '/', component: HomePage },
  { path: '/ParametreCorpus', component: ParametreCorpus },
  // ---------------------------------------------
  {path: '/pretraitement/resultats',name: 'PreProcessing',component: PreProcessing,props: true},
  {path: '/pretraitement',name: 'TextPreprocessing',component: TextPreprocessing, props: true},
{path: '/choixCorpus' , name:'choixCorpus', component : ChoixCorpus},
  {
    path: '/graph',
    name: 'Graph',
    component: Graph 
  },
  {
    path: '/scripting',
    name: 'Scripting',
    component: Scripting 
  },
  {
    path: '/statistiques',
    name: 'Statistiques',
    component: Statistique 
  },
  {
    path: '/correlation-terms-classes',
    name: 'CorrelationTermsClasses',
    component: () => import('../pages/Stat_classe_terme.vue'),
    beforeEnter: async (to, from, next) => {
      await store.dispatch('fetchEtiquettes');
      next();
    }
  },
{
    path: '/calculAnn', 
    name: 'CalculAnn',
    component: CalculAnn
  },
  {
    path: '/calculMots', 
    name: 'CalculMots',
    component: CalculMots
  },
  {
  path: '/correlation-mots',
  name: 'CorrelationMots',
  component: () => import('../pages/Stat_mots.vue') 
},
{
    path: '/type', 
    name: 'type',
    component: type
  },
  
  {
    path: '/PageTableau',
    name: 'PageTableau',
    component: PageTableau,
    props: route => ({
      selectedCombinations: JSON.parse(route.query.selectedCombinations || '[]')
    })},
    {
    path: '/langue', 
    name: 'langue',
    component: LanguageChart
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
