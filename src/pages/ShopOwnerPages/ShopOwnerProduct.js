import React from 'react';

const ShopOwnerProduct = ({ name, price, image }) => {
    return (
        <div className="col-12 col-sm-6 col-md-3 d-flex align-items-stretch flex-column">
            <div className="card bg-light d-flex flex-fill">
                <div className="card-body pt-4">
                    <div className="row">
                        <div className="col-12 text-center">
                            <img src={image} alt="product-avatar" className="img-circle img-fluid mb-3" />
                        </div>
                        <div className="col-12 ">
                            <h2 className="lead">
                                <b>{name}</b>
                            </h2>
                            <p className="text-muted text-sm">
                                <b>{price} VND</b>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="text-right">
                        <a href="#" className="btn btn-sm btn-primary">
                            Chi Tiết
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopOwnerProduct;
