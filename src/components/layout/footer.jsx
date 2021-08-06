import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer className="footer grid">
                <div className="footer__left">
                    <div className="footer__left__logo">ANALYTICS</div>
                    <div className="footer__left__copyright">&#169; 2021 copyrights</div>
                </div>
                <div className="footer__right">
                    <div className="footer__right__links">
                        <Link to='abc'>Team of services</Link>
                        <Link to='abc'>FAQs</Link>
                        <Link to='abc'>About us</Link>
                        <Link to='abc'>Contact us</Link>
                        <Link to='abc'>Privary policy</Link>
                    </div>
                    <div className="footer__right__social">
                        <Link to='abc' className="footer__right__social__facebook">
                            <i className='bx bxl-facebook-square'></i>
                        </Link>
                        <Link to='abc' className="footer__right__social__instagram">
                            <i className='bx bxl-instagram' ></i>
                        </Link>
                        <Link to='abc' className="footer__right__social__twitter">
                            <i className='bx bxl-twitter' ></i>
                        </Link>
                        <Link to='abc' className="footer__right__social__github">
                            <i className='bx bxl-github' ></i>
                        </Link>
                    </div>
            </div>
        </footer>
    )
}

export default Footer
