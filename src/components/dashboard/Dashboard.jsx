import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const dummyProducts = [
    {
        "id": 1,
        "title": "Backpack Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
    },
    {
        "id": 2,
        "title": "Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
            "rate": 4.1,
            "count": 259
        }
    },
    {
        "id": 3,
        "title": "Mens Cotton Jacket",
        "price": 55.99,
        "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.7,
            "count": 500
        }
    },
    {
        "id": 4,
        "title": "Mens Casual Slim Fit",
        "price": 15.99,
        "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
        "rating": {
            "rate": 2.1,
            "count": 430
        }
    },
];

function Dashboard() {

    const [products, setProducts] = useState([])
    const [isLoading, SetIsLoading] = useState(false);

    useEffect(() => {
        SetIsLoading(true);
        setTimeout(() => {
            setProducts(dummyProducts);
            SetIsLoading(false);
        }, 1000);
    }, [])


    return (
        <div className="mt-4">
            {/* Top Banner */}
            <div className="p-4 text-black text-center">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p className="text-sm mb-4">Welcome</p>
                {isLoading ? (
                    <Skeleton height={384} style={{ marginBottom: '16px' }} />
                ) : (
                    <img
                        src="/images/banner-image.png" // Replace with your actual image URL
                        alt="Dashboard Banner"
                        className="w-full h-96 object-cover mb-4 rounded-md"
                    />
                )}
            </div>

            {/* Product Grid */}
            <div className="container mx-auto my-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {isLoading
                        ? // Render skeleton when loading
                        Array.from({ length: 4 }).map((_, index) => <SkeletonProduct key={index} />)
                        : // Render actual product data when not loading
                        products.map((product) => (
                            <Link key={product.id} to={`product/${product.id}`}>
                                <div className="bg-white p-4 shadow-md rounded-md cursor-pointer">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-40 object-contain mb-2 rounded-md"
                                    />
                                    <p className="text-lg font-semibold mb-2">{product.title}</p>
                                    <p className="text-gray-500">${product.price}</p>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

const SkeletonProduct = () => (
    <div className="bg-white p-4 shadow-md rounded-md cursor-pointer">
        <Skeleton height={160} style={{ marginBottom: '8px' }} />
        <Skeleton height={20} width={120} style={{ marginBottom: '4px' }} />
        <Skeleton height={18} width={80} />
    </div>
);