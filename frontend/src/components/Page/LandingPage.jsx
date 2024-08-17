import {Link} from "react-router-dom";
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import "./CSS/LandingPage.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import second_banner from "../Assets/banner2.jpg"
import third_banner from "../Assets/slide-1.webp"
import fourth_banner from "../Assets/promo.jpg"
import p1 from '../Assets/p6.png';
import p2 from '../Assets/p5m.png';
import p3 from '../Assets/p3m.png';

import top1 from '../Assets/mixer2.png'
import top2 from '../Assets/infinix2.png'
import top3 from '../Assets/epson.png'
import top4 from '../Assets/chaussure.png'
import top5 from '../Assets/airpod.png'
import top6 from '../Assets/cafe.png'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import * as React from "react";
export default function LandingPage() {
    const images = [
        {
            url: p1,
            title: 'Cosmétique',
            width: '30%',
        },
        {
            url: p3,
            title: 'Electroménager',
            width: '40%',
        },
        {
            url: p2,
            title: 'Informatique',
            width: '30%',
        },
    ];
    const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('sm')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
            zIndex: 1,
            '& .MuiImageBackdrop-root': {
                opacity: 0.15,
            },
            '& .MuiImageMarked-root': {
                opacity: 0,
            },
            '& .MuiTypography-root': {
                border: '4px solid currentColor',
            },
        },
    }));

    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: '100%',
        backgroundPosition: 'center 40%',
        backgroundRepeat: 'no-repeat',
    });
    const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    }));

    const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    }));

    const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }));
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section className=" border-b banner">

                    <Swiper
                        loop={true}
                        cssMode={true}
                        navigation={true}
                        pagination={true}
                        mousewheel={true}
                        keyboard={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                        className="mySwiper"
                    >
                        <SwiperSlide className="relative h-[300px]">
                            <div className="relative h-full" style={{
                                backgroundImage: `url(${third_banner})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: "no-repeat",
                                minHeight: '400px'
                            }}>
                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center space-y-4 px-4 md:px-6 bg-opacity-50 bg-black text-center">
                                    <div className="text-center space-y-2">
                                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Restez
                                            à la pointe de la technologie</h1>
                                        <p className="mx-auto max-w-[700px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                            <Link
                                                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                                href="#"
                                            >
                                                Voir le catalogue
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>


                        <SwiperSlide className="relative h-[300px]">
                            <div className="relative h-full" style={{
                                backgroundImage: `url(${fourth_banner})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: "no-repeat",
                                minHeight: '400px'
                            }}>
                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center space-y-4 px-4 md:px-6 bg-opacity-50 bg-black text-center">
                                    <div className="text-center space-y-2">
                                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Devenez
                                            notre partenaire fournisseur</h1>
                                        <p className="mx-auto max-w-[700px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                            Vendez plus facilement avec nous ! </p>
                                        <p className="mx-auto max-w-[700px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                            <Link
                                                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                                href="#"
                                            >
                                                Rejoignez-Nous
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                    </Swiper>
                </section>
                <section className="py-2">
                    <Box sx={{display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%'}}>
                        {images.map((image) => (
                            <ImageButton
                                focusRipple
                                key={image.title}
                                style={{
                                    width: image.width,
                                }}
                            >
                                <ImageSrc style={{backgroundImage: `url(${image.url})`}}/>
                                <ImageBackdrop className="MuiImageBackdrop-root"/>
                                <Image>
                                    <Typography
                                        component="span"
                                        variant="subtitle1"
                                        color="inherit"
                                        sx={{
                                            position: 'relative',
                                            p: 4,
                                            pt: 2,
                                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                        }}
                                    >
                                        {image.title}
                                        <ImageMarked className="MuiImageMarked-root"/>
                                    </Typography>
                                </Image>
                            </ImageButton>
                        ))}
                    </Box>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-2">
                    <div
                        className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Top Ventes</h2>
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                "Les meilleures ventes sélectionnées pour vous"
                            </p>
                        </div>
                        <div className="divide-y rounded-lg border">
                            <div
                                className="grid w-full grid-cols-1 items-stretch justify-center divide-x md:grid-cols-3">
                                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                    <div className="card ">
                                        <div className="card-img">
                                            <img
                                                alt="Product Image"
                                                className="w-full object-cover"
                                                src={top1}
                                                style={{
                                                    maxHeight: "92px",
                                                    //height: "40%",
                                                    objectFit: "cover",
                                                }}
                                                width="80"
                                            />
                                        </div>
                                        <div className="card-info">
                                            <p className="text-title">Mixeur Blender </p>
                                            <p className="text-body">Capacité 1,5 L, Bol en Polycarbonate</p>
                                        </div>
                                        <div className="card-footer">
                                            <span className="text-title">300.00 TND</span>
                                            <div className="card-button">
                                                <svg className="svg-icon svg-landing" viewBox="0 0 20 20">
                                                    <path
                                                        d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                                                    <path
                                                        d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                                                    <path
                                                        d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                    <div className="card ">
                                        <div className="card-img">
                                            <img
                                                alt="Product Image"
                                                className="w-full h-60 object-cover"
                                                src={top2}
                                                style={{
                                                    height: "40%",
                                                    objectFit: "cover",
                                                }}
                                                width="80"
                                            />
                                        </div>
                                        <div className="card-info">
                                            <p className="text-title">Infinix Hot 30 </p>
                                            <p className="text-body"> écran de 6,78 pouces 8go 128go</p>
                                        </div>
                                        <div className="card-footer">
                                            <span className="text-title">459.00 TND</span>
                                            <div className="card-button">
                                                <svg className="svg-icon svg-landing" viewBox="0 0 20 20">
                                                    <path
                                                        d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                                                    <path
                                                        d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                                                    <path
                                                        d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="mx-auto flex w-full items-center justify-center p-8">
                                    <div className="card ">
                                        <div className="card-img">
                                            <img
                                                alt="Product Image"
                                                className="w-full h-60 object-cover"
                                                src={top3}
                                                style={{
                                                    height: "40%",
                                                    objectFit: "cover",
                                                }}
                                                width="80"
                                            />
                                        </div>
                                        <div className="card-info">
                                            <p className="text-title">Imprimante </p>
                                            <p className="text-body">Marque EPSON 445x 330 x 135 mm 11,6 kg</p>
                                        </div>
                                        <div className="card-footer">
                                            <span className="text-title">650.00 TND</span>
                                            <div className="card-button">
                                                <svg className="svg-icon svg-landing" viewBox="0 0 20 20">
                                                    <path
                                                        d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                                                    <path
                                                        d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                                                    <path
                                                        d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div
                                className="grid w-full grid-cols-1 items-stretch justify-center divide-x md:grid-cols-3">
                                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                    <div className="card ">
                                        <div className="card-img">
                                            <img
                                                alt="Product Image"
                                                className="w-full h-60 object-cover"
                                                src={top4}
                                                style={{
                                                    height: "40%",
                                                    objectFit: "cover",
                                                }}
                                                width="80"
                                            />
                                        </div>
                                        <div className="card-info">
                                            <p className="text-title">Chaussure Nazih </p>
                                            <p className="text-body">Elégant, confortable, flexible</p>
                                        </div>
                                        <div className="card-footer">
                                            <span className="text-title">120 TND</span>
                                            <div className="card-button">
                                                <svg className="svg-icon svg-landing" viewBox="0 0 20 20">
                                                    <path
                                                        d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                                                    <path
                                                        d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                                                    <path
                                                        d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                    <div className="card ">
                                        <div className="card-img">
                                            <img
                                                alt="Product Image"
                                                className="w-full h-60 object-cover"
                                                src={top5}
                                                style={{
                                                    height: "40%",
                                                    objectFit: "cover",
                                                }}
                                                width="80"
                                            />
                                        </div>
                                        <div className="card-info">
                                            <p className="text-title">Apple AirPods </p>
                                            <p className="text-body">Recharge rapide, Qualité audio</p>
                                        </div>
                                        <div className="card-footer">
                                            <span className="text-title">1399 TND</span>
                                            <div className="card-button">
                                                <svg className="svg-icon svg-landing" viewBox="0 0 20 20">
                                                    <path
                                                        d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                                                    <path
                                                        d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                                                    <path
                                                        d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                    <div className="card ">
                                        <div className="card-img">
                                            <img
                                                alt="Product Image"
                                                className="w-full h-60 object-cover"
                                                src={top6}
                                                style={{
                                                    height: "40%",
                                                    objectFit: "cover",
                                                }}
                                                width="80"
                                            />
                                        </div>
                                        <div className="card-info">
                                            <p className="text-title">Cafetière</p>
                                            <p className="text-body">Marque Tristar 0,6L puissance de 600 W</p>
                                        </div>
                                        <div className="card-footer">
                                            <span className="text-title">69.00 TND</span>
                                            <div className="card-button">
                                                <svg className="svg-icon svg-landing" viewBox="0 0 20 20">
                                                    <path
                                                        d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                                                    <path
                                                        d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                                                    <path
                                                        d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <Link
                                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                href="#"
                            >
                                Notre Catalogue
                            </Link>

                        </div>
                    </div>
                </section>

                <section className="cw-full py-12  md:py-24 lg:py-36 border-b banner" style={{
                    backgroundImage: `url(${second_banner})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: "no-repeat"
                }}>
                    <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:px-6">
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl">"Les Meilleures Offres"</h1>
                            <p className="mx-auto max-w-[700px] text-dark-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Restez informé des dernières nouveautés et promotions
                            </p>
                        </div>
                        <form className="flex max-w-sm w-full">
                            <Input className="rounded-r-none bg-white" placeholder="Entrez votre email" type="email"/>
                            <Button className="rounded-l-none">S'abonner</Button>
                        </form>
                    </div>
                </section>
                <Features/>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 La Poste Tunisienne. Tout droit réservé.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Conditions d'utilisation
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Politique de confidentialité
                    </Link>
                </nav>
            </footer>
        </div>
    )
}


const Features = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div
                    className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4">
                    <div className="flex flex-col items-center gap-1">
                        <TruckIcon className="w-12 h-12"/>
                        <h3 className="font-bold">Livraison Rapide</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Recevez votre commande rapidement avec nos options de livraison rapide.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <LockIcon className="w-12 h-12"/>
                        <h3 className="font-bold">Paiements Sécurisés</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Achetez en toute confiance avec nos méthodes de paiement sécurisées.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <RefreshCwIcon className="w-12 h-12"/>
                        <h3 className="font-bold">Retours Faciles</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Pas satisfait ? Retournez vos articles
                            sans tracas.</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <HeadphonesIcon className="w-12 h-12"/>
                        <h3 className="font-bold">Support Client 24/7</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Des questions ? Notre équipe de support est là pour vous aider, jour et nuit.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

function HeadphonesIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
        </svg>
    )
}


function LockIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
    )
}


function RefreshCwIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
            <path d="M8 16H3v5"/>
        </svg>
    )
}


function TruckIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/>
            <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/>
            <circle cx="7" cy="18" r="2"/>
            <path d="M15 18H9"/>
            <circle cx="17" cy="18" r="2"/>
        </svg>
    )
}