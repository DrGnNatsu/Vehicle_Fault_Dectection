import {Car, Disc3, Linkedin, Twitter, Youtube} from "lucide-react";
import {Link} from "react-router-dom";
import { Button } from "@/components/ui/button";
import './css/Footer.css';

const socialLinks = [
    {
        name: "Twitter",
        href: "https://twitter.com",
        icon: Twitter,
    },
    {
        name: "Youtube",
        href: "https://youtube.com",
        icon: Youtube,
    },
    {
        name: "Linkedin",
        href: "https://linkedin.com",
        icon: Linkedin,
    },
    {
        name: "Discord",
        href: "https://discord.com",
        icon: Disc3,
    },
];

const footerLinks = [
    {
        name: "Privacy Policy",
        href: "/privacy",
    },
    {
        name: "Terms of Service",
        href: "/terms",
    },
];

export default function Footer() {
    return (
        <footer className="footerContainer">
            <div className="footerContent">
                <div className="footerTop">
                    {/* Logo */}
                    <div className="brandSection">
                        <Car className="logo" strokeWidth={2.5} />
                        <span className="brandName">CarScript</span>
                    </div>

                    {/* Social media (EXTERNAL) */}
                    <div className="socialSection">
                        {socialLinks.map((social) => (
                            <Button key={social.name} variant="ghost" size="icon" asChild className="socialMediaLink">
                                <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                                    <social.icon className="socialIcon" />
                                </a>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Footer bottom */}
                <div className="footerBottom">
                    <p className="copyrightText">
                        &copy; {new Date().getFullYear()} MLT Cooperation. All Rights Reserved.
                    </p>

                    {/* Internal routes */}
                    <div className="footerLinks">
                        {footerLinks.map((link) => (
                            <Link key={link.name} to={link.href} className="footerLink">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
