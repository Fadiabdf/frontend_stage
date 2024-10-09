<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <div class="chart-container">
            <canvas id="Khi2Mots"></canvas>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';


export default {
    name: 'Khi2ChartMots',
    props: {
        msg: String,
        selectedX: {
            type: Array,
            default: () => []
        },
        selectedY: {
            type: Array,
            default: () => []
        },
        mots_khi2: {
            type: Array,
            default: () => []
        }
    },
    mounted() {
        const labels = [];
        this.selectedY.forEach(yOption => {
            labels.push(`${this.selectedX.join(' + ')} + ${yOption}`);
        });
        if (this.selectedY.length > 1) {
            const sommeLabel = `${this.selectedX.join(' + ')} + ${this.selectedY.join(' + ')}`;
            labels.push(sommeLabel);
        }
        const dataValues = this.mots_khi2;
        const data = {
            labels: labels,
                datasets: [{
                    label: 'Les valeurs de χ2',
                    data: dataValues,
                    backgroundColor: labels.map(() => 'rgba(75, 192, 192, 0.2)'),
                    borderColor: labels.map(() => 'rgb(75, 192, 192)'),
                    borderWidth: 1
                }]
            };

        const config = {
            type: 'bar',
            data: data,
            options: {
                maintainAspectRatio: false,
                scales: {
                        x: {
                            ticks: {
                                maxRotation: 90,
                                minRotation: 50,
                                autoSkip: false,
                                padding: 10
                                }
                            },
                        y: {
                            beginAtZero: true
                            }
                        }
                    }
                };


        const ctx = document.getElementById('Khi2Mots').getContext('2d');
        new Chart(ctx, config);
            
    }
}
</script>

<style scoped>
.chart-container {
    width: 800px;
    height: 600px;
    position: relative;
}

canvas {
    width: 100% !important;
    height: 100% !important;
}
</style>
