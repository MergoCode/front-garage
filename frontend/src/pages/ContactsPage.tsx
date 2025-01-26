import React, {useState, useEffect} from "react"
import '../css/ContactsPage.sass'
import Loading  from "../components/Loading";
const ContactsPage: React.FC = () => {
    const [loading, setLoading] = useState(true);


    return(
        <div className="contactsContainer">
            <div className="container d-flex justify-content-between px-0">
                <div className="contactsContainer__text col-4">
                    <h1>
                        CONTACT US
                    </h1>
                    <ul className="contactsContainer__list">
                        <li><img src="assets/number-icon.svg" alt="" /><p className="col-6">(032) 239 47 24</p></li>
                        <li><img src="assets/number-icon.svg" alt="" /><p className="col-6">(032) 239 41 82</p></li>
                        <li><img src="assets/gmail-icon.svg" alt="" /><p>electronics.faculty@lnu.edu.ua</p></li>
                    </ul>
                </div>
                    <div className="col-3 mapWrap">
                        <iframe
                            width="100%"
                            height='330'
                            src="https://maps.google.com/maps?width=600&height=600&hl=en&q=Drahomanova%20St,%2050,%20Lviv,%20Lviv%20Oblast,%2079000+(Our%20Location)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                            title="Google Map Location"
                        >
                        <a href="https://www.gps.ie/">gps trackers</a>
                        </iframe> 
                        <a className="link col-7" href="https://www.google.com/maps?ll=49.832594,24.027062&z=15&t=m&hl=en&gl=US&mapclient=embed&q=Drahomanova+St,+50+L%27viv+L%27vivs%27ka+oblast+79000">Драгоманова, 50 </a>
                    </div>
                    <div className="col-3 mapWrap">
                        <iframe
                            width="100%"
                            height='330'
                            src="https://maps.google.com/maps?width=600&amp;height=600&amp;hl=en&amp;q=Henerala%20Tarnavskoho%20St,%20107,%20Lviv,%20Lviv%20Oblast,%2079000+(Our%20Location)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                            title="Google Map Location"
                        >
                        <a href="https://www.gps.ie/">gps trackers</a>
                        </iframe>
                        <a className="link col-7" href="https://www.google.com/maps/place/Fakul%CA%B9tet+Elektroniky+Lnu+Imeni+Ivana+Franka/@49.8285585,24.0382595,17z/data=!4m15!1m8!3m7!1s0x473add642c0a3f8d:0x9fe083bd4cd1cd7e!2sDrahomanova+St,+50,+L'viv,+L'vivs'ka+oblast,+Ukraine,+79000!3b1!8m2!3d49.8321421!4d24.0273361!16s%2Fg%2F1tmk781f!3m5!1s0x473add5bf6b3df7d:0x1456b8ba9a02d3f6!8m2!3d49.8275707!4d24.0415501!16s%2Fg%2F11b5wkwf6x?hl=en&entry=ttu&g_ep=EgoyMDI1MDEyMi4wIKXMDSoASAFQAw%3D%3D">Тарнавського, 107</a> 
                    </div>
                        
            </div>

        </div>
    )
}

export default ContactsPage;
