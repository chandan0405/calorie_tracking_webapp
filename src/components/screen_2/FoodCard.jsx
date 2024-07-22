
import React from 'react';
import { Box, Typography } from '@mui/material';
import "../../css/foodCard.css";
import flameIcon from "../../../src/assets/flame-icon.svg";

const FoodCard = ({ image, name, calories, weight, protein, carbs, fat }) => {
    const ProgressWithLabel = ({ value, color }) => (
        <Box display="flex" width="100%" flexDirection="row" gap="10px" alignItems="flex-start">
          <Box
            width={10}
            height={60}
            display="flex"
            bgcolor="#e0e0e0"
            borderRadius={5}
            sx={{ position: 'relative' }}
          >
            <Box
              width={10}
              height={`${value}%`}
              bgcolor={color}
              borderRadius={5}
              sx={{ position: 'absolute', bottom: 0 }}
            />
          </Box>
          <Box mt={1}>
            <Typography variant="body2" color="textSecondary" fontSize={"18px"} fontWeight={"800"}>{`${value} g`}</Typography>
          </Box>
        </Box>
    );

    return (
        <>
            <div className="food-card">
                <div className="food-card-header">
                    <img src={image} alt={name} className="food-image" />
                    <div className="food-info">
                        <h4>{name}</h4>
                        <p><span><img src={flameIcon} alt='flame-image' className='falme-icon' /></span>{calories} kcal · {weight} G</p>
                    </div>
                    <button className="delete-button">×</button>
                </div>
                <div className="food-card-nutrition">
                    <div className="nutrition-item">
                        <ProgressWithLabel value={protein} color="#4caf50" />
                        <p className='nutrition-name'>Protein</p>
                    </div>
                    <div className="nutrition-item">
                        <ProgressWithLabel value={carbs} color="#ffa726" />
                        <p className='nutrition-name'>Carbs</p>
                    </div>
                    <div className="nutrition-item">
                        <ProgressWithLabel value={fat} color="#42a5f5" />
                        <p className='nutrition-name'>Fat</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FoodCard;






















// import React from 'react'
// import flameIcon from "../../../src/assets/flame-icon.svg"
// import breakFast from "../../../src/assets/breakfast.jpeg"
// const FoodCard = () => {
//     return (
//         <div className='foodcard_container'>
//             <div className='foodcard_header_container'>
//                 <div className='image_container'>
//                     <img
//                         src={breakFast}
//                         alt='breakfast'
//                         className='food_image'
//                     />

//                 </div>
//                 <div className='foodcard_title_container'>
//                     <h3 className='foodcard_title'> Salad with egg</h3>
//                     <div className='subhead_container'>
//                         <span>
//                             <img src={flameIcon} alt='flame' className='flame_icon' />
//                         </span>
//                         <span className='total_calorie'>
//                             294 Kcal
//                         </span>
//                         <span>
//                             <li>100 G</li>
//                         </span>
//                     </div>
//                 </div>
//                 <div className='delete_card_container'>
//                     <button className='delete_button'>⨯</button>
//                 </div>
//             </div>
//             <div className='foodcard_content_container'>
//                 <div className='foodcard_content'>
//                     <div className='foodcard_content_title'>Ingredients</div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default FoodCard