import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faStar,  } from '@fortawesome/free-solid-svg-icons';


const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          const fillPercent = Math.min(Math.max(rating - index, 0), 1) * 100;
  
          return (
            <div key={index} className="relative">
              <FontAwesomeIcon icon={faStar} className="text-slate-300 bg-transparent" />
              <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: `${fillPercent}%` }}
              >
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
              </div>
            </div>
          );
        })}
        <span className="text-yellow-500 font-semibold ml-2">{rating.toFixed(1)}</span>
      </div>
    );
  };
export default StarRating  