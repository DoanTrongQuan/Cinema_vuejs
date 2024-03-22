<template>
    <div class="card">
        <h5>Bar Chart</h5>
        <Chart type="bar" :data="barData" :options="barOptions"></Chart>
    </div>
</template>

<script setup>
import { ref, watch} from 'vue';
import { useLayout } from '@/layout/composables/layout';

const { layoutConfig } = useLayout();
let documentStyle = getComputedStyle(document.documentElement);
let textColor = documentStyle.getPropertyValue('--text-color');
let textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
let surfaceBorder = documentStyle.getPropertyValue('--surface-border');


const barData = ref(null);

const barOptions = ref(null);


const setColorOptions = () => {
    documentStyle = getComputedStyle(document.documentElement);
    textColor = documentStyle.getPropertyValue('--text-color');
    textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    surfaceBorder = documentStyle.getPropertyValue('--surface-border');
};

const setChart = () => {
    barData.value = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                borderColor: documentStyle.getPropertyValue('--primary-500'),
                data: [65, 59, 80, 81, 56, 55, 40]
            },
        ]
    }
    barOptions.value = {
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    }
}
    watch(
    layoutConfig.theme,
    () => {
        setColorOptions();
        setChart();
    },
    { immediate: true }
);
</script>

<style>

</style>

<!-- var dataFromServer = [
    [3, 350000.0],
    [4, 50000.0],
    [5, 600000.0]
];

// Biến đổi dữ liệu
var labels = [];
var revenueData = [];

dataFromServer.forEach(function(item) {
    // Thêm tháng vào danh sách nhãn
    var month = item[0];
    labels.push(getMonthName(month)); // Chuyển đổi số tháng thành tên tháng

    // Thêm doanh thu vào danh sách dữ liệu
    var revenue = item[1];
    revenueData.push(revenue);
});

// Dữ liệu cho biểu đồ barchart
var barData = {
    labels: labels,
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: documentStyle.getPropertyValue('--primary-500'),
            borderColor: documentStyle.getPropertyValue('--primary-500'),
            data: revenueData
        }
    ]
};

// Hàm chuyển đổi số tháng thành tên tháng
function getMonthName(month) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    return monthNames[month - 1]; // Trừ đi 1 vì mảng bắt đầu từ 0
} -->