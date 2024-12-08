import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductByShopOwnerId } from '../../service/ShopOwner/shopOwnerApi';


const ShopOwnerProductDetail = () => {
    const { shopId, productId } = useParams(); // Lấy shopOwner_id từ URL
    const [product, setProduct] = useState(null); // Dữ liệu cửa hàng
    const [error, setError] = useState(null); // Trạng thái lỗi
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProductByShopOwnerId(shopId);

                if (response && Array.isArray(response.data)) {
                    // Tìm đơn hàng dựa trên orderId
                    const selectedProducts = response.data.find(product => product._id === productId);
                    if (selectedProducts) {
                        setProduct(selectedProducts);
                    } else {
                        setError('Không tìm thấy Sản Phẩm.');
                    }
                } else {
                    setError('Dữ liệu trả về không hợp lệ.');
                }
            } catch (error) {
                console.error("Lỗi khi lấy đơn hàng:", error);
                setError('Không thể tải hóa đơn. Vui lòng thử lại sau.');
            }
        };

        fetchProducts();
    }, [shopId, productId]);

    if (error) return <div className="alert alert-danger">{error}</div>; // Hiển thị lỗi nếu có

    if (!product) return <div>Loading...</div>; // Hiển thị trạng thái chờ
    return (
        <div className="content-wrapper">
            {/* Header */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Chi tiết Sản phẩm</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">ShopOwnerProductDetail</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="card card-solid">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <div className="col-12">
                                    <img src={product.images} className="product-image" alt="Product Image" />
                                </div>

                            </div>
                            <div className="col-12 col-sm-6">
                                <h1 className="my-3">{product.name}</h1>
                                <p>{product.description}</p>

                                <hr />
                                <h4>{product.price} VND</h4>
                                <hr />
                                <h4>Loại:</h4>

                                
                                {product.categories.map((category, index) => (
                                    <h4 key={index}>
                                        <p>{category.categoryProduct_name}</p>
                                        
                                    </h4>
                                ))}
                                
                                
                                
                       

                               

                                <div className="mt-4 product-share">
                                    <a href="#" className="text-gray">
                                        <i className="fab fa-facebook-square fa-2x"></i>
                                    </a>
                                    <a href="#" className="text-gray">
                                        <i className="fab fa-twitter-square fa-2x"></i>
                                    </a>
                                    <a href="#" className="text-gray">
                                        <i className="fas fa-envelope-square fa-2x"></i>
                                    </a>
                                    <a href="#" className="text-gray">
                                        <i className="fas fa-rss-square fa-2x"></i>
                                    </a>
                                </div>
                            </div>
                        </div>


                        <button
                            className="btn btn-secondary ml-2 mt-3"
                            onClick={() => navigate(-1)}
                        >
                            Quay lại
                        </button>
                    </div>
                </div>
            </section>


        </div>


    );
};

export default ShopOwnerProductDetail;
