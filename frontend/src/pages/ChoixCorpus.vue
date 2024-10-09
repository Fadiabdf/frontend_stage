<template>
    <header>
        <AppNavbar />
    </header>
    <div class="bg-white-clr w-full h-auto flex justify-between items-center">
        <div class="cercle-background flex w-full">
            <div class="justify-center items-center p-5 w-full">
                <img src="../assets/icons/Ellipse1.png" alt="White Shape"
                    class="absolute z-10 w-[680px] h-[100px] transform -translate-x-1/2 left-[30%]" />
                <div
                    class="flex pt-7 items-center justify-center absolute left-[29%] transform -translate-x-1/2 z-10 text-white-clr ">
                    <div class="flex justify-center items-center w-11 h-11 bg-blue-clr rounded-full mr-3">
                        <img src="../assets/icons/corpus.png" alt="Header icon" class="w-7 h-7" />
                    </div>
                    <p class="text-2xl ml-0 font-OPTIAuvantGothic-Bold text-blue-clr t-shadow2">
                        Veuillez choisir un corpus à étudier
                    </p>
                </div>
                <div class="flex ml-100 ">
                    <div class="flex ml-60 mt-[250px]">
                        
                        <DropDown class="w-[300px]" @optionSelected="handleOptionChange" />
                    </div>
                    <div class="flex ml-10 mt-[250px]">
                        <ChooseButton :selectedOption="selectedOption" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppNavbar from '../components/AppNavbar.vue';
import DropDown from '../components/DropdownCorpus.vue';
import ChooseButton from '../components/SubmitButtonCorpus.vue';
import { ref } from 'vue';

const selectedOption = ref('');

function handleOptionChange(newOption) {
    selectedOption.value = newOption; 
}
</script>


<script>
export default {
    name: 'ChoixCorpus',
    data() {
        return {
            progress: 50
        };
    },
};
</script>


<style scoped>
/*.bg-white-clr {
  background-color: #369ff4;
  margin: 0;
  padding: 0;
}*/

.cercle-background {
    background-image: url('../assets/icons/Line.png');
    background-size: contain;
    background-position: absolute;
    background-repeat: no-repeat;
    width: 108.25vw;
    height: 108.25vh;

}

.white-shape {
    position: absolute;
    top: 20px;
    width: 880px;
    height: 110px;
    transform: translateX(-50%);
    z-index: 1;
    left: 38%;
}

.header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 30px;
    left: 35%;
    transform: translateX(-50%);
    z-index: 2;
    padding: 0.5rem 1rem;
    font-family: 'Potta One', cursive;
    color: white;
    background: transparent;
}

.header-icon-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 65px;
    height: 65px;
    background-color: #369ff4;
    border-radius: 50%;
    margin-right: 10px;
}

.header-icon {
    width: 30px;
    height: 30px;
}

/*.header-text {
  color: #2180DE;
  font-size: 1.7rem;
}*/

.additional-message {
    margin-top: 125px;
    margin-left: 100px;
}

.additional-text {
    color: rgb(0, 0, 0);
    font-size: 1.2rem;
    margin-left: 10px;
    text-align: left;
    font-family: 'Aabeezee', cursive;
}

.cleaning-criteria {
    background-color: #80D4FF;
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
    margin-left: 60px;
    width: 80%;
    top: 35px;
    left: 90px;
    position: relative;
}

.criteria-outer-container {
    position: relative;
}

.criteria-outer-container-overlay {
    position: absolute;
    top: -40px;
    left: -40px;
    width: 100%;
    height: 100%;
    background-color: rgba(128, 212, 255, 0.5);
    border-radius: 10px;
    z-index: -1;
}


.criteria-container {
    display: flex;
    justify-content: space-between;
}

.criteria-column {
    width: 48%;
}

.cleaning-criteria ul {
    list-style-type: none;
    padding: 0;
}

.cleaning-criteria li {
    margin: 10px 0;
    display: flex;
    align-items: center;
}

.cleaning-criteria label {
    font-family: 'Aabeezee', cursive;
    font-size: 1.2rem;
    color: #333;
}

.cleaning-criteria input[type="checkbox"] {
    margin-right: 10px;
    width: 20px;
    height: 20px;
}



.clean-button:hover {
    background-color: #1a66b8;
}

@font-face {
    font-family: 'OPTIAuvantGothic-Bold';
    src: url('@/assets/fonts/OPTIAuvantGothic-Bold.otf') format('opentype');
}

.t-shadow2 {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2),
        0 0 1px rgba(255, 255, 255, 0.5);
}

.t-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6),
        0 0 1px rgba(255, 255, 255, 0.5);
}

.custom-scrollbar {
    scrollbar-width: auto;
    scrollbar-color: #57D7EC #FBFBF3;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 16px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #FBFBF3;
    border-radius: 25px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    margin-right: 5px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #57D7EC;
    border-radius: 25px;
    border: 3px solid #FBFBF3;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.custom-scrollbar::-webkit-scrollbar-button {
    display: none;
}

.button-clean {
    display: block;
    position: relative;
    padding: 12px;
    width: 13%;
    margin-right: 16px;
    margin-left: 950px;
    margin-top: 0px;
    background-color: #FBFBF3;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    outline: none;
}

.button-clean:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}


.button-text {
    font-family: 'OPTIAuvantGothic-Bold', sans-serif;
    text-align: center;
    font-size: 1.3rem;
    color: #282830;
    position: relative;
    padding-bottom: 2px;
}
</style>
