// src/components/FoodQtyCard.js
import React, { useState, useEffect } from 'react'; // Import useEffect
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/foodQty.css";
import { useDispatch } from 'react-redux'; 
import { addFoodItem, updateFoodItem } from '../../redux/slice/tempMealSlice'; 

const FoodQtyCard = ({ show, onClose, initialNutritionalValues, clearSearch, currQuantity }) => {
  console.log(currQuantity)
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(currQuantity || 1);

  useEffect(() => {
    if (initialNutritionalValues.quantity) {
      setQuantity(initialNutritionalValues.quantity);
    }
  }, [initialNutritionalValues]); 

  const handleIncrease = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const saveNutrition = () => {
    const foodData = {
      ...initialNutritionalValues,
      quantity,
      calories: initialNutritionalValues.calories * quantity,
      protein: initialNutritionalValues.protein * quantity,
      carbs: initialNutritionalValues.carbs * quantity,
      weight: initialNutritionalValues.weight * quantity,
    };
    
    if (initialNutritionalValues.id) {
      dispatch(updateFoodItem(foodData));
    } else {
      dispatch(addFoodItem(foodData));
    }
    clearSearch();
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} className='modal_container'>
      <Modal.Body className='modal-body'>
        <Container>
          <Row className="mb-3">
            <Col>
              <div className="border p-2 text-center">
                <strong>Calories:</strong> {initialNutritionalValues.calories * quantity}
              </div>
            </Col>
            <Col>
              <div className="border p-2 text-center">
                <strong>Protein:</strong> {initialNutritionalValues.protein * quantity}g
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <div className="border p-2 text-center">
                <strong>Carbs:</strong> {initialNutritionalValues.carbs * quantity}g
              </div>
            </Col>
            <Col>
              <div className="border p-2 text-center">
                <strong>Weight:</strong> {initialNutritionalValues.weight * quantity}g
              </div>
            </Col>
          </Row>
          <Modal.Header>
            <Modal.Title>Select Quantity</Modal.Title>
          </Modal.Header>
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="secondary" onClick={handleDecrease}>
              -
            </Button>
            <span>{quantity}</span> {/* Show local quantity */}
            <Button variant="secondary" onClick={handleIncrease}>
              +
            </Button>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={saveNutrition}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FoodQtyCard;
