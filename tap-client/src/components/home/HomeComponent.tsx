import "./HomeComponent.css";
import studentImg from "../../../src/assets/home-assets/stock-students.jpg"
import planImg from "../../../src/assets/home-assets/stock-plan.jpg"
import aiImg from "../../../src/assets/home-assets/stock-ai.jpg"
import collegeImg from "../../../src/assets/home-assets/stock-TU.jpg"
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
                    <p className="text-2xl text-center">
                        The Mission
                    </p>
                    <div className="w-full p-8 text-center h-[200px]">
                        Towson Academic Pathway is a student-made and student-run service. We are dedicated to 
                        providing exceptional planning services to help you achieve your goals during your
                        time at Towson University. 

                        <br />

                        <button
                            onClick={handleClick}
                            className="px-3 py-1 mt-3 bg-towsonGold text-white font-medium rounded-lg hover:bg-towsonGoldDark transition"
                        >
                            Meet the Team
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-5 text-center bg-towsonGold mt-5 text-3xl">Features</div>
            <div className="flex mt-10 h-screen items-center justify-center">
                <div className="p-5 mt-5 w-[30%] m-[1.5%] float-left">
                    <p className="text-2xl text-center">
                        Plan your Degree
                    </p>
                    <div className="w-full p-8 text-center h-[200px]">
                        Plan your degree from your first day on campus to your
                        gradutation date all in one place. Ensure from the
                        beginning that you cover every credit and prerequisite
                        to make your college experience as smooth as possible.
                    </div>
                </div>

                <img src={studentImg} alt="Students on steps" className="w-[50%]"/>
            </div>

            <div className="flex mt-10 h-screen items-center justify-center">
                <img src={planImg} alt="Person planning" className="w-[50%]"/>
                <div className="p-5 mt-5 w-[30%] m-[1.5%] float-left">
                    <p className="text-2xl text-center">
                        Class Catalog
                    </p>
                    <div className="w-full p-8 text-center h-[200px]">
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
                    <p className="text-2xl text-center">
                        AI Assistance
                    </p>
                    <div className="w-full p-8 text-center h-[200px]">
                        Take advantage of the explosion in AI technologies to
                        help you plan your degree. Our application uses AI to
                        organize your classes into the optimal order for you to
                        achieve your academic goals at Towson University.
                    </div>
                </div>

                <img src={aiImg} alt="Human hand touching a robot hand" className="w-[50%]"/>
            </div><br />

            {/* <div className="p-5 text-center bg-towsonGold mt-5 text-3xl">Meet The Team</div>
            <div className="flex">
                <div className="p-5 mt-5 w-[30%] m-[1.5%] float-left">
                    <p className="text-xl text-center">
                        Scheduling Assistant
                    </p>
                    <div className="w-full p-8 text-center h-[150px]">
                        Hello, I'm Romerico. I'm a student at Towson University
                        and I'm interested in software engineering.
                    </div>
                </div>

                <div className="p-5 mt-5 w-[30%] m-[1.5%] float-left">
                    <p className="text-xl text-center">
                        Timothy DeLloyd
                    </p>
                    <div className="w-full p-8 text-center h-[150px]">
                        Hello, I'm Tim. I'm a Towson University math major
                        interested in data analytics, operations research,
                        machine learning, artificial intelligence, programming,
                        and logic.
                    </div>
                </div>

                <div className="p-5 mt-5 w-[30%] m-[1.5%] float-left">
                    <p className="text-xl text-center">
                        Mitchell Griff
                    </p>
                    <div className="w-full p-8 text-center h-[150px]">
                        Hi I'm Mitch. I'm a senior at Towson University studying
                        software engineering.
                    </div>
                </div>
            </div> */}
        </div>
    );
}
