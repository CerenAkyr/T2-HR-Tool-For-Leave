import iceCream from '../assets/ice-cream.png';
import "./MissingPage.css"

const MissingPage = () => {
    return (
        <div className="missing__page">
            <img src={iceCream} alt="ice cream" />
            <h1>Bu Sayfa Sıcaktan Erimiş Olabilir</h1>
            <h2>Belki de böyle bir sayfa yoktur... </h2>
        </div>
    );
}

export default MissingPage;