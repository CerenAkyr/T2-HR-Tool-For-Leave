import iceCream from '../assets/ice-cream.png';
import "./MissingPage.css"

const MissingPage = () => {
    return (
        <div className="missing-page">
            <img src={iceCream} alt="ice-cream" />
            <h1>Bu Sayfa Bir Dondurma Yemiş Olabilir</h1>
            <h2>Belki de bu sayfa henüz hazır değildir... </h2>
        </div>
    );
}

export default MissingPage;