import { Link } from "react-router-dom";
import formatCurrency from "../../utils/currencyFormatter";

interface ProductProps{
    id: number;
    attributes: {
        title: string;
        price: number;
        image: string;
    }
}

const Product = ({id, attributes: {title, price, image}}:ProductProps) => {
  return (
    <Link to={`/products/${id}`}>
        <img src={image} className="w-full h-45" alt={title} />
        <h4 className="mt-2">{title}</h4>
        <h4 className="mt-2">{formatCurrency(price)}</h4>
    </Link>
  )
}

export default Product