import { records } from "../assets";
import appGif from "../assets/app.gif"; 
import screeningGif from "../assets/screening.gif"; 
import userGif from "../assets/user.gif";
import exerciseGif from "../assets/exercise.gif";  // ✅ Import Exercise GIF
import newsGif from "../assets/news.gif"; 

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
        name: "profile",
        imageUrl: userGif,
        link: "/profile",
    },
    {
        name: "exercise",
        imageUrl: exerciseGif,  // ✅ Use the GIF for Exercise button
        link: "/exercise",
    },
    {
        name: "news",
        imageUrl: newsGif,  // ✅ Use the GIF for Exercise button
        link: "/news",
    },
];
