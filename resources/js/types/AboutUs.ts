import { AiFillGoogleCircle } from 'react-icons/ai';
import { FaFacebook, FaTelegram } from 'react-icons/fa';
import { IoLogoGithub } from 'react-icons/io';

const iconMap = {
    IoLogoGithub: IoLogoGithub,
    FaFacebook: FaFacebook,
    FaTelegram: FaTelegram,
    AiFillGoogleCircle: AiFillGoogleCircle,
};

type IconMapKeys = keyof typeof iconMap;

type PersonType = {
    image: string;
    name: string;
    info: InfoPersonType[];
};

type InfoPersonType = {
    icon: IconMapKeys;
    url: string;
    name: string;
};

export const MentorData: PersonType[] = [
    {
        image: '/cher-chhaya.png',
        name: 'CHAN CHHAYA',
        info: [
            { icon: 'IoLogoGithub', url: 'https://github.com/it-chhaya', name: 'it-chhaya' },
            { icon: 'FaFacebook', url: 'https://web.facebook.com/chhayadevkh', name: 'Chan Chhaya' },
            { icon: 'AiFillGoogleCircle', url: 'mailto:it.chhaya@gmail.com', name: 'it.chhaya@gmail.com' },
            { icon: 'FaTelegram', url: 'https://github.com/it-chhaya', name: 'Chhaya Chan' },
        ],
    },
    {
        image: '/images/cher-pheng.jpg',
        name: 'KIM CHANSOKPHENG',
        info: [
            { icon: 'IoLogoGithub', url: 'https://github.com/sokpheng001', name: 'sokpheng001' },
            {
                icon: 'FaFacebook',
                url: 'https://web.facebook.com/profile.php?id=100085375058298',
                name: 'Kim Chansokpheng',
            },
            {
                icon: 'AiFillGoogleCircle',
                url: 'mailto:kimchansokpheng123@gmail.com',
                name: 'kimchansokpheng123@gmail.com',
            },
            { icon: 'FaTelegram', url: '@sokpheng001', name: '@sokpheng001' },
        ],
    },
];

export const MemberData: PersonType[] = [
    {
        image: '/images/chiso.jpg',
        name: 'Proeung Chiso',
        info: [
            { icon: 'IoLogoGithub', url: 'https://github.com/ProeungChiso', name: 'Proeung Chiso' },
            { icon: 'FaFacebook', url: 'https://web.facebook.com/chiso.soo', name: 'Proeung Chiso' },
            { icon: 'AiFillGoogleCircle', url: 'mailto:mrr.chiso@gmail.com', name: 'mrr.chiso@gmail.com' },
            { icon: 'FaTelegram', url: 'https://t.me/seakngimphal', name: 'Proeung Chiso' },
        ],
    },
    {
        image: '/images/seakngim.jpg',
        name: 'Phal Seakngim',
        info: [
            { icon: 'IoLogoGithub', url: 'https://github.com/seakngim', name: 'Phal seakngim' },
            { icon: 'FaFacebook', url: 'https://web.facebook.com/seakngim.kptc', name: 'ផល សៀកងីម' },
            { icon: 'AiFillGoogleCircle', url: 'mailto:seakngimsr37@gmail.com', name: 'seakngimsr37@gmail.com' },
            { icon: 'FaTelegram', url: 'https://t.me/seakngimphal', name: 'Phal Seakngim' },
        ],
    },
    {
        image: '/images/sarandy.JPG',
        name: 'Vuth Sarandy',
        info: [
            { icon: 'IoLogoGithub', url: 'https://github.com/VuthSarandy', name: 'Vuth Sarandy' },
            { icon: 'FaFacebook', url: 'https://www.facebook.com/profile.php?id=100094199570357', name: 'Sarandy Vuth' },
            { icon: 'AiFillGoogleCircle', url: 'mailto:sarandyvuth@gmail.com', name: 'sarandyvuth@gmail.com' },
            { icon: 'FaTelegram', url: 'https://t.me/Vsarandy', name: 'Vuth sarandy' },
        ],
    },
    {
        image: '/images/sophanmai.JPG',
        name: 'Phal Sophanmai',
        info: [
            { icon: 'IoLogoGithub', url: 'https://github.com/PhanmaiPhal', name: 'Phal Phanmai' },
            {
                icon: 'FaFacebook',
                url: 'https://www.facebook.com/profile.php?id=100027122165536',
                name: 'Phal Sophanmai',
            },
            { icon: 'AiFillGoogleCircle', url: 'mailto:phannmai576@gmail.com', name: 'phannmai576@gmail.com' },
            { icon: 'FaTelegram', url: 'https://t.me/phalSophanmai', name: 'Sophanmai Phal' },
        ],
    },
    {
        image: '/images/piseth.jpg',
        name: 'Long Piseth',
        info: [
            { icon: 'IoLogoGithub', url: 'https://github.com/Long2Seth', name: 'Long Piseth' },
            { icon: 'FaFacebook', url: 'https://web.facebook.com/long.piseth.792', name: 'Long Piseth' },
            { icon: 'AiFillGoogleCircle', url: 'mailto:longpiseth5555@gmail.com', name: 'longpiseth5555@gmail.com' },
            { icon: 'FaTelegram', url: 'https://t.me/L2SETH', name: 'Long Piseth' },
        ],
    },
    {
        image: '/images/soknem.jpg',
        name: 'POV Soknem',
        info: [
            { icon: 'IoLogoGithub', url: 'https://github.com/soknem', name: 'soknem' },
            { icon: 'FaFacebook', url: 'https://web.facebook.com/pov.soknem', name: 'Pov Soknem' },
            { icon: 'AiFillGoogleCircle', url: 'mailto:povsoknem@gmail.com', name: '' },
            { icon: 'FaTelegram', url: 'https://t.me/pov_soknem', name: '' },
        ],
    },
];
