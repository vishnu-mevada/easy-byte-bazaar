import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../shared/service';
import { SkeletonCategoryCard } from '../../components/skeloton-card';

function Category() {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                let categoryList = await fetchCategories();

                categoryList = await categoryList.map(category => {
                    let image = '';
                    let title = '';

                    switch (category) {
                        case 'electronics':
                            title = category;
                            image = 'electronic-thumbnail.png';
                            break;
                        case 'jewelery':
                            title = category;
                            image = 'jewellery-thumbnail.png';
                            break;
                        case "men's clothing":
                            title = category;
                            image = "manclothes-thumbnail.jpg";
                            break;
                        case "women's clothing":
                            title = category;
                            image = "womenclothes-thumbnail.jpg";
                            break;
                        default:
                            image = "placeholder.jpg";
                            break;
                    }
                    return { title, image };
                });

                setCategories(categoryList);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h2 className="text-3xl font-semibold mt-8 mb-6 text-center">Categories</h2>
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {isLoading ? (
                    <>
                        {[...Array(4)].map((_, index) => (
                            <SkeletonCategoryCard key={index} />
                        ))}
                    </>
                ) : (
                    <>
                        {categories && categories.map((category) => (
                            <CategoryCard key={category.title} category={category} />
                        ))}
                    </>
                )}
            </div>
        </>
    );
}

export default Category;

const CategoryCard = ({ category }) => {

    const handleImageError = (event) => {
        // Set a default image source when an image error occurs
        event.target.src = '/images/placeholder.jpg';
    };

    return (
        <Link to={`/products/${category.title}`}>
            <div className="relative bg-white p-6 rounded-lg shadow-md overflow-hidden cursor-pointer">
                <img
                    src={`/images/${category.image}` || '/images/placeholder.jpg'}
                    alt={category.title}
                    className="w-full h-40 object-cover mb-4 rounded-md shadow-md"
                    onError={handleImageError}
                />
                <div className="absolute bottom-0 left-0 right-0 top-44 p-4 text-black">
                    <h2 className="text-xl font-semibold capitalize">{category.title}</h2>
                </div>
            </div>
        </Link>
    );
};
