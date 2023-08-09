import { useNavigate } from "react-router-dom";
import "./success.css"

export const Success = ({ orderId }) => {
  const navigate = useNavigate();
  return (

    <div className="successPage">
    <div className="card">
      <div className="content">
        <i className="checkmark">✓</i>
      </div>
      <h1>Success</h1>
      <p>
        {orderId
          ? `Order has been created successfully. Your order number is ${orderId}`
          : `Successfull. Your order is being prepared...`}
        <button className="btn btn-outline-success d-block mx-auto mt-4" onClick={() => navigate("/")}>Go to Homepage</button>
      </p>
    </div>
    </div>
  );
};
