import Link from "next/link";

const Header = () => {
    return (
        <header className="main-container">
            <h1 className="header__logo-text"><Link href="/">Combinatorics</Link></h1>
        </header>
    );
};

export default Header;