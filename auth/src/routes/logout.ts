import express from 'express'

const router = express.Router()

router.get('/api/users/logout', (req, res) => {
  req.session = null;

  res.status(200).send({})
})

export { router as logoutRouter };