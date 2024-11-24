import "./HomeComponent.css"

export default function HomeComponent() {
    return (
        <div>
            <div className="Header">Towson Academic Pathway</div>

            <div className="Row">
                <div className="leftColumn">
                    <div className="Card">
                        <p className="text-2xl" style={{marginBottom:10}}>Daily Message</p>
                        <div className="fakeImg" style={{height:86}}>Here is some demo text. Update with daily
                            advisories for the users.
                        </div>
                    </div>
                    <div className="Card">
                        <p className="text-2xl" style={{marginBottom:10}}>Current Enrollment</p>
                        <div className="fakeImg" style={{height:200}}>Placeholder for current classes.</div>
                    </div>
                </div>
                <div className="rightColumn">
                    <div className="Card">
                        <p className="text-xl">Updates</p>
                        <div className="fakeImg" style={{height:100}}>Updates about system operations</div>
                    </div>
                    <div className="Card">
                        <p className="text-xl" style={{paddingBottom:10}}>To-Do's</p>

                        <p className="text-lg">Holds</p>
                        <div className="fakeImg">Placeholder</div><br />

                        <p className="text-lg">Tasks</p>
                        <div className="fakeImg">Placeholder</div>
                    </div>
                </div>
            </div>

            <div className="Footer">
                <p className="text-xl">Footer Placeholder</p>
            </div>
        </div>
    );
}