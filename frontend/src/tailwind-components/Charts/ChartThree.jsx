import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
    chart: {
        fontFamily: 'Satoshi, sans-serif',
        type: 'donut',
    },
    colors: ['#3C50E0', '#9333EA', '#34D399', '#0FADCF'],
    labels: ['Cafetière', 'Telephone', 'Ecouteur', 'Basket'],
    legend: {
        show: false,
        position: 'bottom',
    },
    plotOptions: {
        pie: {
            donut: {
                size: '65%',
                background: 'transparent',
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    responsive: [
        {
            breakpoint: 2600,
            options: {
                chart: {
                    width: 380,
                },
            },
        },
        {
            breakpoint: 640,
            options: {
                chart: {
                    width: 200,
                },
            },
        },
    ],
};

const initialSeries = [65, 34, 12, 56];

const ChartThree = () => {
    const [state, setState] = useState({ series: initialSeries });

    useEffect(() => {
        const handleReset = () => {
            setState({ series: initialSeries });
        };
        handleReset();
    }, []);

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-[#EEF2FF] px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5 max-w-100">

            <div className="mb-2">
                <div id="chartThree" className="mx-auto flex justify-center">
                    <ReactApexChart
                        options={options}
                        series={state.series}
                        type="donut"
                    />
                </div>
            </div>

            <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
                <div className="w-full sm:w-1/2 px-8">
                    <div className="flex w-full items-center">
                        <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#3C50E0]"></span>
                        <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                            <span className="text-[16px]"> Cafetière </span>
                            <span className="text-[16px]"> 65% </span>
                        </p>
                    </div>
                </div>
                <div className="w-full sm:w-1/2 px-8">
                    <div className="flex w-full items-center">
                        <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#0FADCF]"></span>
                        <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                            <span className="text-[16px]"> Basket </span>
                            <span className="text-[16px]"> 56% </span>
                        </p>
                    </div>
                </div>
                <div className="w-full sm:w-1/2 px-8">
                    <div className="flex w-full items-center">
                        <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#9333EA]"></span>
                        <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                            <span className="text-[16px]"> Téléphone </span>
                            <span className="text-[16px]"> 34% </span>
                        </p>
                    </div>
                </div>
                <div className="w-full sm:w-1/2 px-8">
                    <div className="flex w-full items-center">
                        <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#34D399]"></span>
                        <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                            <span className="text-[16px]"> Ecouteur </span>
                            <span className="text-[16px]"> 12% </span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ChartThree;
