import { records } from "../assets";
import appGif from "../assets/app.gif"; 
import screeningGif from "../assets/screening.gif"; 
import userGif from "../assets/user.gif";
import exerciseGif from "../assets/exercise.gif";
import newsGif from "../assets/news.gif"; 
import foodGif from "../assets/food.gif";


export const navLinks = [
    {
        name: "Community Hub",
        imageUrl: appGif,
        link: "/",
    },
    {
        name: "records",
        imageUrl: records,
        link: "/medical-records",
    },
    {
        name: "screening",
        imageUrl: screeningGif,
        link: "/screening-schedules",
    }, 
    {
        name: "exercise",
        imageUrl: exerciseGif,
        link: "/exercise",
    },
    {
        name: "news",
        imageUrl: newsGif,
        link: "/news",
    },
    {
        name: "Food Scanner",
        imageUrl: foodGif,
        link: "/food-scan",
    },
    {
        name: "profile",
        imageUrl: userGif,
        link: "/profile",
    },
];

