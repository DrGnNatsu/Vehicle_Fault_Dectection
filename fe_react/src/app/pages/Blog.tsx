import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
import VersionCard from "@/components/VersionCard.tsx";
import '../css/Blog.css';

import {blogData} from "@/constants/blogData.ts"

export default function Blog() {
    return (
        <div className="blogContainer">
            <AfterNavigation />
            
            <main className="blogMain">
                <header className="blogHeader">
                    <h1 className="blogTitle">Changelog</h1>
                    <p className="blogSubtitle">
                        Stay updated with the latest features, improvements, and bug fixes for CameraLanguage.
                    </p>
                </header>

                <div className="versionList">
                    {blogData.map((data, index) => (
                        <div key={index} className="versionCardWrapper">
                            <VersionCard 
                                version={data.version}
                                date={data.date}
                                sections={data.sections}
                                tags={data.tags}
                            />
                        </div>
                    ))}
                </div>
            </main>  

            <Footer />
        </div>
    );
}