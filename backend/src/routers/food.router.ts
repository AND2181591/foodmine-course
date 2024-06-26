import { Router } from 'express';
import { sample_foods, sample_tags } from '../data';

const router = Router();

router.get('', (req, res) => {
    res.send(sample_foods);
});

router.get('/search/:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(foods);
});

router.get('/api/foods/tags', (req, res) => {
    res.send(sample_tags);
});

router.get('/tags/:tagName', (req, res) => {
    const tagName = req.params.tagName;
    const tags = tagName === 'All' ? sample_tags : 
        sample_tags.filter(food => food.tags?.includes(tagName));
    res.send(tags);
});

router.get('/:foodId', (req, res) => {
    const foodId = req.params.foodId;
    const food = sample_foods.find(food => food.id === foodId);
    res.send(food);
});

export default router;