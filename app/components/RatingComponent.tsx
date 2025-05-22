  'use client'
  import React from 'react';
  import Ratings from 'react-ratings-declarative';

  const RatingComponent = ({rating}:{rating:number}) => {



    return (
      <div >
        <Ratings
          rating={rating}
          widgetRatedColors="gold"
          widgetDimensions='12px'
           widgetSpacings="1px"
        >
          <Ratings.Widget/>
          <Ratings.Widget/>
          <Ratings.Widget/>
          <Ratings.Widget/>
          <Ratings.Widget/>
        </Ratings>
      </div>
    );
  };

  export default RatingComponent;
