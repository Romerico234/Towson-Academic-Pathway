import collegeImg from "../../../src/assets/home-assets/stock-TU.jpg"
import capLottie from "../../../src/assets/home-assets/capLottie.json"
import aiLottie from "../../../src/assets/home-assets/aiLottie.json"
import studentsLottie from "../../../src/assets/home-assets/studentsLottie.json"
import Lottie from "lottie-react";
import { useNavigate } from 'react-router-dom';

export default function HomeComponent() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/about');
    }

    return (
        <div>
            <div className="flex mt-10 h-screen items-center justify-center">
                <img src={collegeImg} alt="Lanscape photo of Towson University" className="w-[50%]"/>
                <div className="p-5 mt-5 w-[30%] m-[1.5%] float-left">
                    <p className="text-2xl text-center text-towsonGraphiteDark">
                        The Mission
                    </p>
                    <div className="w-full p-8 text-center h-[200px] text-towsonGraphiteDark">
                        Towson Academic Pathway is a student-made and student-run service. We are dedicated to 
                        providing exceptional planning services to help you achieve your goals during your
                        time at Towson University. 

                        <br />

                        <button
                            onClick={handleClick}
                            className="px-3 py-1 mt-3 bg-towsonGold text-towsonWhite font-medium rounded-lg hover:bg-towsonGoldDark transition"
                        >
                            Meet the Team
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex mt-10 h-screen items-center justify-center">
                <div className="p-3 mt-5 w-[30%] float-left">
                    <p className="text-3xl text-center text-towsonGraphiteDark">
                        Plan your Degree
                    </p>
                    <div className="w-full p-8 text-center h-[200px] text-towsonGraphiteDark">
                        Plan your degree from your first day on campus to your
                        gradutation date all in one place. Ensure from the
                        beginning that you cover every credit and prerequisite
                        to make your college experience as smooth as possible.
                    </div>
                </div>

                <Lottie
                    animationData={capLottie}
                    loop={true} // Set looping
                    autoplay={true} // Set autoplay
                    className="w-[350px] ml-[200px]"
                />
            </div>

            <div className="flex mt-10 h-screen items-center justify-center">

                    <Lottie
                        animationData={studentsLottie}
                        loop={true} // Set looping
                        autoplay={true} // Set autoplay
                        className="w-[850px]"
                    />

                <div className="p-5 mt-5 w-[30%] m-[1.5%] float-left">
                    <p className="text-3xl text-center text-towsonGraphiteDark">
                        Course Catalog
                    </p>
                    <div className="w-full p-8 text-center h-[200px] text-towsonGraphiteDark">
                        View Towson's course catalog all in one place helps you
                        get a picture of what is available to you. Using our
                        filtering tools, look for a specific class, view a whole
                        department, or search the open classes for a last minute
                        schedule filler.
                    </div>
                </div>
            </div>

            <div className="flex mt-10 h-screen items-center justify-center">
                <div className="p-5 mt-5 w-[30%] m-[1.5%] float-left">
                    <p className="text-3xl text-center text-towsonGraphiteDark">
                        AI Assistance
                    </p>
                    <div className="w-full p-8 text-center h-[200px] text-towsonGraphiteDark">
                        Take advantage of the explosion in AI technologies to
                        help you plan your degree. Our application uses AI to
                        organize your classes into the optimal order for you to
                        achieve your academic goals at Towson University.
                    </div>
                </div>

                <Lottie
                        animationData={aiLottie}
                        loop={true} // Set looping
                        autoplay={true} // Set autoplay
                        className="w-[400px] ml-[200px]"
                    />
            </div>
        </div>
    );
}
