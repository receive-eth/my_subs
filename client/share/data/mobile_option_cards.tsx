import ThemeSwitcher from '@ui/Inputs/ThemeSwitcher/ThemeSwitcher'
import { IoChevronForwardSharp } from 'react-icons/io5'
import { MdOutlineLightMode } from 'react-icons/md'
import { HiOutlineMail } from 'react-icons/hi'
import { RiLock2Line } from 'react-icons/ri'
import { IoPhonePortraitOutline } from 'react-icons/io5'
import { TbCreditCard } from 'react-icons/tb'
import { GrCurrency } from 'react-icons/gr'
import { IoPower } from 'react-icons/io5'

export const mobileOptionCards = [
    {
        id: 1,
        icon: MdOutlineLightMode,
        text: 'Тема',
        rightIcon: ThemeSwitcher,
        settings: {
            size: '30px',
            color: {
                theme_light: 'black',
                theme_dark: 'white',
            },
        },
    },
    {
        id: 2,
        icon: HiOutlineMail,
        text: 'Почта',
        rightIcon: IoChevronForwardSharp,
        settings: {
            size: '30px',
            color: {
                theme_light: 'black',
                theme_dark: 'white',
            },
        },
    },
    {
        id: 3,
        icon: RiLock2Line,
        text: 'Пароль',
        rightIcon: IoChevronForwardSharp,
        settings: {
            size: '30px',
            color: {
                theme_light: 'black',
                theme_dark: 'white',
            },
        },
    },
    {
        id: 4,
        icon: IoPhonePortraitOutline,
        text: 'Сеансы',
        rightIcon: IoChevronForwardSharp,
        settings: {
            size: '30px',
            color: {
                theme_light: 'black',
                theme_dark: 'white',
            },
        },
    },
    {
        id: 5,
        icon: TbCreditCard,
        text: 'Способы оплаты',
        rightIcon: IoChevronForwardSharp,
        settings: {
            size: '30px',
            color: {
                theme_light: 'black',
                theme_dark: 'white',
            },
        },
    },
    {
        id: 6,
        icon: GrCurrency,
        text: 'Валюта',
        rightIcon: IoChevronForwardSharp,
        settings: {
            size: '30px',
            color: {
                theme_light: 'black',
                theme_dark: 'white',
            },
        },
    },
    {
        id: 7,
        icon: IoPower,
        text: 'Выйти',
        rightIcon: null,
        settings: {
            size: '30px',
            color: {
                theme_light: 'red',
                theme_dark: 'red',
            },
        },
    },
]
