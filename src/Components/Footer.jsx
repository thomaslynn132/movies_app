import { MdPrivacyTip } from "react-icons/md";
import { VscDebugRestart } from "react-icons/vsc";
import { kbz, qr, wave } from "../Assets";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import "./Footer.css";
import {
  FaFacebook,
  FaInstagram,
  FaViber,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="container-fluid" style={{ marginRight: "5vw" }}>
      <div className="footerCtn">
        <div className="d-flex flex-row start">
          <div className="footerContent d-flex flex-column start text-start">
            <h5>Customer Service</h5>
            <p style={{ textAlign: "start" }}>
              <MdPrivacyTip className="m-1" />
              Terms and Privacy <br />
              <VscDebugRestart className="m-1" /> Return Policy
            </p>
          </div>
          <div className="footerContent d-flex flex-column  text-start">
            <h5>Language</h5>
            <div className="d-flex flex-row " style={{ alignItems: "center" }}>
              <input type="radio" name="Language" value="English" />
              <label className="mx-1">English</label>
            </div>
            <br />
            <div className="d-flex flex-row" style={{ textAlign: "start" }}>
              <input type="radio" name="Language" value="Myanmar(Zawgyi)" />
              <label className="mx-1">Myanmar(Zawgyi)</label>
            </div>
            <br />
            <div className="d-flex flex-row" style={{ textAlign: "start" }}>
              <input type="radio" name="Language" value="Myanmar(Unicode)" />
              <label className="mx-1">Myanmar(Unicode)</label>
            </div>
          </div>
        </div>

        <div className="d-flex flex-row start">
          <div className="footerContent" style={{ textAlign: "start" }}>
            <h5>Contact Us</h5>
            <p>
              <IoLocationOutline className="m-1" /> Lay Daunt Kan Main Road,
              Cashmere Stop, Near Zawana, Thingangyun Tsp, Yangon <br />
              <FiPhone className="m-1" /> 09458489458
            </p>
          </div>
          <div className="footerContent d-flex flex-column text-start">
            <h5>Download Our App</h5>
            <img
              src={qr}
              alt="qr code for download link"
              height={150}
              width={150}
            />
          </div>
        </div>

        <div className="d-flex flex-row start">
          <div className="footerContent d-flex flex-column text-start">
            <h5>Payment</h5>{" "}
            <div className="d-flex flex-row">
              <img src={kbz} alt="KBZ" height={40} className="mx-1 rounded" />
              <img
                src={wave}
                alt="WAVE"
                height={40}
                className="mx-1 rounded "
              />
            </div>
          </div>
          <div className="footerContent d-flex flex-column text-start">
            <h5>Follow Us On</h5>
            <div className="">
              <FaFacebook
                size={30}
                className="m-1"
                style={{ color: "#1877F2" }}
              />
              <FaInstagram
                size={30}
                color="white"
                className="m-1 rounded Instagram"
              />
              <FaViber
                size={30}
                className="rounded m-1"
                color="white"
                style={{ backgroundColor: "#665CAC", cursor: "pointer" }}
              />
              <FaTelegram
                size={30}
                className="m-1"
                style={{ cursor: "pointer", color: "#0088cc" }}
              />
              <FaTwitter size={30} color="#1DA1F2" className="m-1" />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
