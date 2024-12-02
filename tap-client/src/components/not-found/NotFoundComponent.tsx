import Lottie from "lottie-react";
import notFoundImg from "../../assets/not-found-assets/not-found.json";

export default function NotFoundComponent() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Lottie
                animationData={notFoundImg}
                loop={true} // Set looping
                autoplay={true} // Set autoplay
                className="w-1/2 h-1/2"
            />
        </div>
    );
}
