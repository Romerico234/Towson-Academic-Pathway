export default function FooterComponent() {
    return (
        <footer className="bg-towsonBlack text-towsonWhite border-t-4 border-towsonGold">
            {/* Links Section */}
            <div className="flex justify-center space-x-8 py-6 text-lg">
                <a
                    href="/home"
                    className="hover:text-towsonLineGold transition duration-300"
                >
                    Home
                </a>
                <a
                    href="/about"
                    className="hover:text-towsonLineGold transition duration-300"
                >
                    About
                </a>
                <a
                    href="/faq"
                    className="hover:text-towsonLineGold transition duration-300"
                >
                    FAQ
                </a>
                <a
                    href="/contact-us"
                    className="hover:text-towsonLineGold transition duration-300"
                >
                    Contact Us
                </a>
            </div>

            {/* Copyright Section */}
            <div className="text-center py-4 text-sm bg-opacity-90">
                <p className="text-towsonWhite">
                    Made by ඞ, Romerico David, Timothy DeLloyd, Mitchell Griff,
                    Zachary Hall, and ඞ.
                </p>
                <p className="text-towsonWhite opacity-75">
                    © 2024 Towson Academic Pathway. All rights reserved.
                </p>
            </div>

            {/* Hidden Link */}
            <a
                href="https://en.wikipedia.org/wiki/Pikmin_3"
                className="absolute bottom-2 right-2 opacity-0"
                aria-hidden="true"
            >
                Pikmin 3
            </a>

            {/* Hidden Link */}
            <a
                href="https://en.wikipedia.org/wiki/Pikmin"
                className="absolute bottom-2 left-2 opacity-0"
                aria-hidden="true"
            >
                Pikmin
            </a>
        </footer>
    );
}
