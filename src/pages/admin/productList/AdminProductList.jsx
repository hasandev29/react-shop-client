import "./AdminProductList.css";
import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { StyledLink } from "../../../StyleComps";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { publicRequest, userRequest } from "../../../requestMethods";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";

const AdminProductList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [productsList, setProductsList] = useState([]);
  const [deletePdt, setDeletePdt] = useState({});

  const deleteProduct = async (id) => {
    setIsLoading(true);
    try {
      const res = await userRequest.delete(`products/${id}`);
      console.log(res.data);
      handleClose();
      setDeletePdt({});
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get("products");
        console.log(res.data.data);
        setProductsList(res.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [deletePdt]);

  const deletePdtModal = (id, title) => {
    setDeletePdt({ id: id, title: title });
    handleShow();
    console.log(deletePdt);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "product",
      headerName: "Product",
      width: 280,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "desc", headerName: "Description", width: 220 },
    { field: "inStock", headerName: "Stock", width: 100 },
    { field: "price", headerName: "Price", width: 110 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <StyledLink to={`/admin/editProduct/${params.row._id}`}>
              <button
                type="button"
                className="btn btn-warning btn-sm productListEdit"
              >
                Edit
              </button>
            </StyledLink>
            <DeleteOutlinedIcon
              className="text-danger productListDelete"
              onClick={() => deletePdtModal(params.row._id, params.row.title)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="container">
        <div className="head mb-3 mt-3 d-flex align-items-center justify-content-between">
          <h2 className="ms-4">Products</h2>
          <StyledLink
            color="#fff"
            className="add-product-btn me-3"
            to="/admin/addProduct"
          >
            Add Product
          </StyledLink>
        </div>
        <div className="product-list" style={{ height: 475, width: "100%" }}>
          {isLoading && <LoadingSpinner />}
          <DataGrid
            rows={productsList}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 30]}
          />
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure! Do you want to delete "{deletePdt.title}" ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteProduct(deletePdt.id)}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminProductList;
