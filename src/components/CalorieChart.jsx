import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../css/calorie.css";

const CalorieChart = () => {

  const progressValue = 50; // Static data
  return (
    <div className="calorie-chart">
      <div className="body">
        <div className="progress-circle">
          <CircularProgressbarWithChildren
            value={progressValue}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: "butt",
              trailColor: "#eee",
              pathColor: "#717dfa",
              textColor: "black"
            })}
          >
            <div className='calore_precentage_burnt'>
              <strong>{`${progressValue}%`}</strong>
            </div>
            <div style={{ fontSize: 12 }}>
              Daily target achieved
            </div>
          </CircularProgressbarWithChildren>
          <div className='calorie_burnt'>
            <span className='total_calorie'> 1250/2500 Kcal</span>
            <p className='total_eaten'> Eaten/Target</p>
          </div>
        </div>
        <div className="progress-bars">
          <div className="progress-bar">
            <div className="label">Protein</div>
            <div className="bar">
              <div className="fill" style={{ width: '93%' }}></div>
            </div>
            <div className="values">27/29 g</div>
          </div>
          <div className="progress-bar">
            <div className="label">Fat</div>
            <div className="bar">
              <div className="fill" style={{ width: '88%' }}></div>
            </div>
            <div className="values">37/42 g</div>
          </div>
          <div className="progress-bar">
            <div className="label">Carbs</div>
            <div className="bar">
              <div className="fill" style={{ width: '29%' }}></div>
            </div>
            <div className="values">37/129 g</div>
          </div>
        </div>
      </div>

      <div className="footer">
        <h3>1250/2500 Kcal</h3>
      </div>
    </div>
  );
}

export default CalorieChart;
