const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Category }, { model: Product }]
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategory = await Category.findByPk({
      include: [{ model: Category }, { model: Product }]
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  const { id, category_name } = req.body;
  try {
    const newCategory = await Category.create({
      id,
      category_name,
    });

    res.json(newCategory);

  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put('/:id', async (req, res) => {
  const { category } = req.body;
  // update a category by its `id` value
  try {
    await Category.update({
      category,
    },
    {
      where: {
        id: req.params.id,
      }
    });

    const updatedCategory = await Category.findByPk(req.params.id);
    res.json(updatedCategory);

  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const oneCategory = await Category.findByPk(req.params.id);

    await Category.destroy({
      where: {
        id: req.params.id,
      }
    });

    res.json(oneCategory);

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;