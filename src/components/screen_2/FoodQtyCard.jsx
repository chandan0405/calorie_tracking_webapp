import React, { useState, useEffect } from 'react';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/foodQty.css";
import { useDispatch, useSelector } from 'react-redux';
import { addFoodToMeal } from '../../redux/slice/mealSlice';

const FoodQtyCard = ({ show, onClose, initialNutritionalValues, onSave ,clearSearch}) => {
  const { selectedFoods } = useSelector(state => state.food);
  const meals = useSelector((state) => state.meals);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [nutritionalValues, setNutritionalValues] = useState(initialNutritionalValues);

  useEffect(() => {
    setNutritionalValues({
      calories: initialNutritionalValues.calories * quantity,
      protein: initialNutritionalValues.protein * quantity,
      carbs: initialNutritionalValues.carbs * quantity,
      weight: initialNutritionalValues.weight * quantity,
    });
  }, [quantity, initialNutritionalValues]);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const saveNutrition = () => {
    const foodData = {
      calories: Math.floor(nutritionalValues.calories),
      protein: Math.floor(nutritionalValues.protein),
      carbs: Math.floor(nutritionalValues.carbs),
      weight: nutritionalValues.weight,
      fat: Math.floor(initialNutritionalValues.fat),
      name: initialNutritionalValues.name,
      image: initialNutritionalValues.image,
    };
    onSave(foodData);
    clearSearch()
    onClose();
  }

  return (
    <Modal show={show} onHide={onClose} className='modal_container'>
      <Modal.Body>
        <Container>
          <Row className="mb-3">
            <Col>
              <div className="border p-2 text-center">
                <strong>Calories:</strong> {nutritionalValues.calories}
              </div>
            </Col>
            <Col>
              <div className="border p-2 text-center">
                <strong>Protein:</strong> {nutritionalValues.protein}g
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <div className="border p-2 text-center">
                <strong>Carbs:</strong> {nutritionalValues.carbs}g
              </div>
            </Col>
            <Col>
              <div className="border p-2 text-center">
                <strong>Weight:</strong> {nutritionalValues.weight}g
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
            <span>{quantity}</span>
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
