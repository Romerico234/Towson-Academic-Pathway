import silhouette from "../../assets/about-assets/silhouetteStock.jpg"

export default function AboutComponent() {
    return (
        <div>
            <p className="mt-[100px] text-center text-6xl text-towsonGraphiteDark">About Us</p>

            <div className="flex mt-10 items-center justify-left p-5">
                <img src={silhouette} alt="silhouette placeholder" className="w-[25%]"/>
                <div className="p-5 mt-5 w-[40%] m-[1.5%] float-left">
                    <p className="text-2xl">Romerico David</p>
                    <div>Hello, I'm Romerico. I'm a student at Towson University and I'm interested in software engineering.</div>
                </div>
            </div>

            <div className="flex mt-10 items-center justify-left p-5">
                <img src={silhouette} alt="silhouette placeholder" className="w-[25%]"/>
                <div className="p-5 mt-5 w-[40%] m-[1.5%] float-left">
                    <p className="text-2xl">Timothy DeLloyd</p>
                    <div>Hello, I'm Tim. I'm a Towson University math major interested in data analytics, operations research, 
                        machine learning, artificial intelligence, programming, and logic.</div>
                </div>
            </div>

            <div className="flex mt-10 items-center justify-left p-5">
                <img src={silhouette} alt="silhouette placeholder" className="w-[25%]"/>
                <div className="p-5 mt-5 w-[40%] m-[1.5%] float-left">
                    <p className="text-2xl">Mitchell Griff</p>
                    <div>Hello, I'm Mitch. I'm a senior at Towson University studying Computer Science and Software Engineering.
                    </div>
                </div>
            </div>
        </div>
    );
}
