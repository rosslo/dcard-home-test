import { Router } from 'express';
import mongoose from 'mongoose';

const Article = mongoose.model('Article');

const router = Router();

router.get('/list', (req, res) => {
  Article.find().exec((error, articles) => {
    if (error) {
      return res.status(400).json(error).end();
    }
    return res.status(200).json(articles).end();
  })
});

router.post('/', (req, res) => {
  const article = new Article(req.body);

  article.save((error, result) => {
    if (error) {
      return res.status(400).json(error).end();
    }
    return res.status(200).json(result._id).end();
  });
});

router.patch('/:id', (req, res) => {
  Article.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, (error, doc) => {
    if (error) {
      return res.status(400).json(error).end();
    }
    return res.status(200).end();
  });
});

export default router;
