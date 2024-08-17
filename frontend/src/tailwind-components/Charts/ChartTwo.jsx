import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
        fontFamily: 'Satoshi, sans-serif',
        type: 'bar',
        height: 335,
        stacked: true,
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
    },
    responsive: [
        {
            breakpoint: 1536,
            options: {
                plotOptions: {
                    bar: {
                        borderRadius: 0,
                        columnWidth: '25%',
                    },
                },
            },
        },
    ],
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 0,
            columnWidth: '25%',
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'last',
        },
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left',
        fontFamily: 'Satoshi',
        fontWeight: 500,
        fontSize: '14px',
        markers: {
            radius: 99,
        },
    },
    fill: {
        opacity: 1,
    },
};

const initialSeries = [
    {
        name: 'Sales',
        data: [44, 55, 41, 67, 22, 43, 65],
    },
    {
        name: 'Revenue',
        data: [13, 23, 20, 8, 13, 27, 15],
    },
];

const ChartTwo = () => {
    const [state, setState] = useState({ series: initialSeries });

    useEffect(() => {
        const handleReset = () => {
            setState({ series: initialSeries });
        };
        handleReset();
    }, []);

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div className="flex w-full flex-wrap gap-3 sm:gap-5">
                    <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
                        <div className="w-full">
                            <p className="font-semibold text-primary">Total Revenue</p>
                            <p className="text-sm font-medium">This Week</p>
                        </div>
                    </div>
                    <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
                        <div className="w-full">
                            <p className="font-semibold text-secondary">Total Sales</p>
                            <p className="text-sm font-medium">This Week</p>
                        </div>
                    </div>
                </div>
                <div className="flex w-full max-w-45 justify-end">
                    <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
                        <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
                            Day
                        </button>
                        <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
                            Week
                        </button>
                        <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
                            Month
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div id="chartTwo" className="-ml-5 -mb-9">
                    <ReactApexChart
                        options={options}
                        series={state.series}
                        type="bar"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChartTwo;
