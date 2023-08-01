import doggo from '../assets/doggo.png';
import "./Unauthorized.css"

const Unauthorized = () => {
    return (
        <div className="unauthorized">
            <img src={doggo} alt="doggo" />
            <h1>Bu Sayfayı Bir Köpek Yemiş Olabilir</h1>
            <h2>Belki de bu sayfayı görüntülemek için yetkiniz yoktur... </h2>
        </div>
    );
}

export default Unauthorized;