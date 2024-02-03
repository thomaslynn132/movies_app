import { MdPrivacyTip } from "react-icons/md";
import { VscDebugRestart } from "react-icons/vsc";
import { kbz, qr, wave } from "../Assets";
import { IoLocationOutline } from "react-icons/io5";
import {
  FaFacebook,
  FaInstagram,
  FaViber,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa6";
const Footer = () => {
  return (
    <>
      <div className="footer d-flex text-start flex-start">
        <div className="footerContent">
          <h5>Customer Service</h5>
          <p>
            <MdPrivacyTip />
            Terms and Privacy <br />
            <VscDebugRestart /> Return Policy
          </p>
        </div>
        <div className="footerContent">
          <h5>Language</h5>
          <div className="d-flex flex-row">
            <input type="radio" name="Language" value="English" />
            <label className="mx-1">English</label>
          </div>
          <br />
          <div className="d-flex flex-row">
            <input type="radio" name="Language" value="Myanmar (Zawgyi)" />
            <label className="mx-1">Myanmar (Zawgyi)</label>
          </div>
          <br />
          <div className="d-flex flex-row">
            <input type="radio" name="Language" value="Myanmar (Unicode)" />
            <label className="mx-1">Myanmar(Unicode)</label>
          </div>
        </div>
        <div className="footerContent">
          <h5>Contact Us</h5>
          <p>
            <IoLocationOutline /> Lay Daunt Kan Main Road, Cashmere Stop, Near
            Zawana, Thingangyun Tsp, Yangon
          </p>
        </div>
        <div className="footerContent">
          <h5>Download Our App</h5>
          <img src={qr} alt="qr code for download link" height={180} />
        </div>
        <div className="footerContent">
          <h5>Payment</h5>
          <div className="d-flex flex-row">
            <img src={kbz} alt="KBZ" height={40} className="mx-1 rounded" />
            <img src={wave} alt="WAVE" height={40} className="mx-1 rounded " />
          </div>
        </div>
      </div>
      <div className="footerContent">
        <h5>Follow Us On</h5>
        <div className="d-flex flex-row">
          <FaFacebook size={30} color="blue" className="m-1" />
          <FaInstagram size={30} color="blue" className="m-1 " />
          <FaViber
            size={30}
            className="rounded m-1"
            color="white"
            style={{ backgroundColor: "purple", cursor: "pointer" }}
          />
          <FaTelegram size={30} color="blue" className="m-1" />
          <FaTwitter size={30} color="blue" className="m-1" />
        </div>
      </div>
    </>
  );
};

export default Footer;
