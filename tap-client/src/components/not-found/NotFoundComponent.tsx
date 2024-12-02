import Lottie from "lottie-react";
import notFoundImg from "../../assets/not-found-assets/not-found.json";

export default function NotFoundComponent() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Lottie
                animationData={notFoundImg}
                loop={true} // Set looping
                autoplay={true} // Set autoplay
                height={150} // Set height
                width={150} // Set width
            />
        </div>
    );
}
