// // src/components/Carousel.jsx
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const images = [
  
// ];

// const variants = {
//   enter: (direction) => ({
//     x: direction > 0 ? 1000 : -1000,
//     opacity: 0,
//   }),
//   center: {
//     x: 0,
//     opacity: 1,
//     transition: { duration: 0.5 },
//   },
//   exit: (direction) => ({
//     x: direction < 0 ? 1000 : -1000,
//     opacity: 0,
//     transition: { duration: 0.5 },
//   }),
// };

// const Carousel = () => {
//   const [[page, direction], setPage] = useState([0, 0]);

//   const paginate = (newDirection) => {
//     setPage([page + newDirection, newDirection]);
//   };

//   const index = (page + images.length) % images.length;

//   return (
//     <div className="relative w-full overflow-hidden">
//       <AnimatePresence initial={false} custom={direction}>
//         <motion.img
//           key={page}
//           src={images[index]}
//           custom={direction}
//           variants={variants}
//           initial="enter"
//           animate="center"
//           exit="exit"
//           className="absolute w-full"
//         />
//       </AnimatePresence>
//       <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
//         <button onClick={() => paginate(-1)}>&lt;</button>
//       </div>
//       <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
//         <button onClick={() => paginate(1)}>&gt;</button>
//       </div>
//     </div>
//   );
// };

// export default Carousel;
