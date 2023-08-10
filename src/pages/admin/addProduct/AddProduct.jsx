import { useEffect, useState } from "react";
import "./AddProduct.css";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { publicRequest, userRequest } from "../../../requestMethods";
import { useLocation, useNavigate } from "react-router-dom";

export const AddProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathName = location.pathname.split("/")[2];
  const pdtId = location?.pathname?.split("/")[3];
  pdtId && console.log(pdtId);
  const addPdtPath = pathName === "addProduct";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState([]);
  const [inStock, setInStock] = useState(true);
  const [colorList, setColorList] = useState([""]);
  const [categoryList, setCategoryList] = useState([""]);

  useEffect(() => {
    const getPdtById = async () => {
      try {
        const res = await publicRequest.get("products/find/" + pdtId);

        setTitle(res.data?.title);
        setDescription(res.data?.desc);
        setImageUrl(res.data?.img);
        setSize(res.data?.size);
        setPrice(res.data?.price);
        setInStock(res.data?.inStock);
        setCategoryList(res.data?.categories);
        setColorList(res.data?.color);
      } catch (error) {
        console.log(error);
      }
    };
    if (pdtId) {
      getPdtById();
    }
  }, [pdtId]);

  const handleSize = (val) => {
    setSize(val.split(","));
  };

  const options = [
    { label: "Xtra Small", value: "XS" },
    { label: "Small", value: "S" },
    { label: "Medium", value: "M" },
    { label: "Large", value: "L" },
    { label: "Xtra Large", value: "XL" },
    { label: "Xtra Xtra Large", value: "XXL" },
  ];

  const handleInputAdd = (name) => {
    if (name === "color") {
      setColorList([...colorList, ""]);
    } else if (name === "category") {
      setCategoryList([...categoryList, ""]);
    }
  };

  const handleInputChange = (value, index, name) => {
    if (name === "color") {
      const list = [...colorList];
      list[index] = value;
      setColorList(list);
    } else if (name === "category") {
      const list = [...categoryList];
      list[index] = value;
      setCategoryList(list);
    }
  };

  const handleInputRemove = (index, name) => {
    console.log(index);
    if (name === "color") {
      const list = [...colorList];
      list.splice(index, 1);
      setColorList(list);
    } else if (name === "category") {
      const list = [...categoryList];
      list.splice(index, 1);
      setCategoryList(list);
    }
  };

  const addProduct = async () => {
    let ReqObj = {
      title: title,
      desc: description,
      img: imageUrl,
      categories: categoryList,
      size: size,
      color: colorList,
      price: price,
      inStock: inStock,
    };
    try {
      const res = await userRequest.post("products", ReqObj);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = async () => {
    let ReqObj = {
      title: title,
      desc: description,
      img: imageUrl,
      categories: categoryList,
      size: size,
      color: colorList,
      price: price,
      inStock: inStock,
    };
    console.log(ReqObj);
    try {
      const res = await userRequest.put(`products/${pdtId}`, ReqObj);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-product-form">
      <div className="container">
        <form>
          {addPdtPath ? (
            <h2 className="ms-5" align="center">
              Add Product
            </h2>
          ) : (
            <h2 className="ms-5" align="center">
              Edit Product
            </h2>
          )}

          <div className="row">
            <div className="col-lg">
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg">
              <div className="form-group">
                <label htmlFor="Description">Description:</label>
                <textarea
                  className="form-control"
                  id="Description"
                  rows={3}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg">
              <div className="form-group">
                <div className="imgLabel mb-2">
                  <label htmlFor="Image">Image URL:</label>
                  {imageUrl && (
                    <img className="addPdtImg" src={imageUrl} alt="img" />
                  )}
                </div>
                <input
                  type="text"
                  id="Image"
                  className="form-control"
                  placeholder="Image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg">
              <div className="form-group sizeInput">
                <label htmlFor="size">Size</label>

                <MultiSelect
                  id="size"
                  onChange={handleSize}
                  options={options}
                  defaultValue={size}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg">
              <div className="form-group dyn-btn-group">
                <div className="color-label mt-2 mb-2 d-flex align-items-center justify-content-between">
                  <label className="ms-2" htmlFor="Color">
                    Categories:
                  </label>
                  <button
                    type="button"
                    className="btn btn-primary add-btn me-2"
                    onClick={() => handleInputAdd("category")}
                  >
                    Add
                  </button>
                </div>
                <div className="color-inputs-group ">
                  {categoryList.map((singleCategory, index) => (
                    <div className="color-inputs" key={index}>
                      <InputGroup className="mb-3 color-input">
                        <Form.Control
                          value={singleCategory}
                          placeholder={`Category - ${index + 1}`}
                          onChange={(e) =>
                            handleInputChange(e.target.value, index, "category")
                          }
                        />
                        {categoryList.length > 1 && (
                          <Button
                            variant="danger"
                            id="button-addon2"
                            onClick={() => handleInputRemove(index, "category")}
                          >
                            Remove
                          </Button>
                        )}
                      </InputGroup>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg">
              <div className="form-group dyn-btn-group">
                <div className="color-label mt-2 mb-2 d-flex align-items-center justify-content-between">
                  <label className="ms-2" htmlFor="Color">
                    Colors Available:
                  </label>
                  <button
                    type="button"
                    className="btn btn-primary add-btn me-2"
                    onClick={() => handleInputAdd("color")}
                  >
                    Add
                  </button>
                </div>
                <div className="color-inputs-group ">
                  {colorList.map((singleColor, index) => (
                    <div className="color-inputs" key={index}>
                      <InputGroup className="mb-3 color-input">
                        <Form.Control
                          value={singleColor}
                          placeholder={`Color - ${index + 1}`}
                          onChange={(e) =>
                            handleInputChange(e.target.value, index, "color")
                          }
                        />
                        {colorList.length > 1 && (
                          <Button
                            variant="danger"
                            id="button-addon2"
                            onClick={() => handleInputRemove(index, "color")}
                          >
                            Remove
                          </Button>
                        )}
                      </InputGroup>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg">
              <div className="form-group">
                <label htmlFor="Price">Price:</label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    className="form-control"
                    placeholder="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
              </div>
            </div>
            <div className="col-lg">
              <div className="form-group">
                <label>Stock Available:</label>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="stockSwitch"
                    checked={inStock}
                    onChange={() => setInStock(!inStock)}
                  />
                  <label className="form-check-label" htmlFor="stockSwitch">
                    {inStock ? (
                      <span className="text-success">Available</span>
                    ) : (
                      <span className="text-danger">Not-Available</span>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4 mb-4">
            <div className="d-flex align-items-center justify-content-around">
              <button
                className="btn btn-outline-danger btn-lg"
                onClick={() => navigate("/admin")}
              >
                Cancel
              </button>
              {addPdtPath ? (
                <button
                  className="btn btn-danger submit-btn btn-lg"
                  onClick={addProduct}
                >
                  Add Product
                </button>
              ) : (
                <button
                  className="btn btn-danger submit-btn btn-lg"
                  onClick={editProduct}
                >
                  Edit Product
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
