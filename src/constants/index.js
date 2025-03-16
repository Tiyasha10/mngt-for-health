import { records, user, apps, screening } from "../assets";
import exerciseGif from "../assets/exercise.gif";  // ✅ Import Exercise GIF

export const navLinks = [
    {
        name: "dashboard",
        imageUrl: apps,
        link: "/",
    },
    {
        name: "records",
        imageUrl: records,
        link: "/medical-records",
    },
    {
        name: "screening",
        imageUrl: screening,
        link: "/screening-schedules",
    },
    {
        name: "profile",
        imageUrl: user,
        link: "/profile",
    },
    {
        name: "exercise",
        imageUrl: exerciseGif,  // ✅ Use the GIF for Exercise button
        link: "/exercise",
    },
];
