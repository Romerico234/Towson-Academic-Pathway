import "./HomeComponent.css";

export default function HomeComponent() {
    return (
        <div>
            <div className="Header">Towson Academic Planner</div>
            <div
                className="text-2xl"
                style={{ textAlign: "center", margin: "100px" }}
            >
                TAP is made by and for students. Here, find all your enrollment
                needs and plan for a successful college experience.
            </div>

            <div className="subHeader text-3xl">Features</div>
            <div className="Row">
                <div
                    className="Card"
                    style={{ width: "30%", float: "left", margin: "1.5%" }}
                >
                    <p className="text-xl" style={{ textAlign: "center" }}>
                        Plan your Degree
                    </p>
                    <div className="textBox" style={{ height: 200 }}>
                        Plan your degree from your first day on campus to your
                        gradutation date all in one place. Ensure from the
                        beginning that you cover every credit and prerequisite
                        to make your college experience as smooth as possible.
                    </div>
                </div>

                <div
                    className="Card"
                    style={{ width: "30%", float: "left", margin: "1.5%" }}
                >
                    <p className="text-xl" style={{ textAlign: "center" }}>
                        Class Catalog
                    </p>
                    <div className="textBox" style={{ height: 200 }}>
                        View Towson's course catalog all in one place helps you
                        get a picture of what is available to you. Using our
                        filtering tools, look for a specific class, view a whole
                        department, or search the open classes for a last minute
                        schedule filler.
                    </div>
                </div>

                <div
                    className="Card"
                    style={{ width: "30%", float: "left", margin: "1.5%" }}
                >
                    <p className="text-xl" style={{ textAlign: "center" }}>
                        AI Assitance
                    </p>
                    <div className="textBox" style={{ height: 200 }}>
                        Take advantage of the explosion in AI technologies to
                        help you plan your degree. Our application uses AI to
                        organize your classes into the optimal order for you to
                        achieve your academic goals at Towson University.
                    </div>
                </div>
            </div>
            <br />

            <div className="subHeader text-3xl">Meet The Team</div>
            <div className="Row">
                <div
                    className="Card"
                    style={{ width: "30%", float: "left", margin: "1.5%" }}
                >
                    <p className="text-xl" style={{ textAlign: "center" }}>
                        Scheduling Assistant
                    </p>
                    <div className="textBox" style={{ height: 150 }}>
                        Hello, I'm Romerico. I'm a student at Towson University
                        and I'm interested in software engineering.
                    </div>
                </div>

                <div
                    className="Card"
                    style={{ width: "30%", float: "left", margin: "1.5%" }}
                >
                    <p className="text-xl" style={{ textAlign: "center" }}>
                        Timothy DeLloyd
                    </p>
                    <div className="textBox" style={{ height: 150 }}>
                        Hello, I'm Tim. I'm a Towson University math major
                        interested in data analytics, operations research,
                        machine learning, artificial intelligence, programming,
                        and logic.
                    </div>
                </div>

                <div
                    className="Card"
                    style={{ width: "30%", float: "left", margin: "1.5%" }}
                >
                    <p className="text-xl" style={{ textAlign: "center" }}>
                        Mitchell Griff
                    </p>
                    <div className="textBox" style={{ height: 150 }}>
                        Hi I'm Mitch. I'm a senior at Towson University studying
                        software engineering.
                    </div>
                </div>
            </div>
        </div>
    );
}
