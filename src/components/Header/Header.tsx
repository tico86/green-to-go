import logo from '../../assets/logo.svg'
import './Header.scss';

// @ts-ignore
const Header = ({isEcoMode}) => {
    return (
        <header>
            <div className={'header-main'}>
                <div className={'header-main_box'}>
                    <div className={'header-logo'}>
                        <a href="#">
                            <img
                                className="header-logo_img"
                                src={logo}
                                height={'43px'}
                                alt="AXA Logo"
                            />

                        </a>
                    </div>
                    {isEcoMode && (<p style={{fontSize: '2.5rem'}}>🌱</p>)}
                    <nav>
                        <ul>
                            <li>
                                <a href={'#'}>Offers</a>
                            </li>
                            <li>
                                <a href={'#'}>Claims</a>
                            </li>
                            <li>
                                <a href={'#'}>Customer Portal</a>
                            </li>
                            <li>
                                <a href={'#'}>Contact & Services</a>
                            </li>
                            <li>
                                <a href={'#'}>Blog</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
