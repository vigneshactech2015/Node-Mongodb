const express = require('express')
const tourController = require('./../controllers/tourController')
const authController = require('./../controllers/authController')
const reviewRouter = require('./../routes/reviewRoutes')


const router = express.Router()

//nested route -->tours/tourId/reviews
router.use('/:tourId/reviews',reviewRouter)

router.route('/tour-stats').get(tourController.getTourStats)

//won't work
router.route('/monthly-plan/:year').get(authController.protect,authController.restrictTo('admin','lead-guide','guide'),tourController.getMonthlyPlan)

router.route('/top-5-cheap').get(tourController.aliasTopTours,tourController.getAllTours)

router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getToursWithin)

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router.route('/').get(tourController.getAllTours).post(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.createTour)

router.route('/:id').get(tourController.getTour).patch(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.updateTour).delete(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.deleteTour)

/*router.route('/:tourId/reviews').post(authController.protect,authController.restrictTo('user'),reviewController.createReview);*/

module.exports = router;